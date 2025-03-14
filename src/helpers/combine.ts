import { IModifer, IPOEItem } from "./parseStringToPOEItem";
import { getCommonModifier, getGroupModByName } from "./splitModifier";

const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
interface ItemRecombine extends IPOEItem {
  prefix: IModifer[];
  suffix: IModifer[];
}
interface IRecombineProps {
  item1: ItemRecombine;
  item2: ItemRecombine;
}

export class Recombination {
  prefixPool: IModifer[] = [];
  suffixPool: IModifer[] = [];
  explicit: IModifer[] = [];
  item1: ItemRecombine;
  item2: ItemRecombine;
  availbleMods: any[] = [];

  constructor(props: IRecombineProps) {
    console.log("props", props);
    this.item1 = props.item1;
    this.item2 = props.item2;
  }

  mergePrefixPool(pool1: IModifer[], pool2: IModifer[]) {
    this.prefixPool = [...pool1, ...pool2].map((m) => {
      return {
        ...m,
        isExclusive: this.isExclusiveMod(m.modgroup),
      };
    });
  }
  mergeSuffixPool(pool1: IModifer[], pool2: IModifer[]) {
    this.suffixPool = [...pool1, ...pool2].map((m) => {
      return {
        ...m,
        isExclusive: this.isExclusiveMod(m.modgroup),
      };
    });
  }

  selectMod(pool: []) {
    const length = pool.length || 0;
    if (!length) return;
    const random = Math.ceil(Math.random() * length);
    const mod = pool[random];
    delete pool[random];
    return {
      mod,
      pool,
    };
  }

  getRandomBase() {
    let rand = this.getRandom(2);
    if (rand === 0) return this.item1;
    return this.item2;
  }

  getRandom(num: number) {
    return Math.floor(Math.random() * num);
  }

  async combine() {
    const base = this.getRandomBase();

    const getBaseGroupID = base.base?.map((item) => getGroupModByName(item)?.id_mgroup);
    const availbleMods = getCommonModifier(getBaseGroupID as any[]);

    this.availbleMods = availbleMods;

    this.mergePrefixPool(this.item1.prefix, this.item2.prefix);
    this.mergeSuffixPool(this.item1.suffix, this.item2.suffix);
    const countPrefix = this.prefixPool.length;
    const countSuffix = this.suffixPool.length;

    // console.log("countPrefix", countPrefix);
    // console.log("countSuffix", countSuffix);

    const prefixChance = this.recombineChance(countPrefix);
    const suffixChance = this.recombineChance(countSuffix);

    // console.log("prefixChance", prefixChance);
    // console.log("suffixChance", suffixChance);

    const maximumPrefix = this.getRandomOutcome(prefixChance);
    const maximumSuffix = this.suffixPool?.length > 0 ? this.getRandomOutcome(suffixChance) : 0;
    // console.log("maximumPrefix", maximumPrefix);
    // console.log("maximumSuffix", maximumSuffix);

    const newPrefixPool = [];
    const newSuffixPool = [];

    // console.log("function", this.prefixPool);
    // console.log("function", this.suffixPool);

    let hitLength = Number(maximumPrefix) + Number(maximumSuffix);

    let isHitExclusive = false;
    let samePrefixMod: string[] = [];
    let sameSuffixMod: string[] = [];
    console.log("Maximum Mod", hitLength, isHitExclusive);

    let countSuf = 0;
    let countPre = 0;
    let history = [];
    for (let i = 0; i < hitLength; i++) {
      let pickPrefix = this.getRandom(2) === 0;
      if (countSuf >= Number(maximumSuffix) && countPre < Number(maximumPrefix)) {
        pickPrefix = true;
      } else if (countPre >= Number(maximumPrefix) && countSuf < Number(maximumSuffix)) {
        pickPrefix = false;
      }

      if (pickPrefix && newPrefixPool.length < Number(maximumPrefix)) {
        console.log("count pre");

        let currentPool = [...this.prefixPool];
        if (isHitExclusive) currentPool = [...currentPool].filter((item) => !(item as any)?.isExclusive);
        if (samePrefixMod.length) {
          currentPool = [...currentPool].filter((item) => !samePrefixMod.includes(item.modgroup));
        }
        const randomMod = this.getRandom(currentPool.length);
        const selectedMod = currentPool[randomMod];
        if (!selectedMod) continue;
        samePrefixMod.push(selectedMod?.modgroup);
        newPrefixPool.push(selectedMod);
        if ((selectedMod as any)?.isExclusive) {
          isHitExclusive = true;
        }
        countPre++;
        history.push({
          affix: "prefix",
          mod: selectedMod,
        });
        await sleep(500);
      } else {
        console.log("count suf");
        if (newSuffixPool.length < Number(maximumSuffix)) {
          let currentPool = [...this.suffixPool];
          if (isHitExclusive) currentPool = [...currentPool].filter((item) => !(item as any)?.isExclusive);
          if (sameSuffixMod.length) {
            currentPool = [...currentPool].filter((item) => !sameSuffixMod.includes(item.modgroup));
          }
          const randomMod = this.getRandom(currentPool.length);
          const selectedMod = currentPool[randomMod];
          if (!selectedMod) continue;
          sameSuffixMod.push(selectedMod?.modgroup);
          newSuffixPool.push(selectedMod);
          if ((selectedMod as any)?.isExclusive) {
            isHitExclusive = true;
          }
          countSuf++;
          history.push({
            affix: "suffix",
            mod: selectedMod,
          });
        }
        await sleep(500);
      }
    }

    isHitExclusive = false;
    console.log("newPrefixPool", [...newPrefixPool, ...newSuffixPool]);

    return {
      ...base,
      prefix: newPrefixPool,
      suffix: newSuffixPool,
      maximumPrefix,
      maximumSuffix,
      prefixChance,
      suffixChance,
      history
    };
  }

