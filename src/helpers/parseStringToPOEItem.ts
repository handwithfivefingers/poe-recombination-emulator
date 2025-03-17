import { TYPES } from "../constants/types";
import { getBaseItemByName, getModBaseOnItem } from "./common";
import { MODS_BASE, getGroupModByName, splitModifier } from "./splitModifier";

const AVAILABLE_GROUPS = ["1", "8", "11", "12", "13", "9", "14", "10"];

export interface IModifer {
  id_modifier: string;
  name_modifier: string;
  affix: "eldritch_blue" | "eldritch_red" | "suffix" | "prefix" | "corrupted";
  ha: boolean;
  hr: boolean;
  modgroup: any;
  modgroups: any;
  id_mgroup: string;
  hybrid: string;
  mtags: any;
  mtypes: string;
  isDelete?: boolean;
}
export interface IPOEItem {
  name: string;
  crit: string;
  quality: string;
  aps: string;
  base: string[];
  ilevel: number;
  implicit: string[];
  mods: IModifer[];
  groups: string[];
}

export class POEParser {
  name: string = "";
  baseItem: Record<any, any> = {};
  quality: string | number = "";
  crit: any = "";
  aps: any = "";
  ilevel: number = 0;
  base: any[] = [];
  groups: any[] = [];
  implicit: string[] = [];
  mods: any[] = [];

  constructor(itemText: string) {
    const sections = itemText.split(/\n--------\n/);

    let modifierIndex = undefined;

    const ItemLevelRegex = /Item Level/g;
    const headerLines = sections[0].split("\n");
    const itemInformation = sections[1];
    const iLevelSection = sections[2];
    const sectionsLength = sections.length;

    if (sections[2]?.match(ItemLevelRegex)?.length) {
      modifierIndex = 2;
    } else if (sections[3]?.match(ItemLevelRegex)?.length) {
      modifierIndex = 3;
    } else if (sections[4]?.match(ItemLevelRegex)?.length) {
      modifierIndex = 4;
    } else if (sections[5]?.match(ItemLevelRegex)?.length) {
      modifierIndex = 5;
    } else if (sections[6]?.match(ItemLevelRegex)?.length) {
      modifierIndex = 6;
    }
    if (modifierIndex) {
      const range = sectionsLength - modifierIndex - 1;
      console.log("range", sectionsLength, modifierIndex, range);

      const isNextSectionEnchanted = sections[modifierIndex + 1].match(/enchant/)?.length;
      const isMirrorItem = sections.find((str) => str.match(/Mirrored/));
      const isSplit = sections.find((str) => str.match(/Split/));

      let baseIndex = 0;
      if (isMirrorItem) baseIndex += 1;
      if (isSplit) baseIndex += 1;

      if (isNextSectionEnchanted || isMirrorItem || isSplit) {
        this.parseItemName(headerLines); // 0
        this.parseItemInformation(itemInformation); // 1
        this.parseIlevel(iLevelSection); // 2
        this.parseImplicitItem(sections[modifierIndex + 1 + (isNextSectionEnchanted ? 1 : 0)]);
        this.parseModifiers(sections[modifierIndex + 2 + (isNextSectionEnchanted ? 1 : 0)]);
        this.parseBaseItem(sections[sectionsLength - 1]);
      } else if (range === 3) {
        this.parseItemName(headerLines); // 0
        this.parseItemInformation(itemInformation); // 1
        this.parseIlevel(iLevelSection); // 2
        this.parseImplicitItem(sections[modifierIndex + 1]);
        this.parseModifiers(sections[modifierIndex + 2]);
        this.parseBaseItem(sections[sectionsLength - 1]);
      } else if (range === 2) {
        this.parseItemName(headerLines); // 0
        this.parseItemInformation(itemInformation); // 1
        this.parseIlevel(iLevelSection); // 2
        this.parseImplicitItem(sections[modifierIndex - 1]);
        this.parseModifiers(sections[modifierIndex + 1]);
        this.parseBaseItem(sections[sectionsLength - 1]);
      } else if (range === 1) {
        this.parseItemName(headerLines); // 0
        this.parseItemInformation(itemInformation); // 1
        this.parseIlevel(iLevelSection); // 2
        this.parseImplicitItem(sections[modifierIndex - 1]);
        this.parseModifiers(sections[modifierIndex + 1]);
        this.parseBaseItem(sections[sectionsLength - 1]);
      } else alert("Something went wrong, please try other item later.");
      // }
      console.log("baseItem", this.baseItem);
    }
    console.log("this", this);
    return this;
  }

  parseItemName = (arr: any[]) => {
    const itemName = arr[arr.length - 1].trim();
    this.name = itemName;
    console.log("itemName", itemName);
    const exlusiveName = /Synthesised /;
    const parsedName = itemName.replace(exlusiveName, "");
    this.baseItem = getBaseItemByName(parsedName);
  };
  parseItemInformation = (qualitySection: any) => {
    // Extract quality
    const qualityMatch = qualitySection.match(/Quality: \+(\d+)%/);
    if (qualityMatch) {
      this.quality = qualityMatch[1];
    }
    const critMatch = qualitySection.match(/Critical Strike Chance: (\d+\.\d+)%/);
    if (critMatch) {
      this.crit = critMatch[1];
    }
    const apsMatch = qualitySection.match(/Attacks Per Second: (\d+\.\d+)/);
    if (apsMatch) {
      this.aps = apsMatch[1];
    }
  };

  parseIlevel = (ilevelSection: any) => {
    const ilevelMatch = ilevelSection?.match(/Item Level: (\d+)/);
    if (ilevelMatch) {
      this.ilevel = parseInt(ilevelMatch[1]);
    }
  };

