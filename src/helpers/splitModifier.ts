import { MOD_GROUPS } from "../constants/modGroup";
import { MODIFIERS } from "../constants/modifier";

const ExclusiveMode = ["Can have up to 3 Crafted Modifiers"];
export const splitModifier = (modifier: string): { isCraft: boolean; modifier: string } => {
  // const regex = new RegExp(/[0-9][?.][0.9]+/g);
  const regex = new RegExp(/(\d+(\.\d+)?|\d+%)/g);
  const textReg = " (crafted)";

  let isCraft = false;
  if (modifier.includes(textReg)) {
    isCraft = true;
  }
  const newModifier = modifier.replace(textReg, "");
  if (ExclusiveMode.includes(newModifier)) {
    return {
      modifier: newModifier,
      isCraft: true,
    };
  }
  return {
    modifier: newModifier.replace(regex, "#"),
    isCraft,
  };
};

export const getModGroup = (id: string) => {
  return MOD_GROUPS.seq.find((item) => item.id_mgroup === id);
};

export const getGroupModByName = (name: string) => {
  return MOD_GROUPS.seq.find((item) => item.name_mgroup === name);
};

export const getAllMods = () => {
  const map = new Map();
  for (let group of MOD_GROUPS.seq) {
    map.set(group.id_mgroup, []);
  }
  for (let modifier of MODIFIERS.seq) {
    const currentValue = map.get(modifier.id_mgroup);
    currentValue.push(modifier);
    map.set(modifier.id_mgroup, currentValue);
  }
  return map;
};
export const MODS_BASE = getAllMods();

export const getCommonModifier = (base: string[]) => {
  const DEFAULT_BASE = ["1", ...base];
  const BASE_ITEM_MODS = [];
  for (let group of DEFAULT_BASE) {
    BASE_ITEM_MODS.push(
      ...MODS_BASE.get(group)?.filter((item: any) => item.affix == "prefix" || item.affix == "suffix")
    );
  }
  return BASE_ITEM_MODS;
};