  isExclusiveMod(mod: string) {
    return !this.availbleMods.some((item: any) => item.modgroup === mod);
  }
  removePoolIndex(num: number, concurrent: any[]) {
    let newPool = JSON.parse(JSON.stringify(concurrent));
    newPool = [...newPool.slice(0, num), ...newPool.slice(num + 1)];
    return newPool;
  }

  getRandomOutcome(probabilities: Record<any, any>) {
    // Generate a random number between 0 and 1
    const precision = 10000; // 4 decimal places of precision
    let total = 0;
    const ranges: any = {};

    // Create ranges for each outcome
    for (const outcome in probabilities) {
      const probability = probabilities[outcome];
      const range = Math.round(probability * precision);
      ranges[outcome] = range;
      total += range;
    }

    // Generate a random integer between 0 and the total
    const random = Math.floor(Math.random() * total);

    // Find which outcome this random number corresponds to
    let cumulative = 0;
    for (const outcome in ranges) {
      cumulative += ranges[outcome];
      if (random < cumulative) {
        return parseInt(outcome);
      }
    }
    // Fallback (shouldn't reach here if probabilities sum to 1)
    return Object.keys(probabilities)[Object.keys(probabilities).length - 1];
  }

  recombineChance(inputMod: number) {
    // Following Chance of this guide
    // https://maxroll.gg/poe/resources/recombination-guide
    switch (inputMod) {
      case 6:
        return {
          0: 0,
          1: 0,
          2: 0.28,
          3: 0.72,
        };
      case 5:
        return {
          0: 0,
          1: 0,
          2: 0.43,
          3: 0.57,
        };
      case 4:
        return {
          0: 0,
          1: 0.11,
          2: 0.59,
          3: 0.31,
        };
      case 3:
        return {
          0: 0,
          1: 0.39,
          2: 0.52,
          3: 0.1,
        };
      case 2:
        return {
          0: 0,
          1: 0.67,
          2: 0.33,
          3: 0,
        };
      case 1: // default is 1
        return {
          0: 0.41,
          1: 0.59,
          2: 0,
          3: 0,
        };
      default: // default is 1
        return {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
        };
    }
  }
}