  parseBaseItem = (baseSection: any) => {
    console.log("baseSection", baseSection);
    const baseRegex = /Shaper|Elder|Hunter|Crusader|Redeemer|Warlod|Eater|Searching/g;
    const base = [];
    if (baseSection.match(baseRegex)?.length) {
      base.push(...(baseSection.match(baseRegex) as string[]));
    }
    this.groups = [...this.getGroups(base), ...AVAILABLE_GROUPS] as any;
    this.base = base;
  };

  parseImplicitItem = (implicitSection: string) => {
    if (implicitSection.includes("implicit")) {
      // Extract implicit mods by removing the "(implicit)" suffix
      const implicitMods = implicitSection
        .split("\n")
        .map((line) => line.replace(/\s*\(implicit\)$/, "").trim())
        .filter((line) => line.length > 0);

      this.implicit = implicitMods;
    }
  };
  parseModifiers = (explicitSection: string) => {
    let explicitLines = explicitSection
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    console.log("explicitSection", explicitLines);

    const result = this.processExplicitMods(explicitLines);
    this.mods = result;
  };

  processExplicitMods(lines: string[]) {
    const { craftPool, remainPool } = this.extractItemMods(lines);
    let res: any[] = [];
    if (craftPool) {
      for (let i = 0; i < craftPool.length; i++) {
        const line = craftPool[i];
        const nextLine = craftPool[i + 1];
        const mod = this.isSameLine(line, nextLine);
        if (mod) {
          i++;
        } else {
          const singleMod = this.isSameLine(line);
          res.push(singleMod);
          singleMod.isCraft = true;
          continue;
        }
        mod.isCraft = true;
        res.push(mod);
      }
    }
    if (remainPool) {
      for (let i = 0; i < remainPool.length; i++) {
        const line = remainPool[i];
        const nextLine = remainPool[i + 1];
        const mod = this.isSameLine(line, nextLine);
        if (mod) {
          i++;
        } else {
          const singleMod = this.isSameLine(line);
          const isVeil = this.isVeilMod(line);
          // console.log("isVeil", isVeil);
          // singleMod.isVeil = isVeil;
          console.log("singleMod", singleMod);
          res.push({ ...singleMod, isVeil });
          continue;
        }
        const isVeil = this.isVeilMod(line, nextLine);
        mod.isVeil = isVeil;
        res.push(mod);
      }
    }

    return res;
  }

  isSameLine = (line1: string, line2?: string): any | undefined => {
    const itemModifiers = getModBaseOnItem(this.baseItem.id_base);
    const MOD_BASES = ["Base", "Crafted", ...this.base];
    let lines = line1;
    if (line2) {
      lines += `, ${line2}`;
    }
    for (let base of MOD_BASES) {
      const mods = itemModifiers.get(base);
      const lineSplit = splitModifier(lines);
      const mod = mods.find((mod: any) => lineSplit == mod.name_modifier);
      if (mod) {
        mod.tag = this.getTagDetails(mod?.mtypes as string);
        return mod;
      } else continue;
    }
    return undefined;

    // let line = line1 + ", " + line2;
    // let isSame = false;
    // if (!line2) {
    //   line = line1;
    //   isSame = false;
    // }
    // let { modifier: splitMod, isCraft } = splitModifier(line);
    // let mod = this.getModDetails(splitMod, groups);
    // if (mod) isSame = true;
    // else {
    //   line = line1;
    //   isSame = false;
    //   let { modifier } = splitModifier(line);
    //   console.log("modifier", modifier);
    //   mod = this.getModDetails(modifier, groups);
    // }
    // return {
    //   mod: {
    //     ...mod,
    //     isCraft,
    //     tag: this.getTagDetails(mod?.mtypes as string),
    //   },
    //   isSame,
    // };
    return {
      mod: {},
      isSame: false,
    };
  };

  extractItemMods = (modPool: any[]) => {
    let craftPool = [];
    let remainPool = [];
    for (let mod of modPool) {
      if (mod.includes("crafted")) {
        craftPool.push(mod);
      } else {
        remainPool.push(mod);
      }
    }
    return {
      craftPool,
      remainPool,
    };
  };

  isVeilMod = (line1: string, line2?: string) => {
    const itemModifiers = getModBaseOnItem(this.baseItem.id_base);
    let lines = line1;
    if (line2) {
      lines += `, ${line2}`;
    }
    const listMods = itemModifiers.get("Veiled");
    let formatLines = splitModifier(lines);
    const result = listMods.some((item: any) => item.name_modifier === formatLines);
    return result;
  };

  getModDetails = (splitMod: string, groups: string[]) => {
    try {
      for (let group of groups) {
        const listMod = MODS_BASE.get(group);
        const targetMod = listMod.find(
          (m: any) => (m.affix === "suffix" || m.affix === "prefix") && m.name_modifier.trim() === splitMod.trim()
        );
        if (!targetMod) continue;
        return { ...targetMod };
      }
    } catch (error) {
      console.log("error", error);
      return {};
    }
  };

  getTagDetails = (tags: string) => {
    if (!tags) return [];
    const splitTag = tags.split("|");
    const result = [];
    for (let tag of splitTag) {
      console.log("tag", tag);
      if (tag) {
        const objectTag: any = TYPES.seq.find((t) => t.id_mtype == tag) || {};
        if (objectTag?.jewellery_tag == 1) continue;
        result.push(objectTag);
      }
    }
    return result;
  };

  getGroups = (groups: string[]) => {
    const result = [];
    for (let groupName of groups) {
      const group = getGroupModByName(groupName);
      result.push(group?.id_mgroup);
    }
    return result;
  };

  getItemInformation = () => {
    return {
      name: this.name,
      quality: this.quality,
      implicit: this.implicit,
      mods: this.mods,
    };
  };
}
