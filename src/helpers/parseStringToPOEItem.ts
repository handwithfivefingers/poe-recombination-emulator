/**
 * Parses Path of Exile item text into a structured JSON format
 * @param {string} itemText - The raw item text to parse
 * @return {Object} The parsed item data in JSON format
 */
import { TYPES } from "../constants/types";
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

export const parsePoEItem = (itemText: string) => {
  // Initialize the result object
  const result: IPOEItem = {
    name: "",
    quality: "",
    crit: "",
    aps: "",
    base: [],
    ilevel: 0,
    implicit: [],
    mods: [],
    groups: [],
  };

  // Split the text into sections based on the separator lines
  const sections = itemText.split(/\n--------\n/);

  if (sections.length > 7) {
    // delete sections[4]
    sections.splice(4, 1);
  }
  // Parse the header section for item name
  const headerLines = sections[0].split("\n");
  // Skip "Rarity: Rare" and "Crafted Item" lines
  result.name = headerLines[headerLines.length - 1].trim();

  // Parse the quality section
  const qualitySection = sections[1];

  // Extract quality
  const qualityMatch = qualitySection.match(/Quality: \+(\d+)%/);
  if (qualityMatch) {
    result.quality = qualityMatch[1];
  }

  // Extract critical strike chance
  const critMatch = qualitySection.match(/Critical Strike Chance: (\d+\.\d+)%/);
  if (critMatch) {
    result.crit = critMatch[1];
  }

  // Extract attacks per second
  const apsMatch = qualitySection.match(/Attacks Per Second: (\d+\.\d+)/);
  if (apsMatch) {
    result.aps = apsMatch[1];
  }

  // Parse the item level
  const ilevelSection = sections[3];
  const ilevelMatch = ilevelSection.match(/Item Level: (\d+)/);
  if (ilevelMatch) {
    result.ilevel = parseInt(ilevelMatch[1]);
  }

  // Parse implicit mods
  const implicitSection = sections[4];
  if (implicitSection.includes("implicit")) {
    // Extract implicit mods by removing the "(implicit)" suffix
    const implicitMods = implicitSection
      .split("\n")
      .map((line) => line.replace(/\s*\(implicit\)$/, "").trim())
      .filter((line) => line.length > 0);

    result.implicit = implicitMods;
  }

  console.log("sections", sections);
  // Parse explicit mods
  const explicitSection = sections[sections.length - 2];
  const explicitLines = explicitSection
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Parse base type (Shaper, Elder, etc.)
  console.log("explicitSection", explicitSection);

  const baseSection = sections[sections.length - 1];
  console.log("baseSection", baseSection);
  if (baseSection?.includes("Shaper")) {
    result.base.push("Shaper");
  }
  if (baseSection?.includes("Elder")) {
    result.base.push("Elder");
  }
  if (baseSection?.includes("Hunter")) {
    result.base.push("Hunter");
  }
  if (baseSection?.includes("Crusader")) {
    result.base.push("Crusader");
  }
  if (baseSection?.includes("Redeemer")) {
    result.base.push("Redeemer");
  }
  if (baseSection?.includes("Warlord")) {
    result.base.push("Warlord");
  }

  result.groups = [...getGroups(result.base), ...AVAILABLE_GROUPS] as any;

  processExplicitMods(explicitLines, result);

  return result;
};

function processExplicitMods(lines: string[], result: IPOEItem) {
  // Common patterns for mod line beginnings
  console.log("lines", lines);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    const { isSame, mod } = isSameLine(line, nextLine, result.groups);
    if (isSame) {
      i++;
    }

    result.mods.push(mod);
  }
}

const isSameLine = (line1: string, line2: string, groups: string[]): { mod: any; isSame: boolean } => {
  let line = line1 + ", " + line2;
  let isSame = false;
  if (!line2) {
    line = line1;
    isSame = false;
  }
  let { modifier: splitMod, isCraft } = splitModifier(line);
  let mod = getModDetails(splitMod, groups);
  if (mod) isSame = true;
  else {
    line = line1;
    isSame = false;
    let { modifier } = splitModifier(line);
    console.log('modifier',modifier)
    mod = getModDetails(modifier, groups);
  }
  return {
    mod: {
      ...mod,
      isCraft,
      tag: getTagDetails(mod?.mtypes as string),
    },
    isSame,
  };
};

const getModDetails = (splitMod: string, groups: string[]) => {
  for (let group of groups) {
    const listMod = MODS_BASE.get(group);
    const targetMod = listMod.find(
      (m: any) => (m.affix === "suffix" || m.affix === "prefix") && m.name_modifier.trim() === splitMod.trim()
    );
    if (!targetMod) continue;
    return targetMod;
  }
};

const getTagDetails = (tags: string) => {
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

const getGroups = (groups: string[]) => {
  const result = [];
  for (let groupName of groups) {
    const group = getGroupModByName(groupName);
    result.push(group?.id_mgroup);
  }
  return result;
};
// Example usage
// const itemText = `Rarity: Rare
//   Crafted Item
//   Calling Wand
//   --------
//   Quality: +20% (augmented)
//   Physical Damage: 15-27
//   Critical Strike Chance: 8.30%
//   Attacks Per Second: 1.50
//   --------
//   Requirements:
//   Int: 81
//   Level: 20
//   --------
//   Item Level: 100
//   --------
//   Minions deal 15% increased Damage (implicit)
//   --------
//   Damage Penetrates 4% Elemental Resistances
//   Socketed Gems are Supported by Level 16 Lightning Penetration
//   52% increased Lightning Damage
//   Socketed Gems are supported by Level 18 Elemental Damage with Attacks
//   29% increased Elemental Damage with Attack Skills
//   --------
//   Shaper Item`;

// const parsedItem = parsePoEItem(itemText);
// console.log(JSON.stringify(parsedItem, null, 2));
