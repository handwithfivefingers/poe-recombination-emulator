import data from "../constants/data.json";
const { bitems, basemods, modifiers, mgroups }: any = data;

export const getModBaseOnItem = (baseId: number) => {
  try {
    if (!baseId) return new Map();
    const BASE_MODS = basemods[baseId];
    const itemModifiers = new Map();
    for (let id of BASE_MODS) {
      const index = modifiers.ind[id];
      const mod = modifiers.seq[index];
      const groupID = mod.id_mgroup;
      const groupIndex = mgroups.ind[groupID];
      const groupName = mgroups.seq[groupIndex];
      const currentMods = itemModifiers.get(groupName.name_mgroup);
      if (mod.affix !== "prefix" && mod.affix !== "suffix") continue;
      if (currentMods) {
        itemModifiers.set(groupName.name_mgroup, [...currentMods, mod]);
      } else {
        itemModifiers.set(groupName.name_mgroup, [mod]);
      }
    }
    return itemModifiers;
  } catch (error) {
    console.log('error',error)
    return new Map();
  }
};

export const getBaseItemByName = (str: string) => {
  const itemInd = bitems.name[str];
  const base = bitems.seq[itemInd];
  return base;
};

export const getBaseItems = () => bitems.seq;
