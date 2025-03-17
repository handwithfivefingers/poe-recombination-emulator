const NORMAL_PREFIX = [
  "# to maximum Mana",
  "#% increased Physical Damage# to Accuracy Rating",
  "#% increased Physical Damage",
  "Adds # to # Physical Damage",
  "Adds # to # Fire Damage",
  "Adds # to # Cold Damage",
  "Adds # to # Lightning Damage",
  "#% increased Elemental Damage with Attack Skills",
  "+# to Level of Socketed Gems",
  "# to Level of Socketed Melee Gems",
  "#% of Physical Attack Damage Leeched as Life",
  "#% of Physical Attack Damage Leeched as Mana",
  "Adds # to # Chaos Damage",
];

const NORMAL_SUFFIX = [
  ["# to Dexterity"],
  ["# to Intelligence"],
  ["#% increased Attack Speed"],
  ["#% increased Mana Regeneration Rate"],
  ["#% to Fire Resistance"],
  ["#% to Cold Resistance"],
  ["#% to Lightning Resistance"],
  ["#% to Chaos Resistance"],
  ["#% increased Stun Duration on Enemies"],
  ["# Life per Enemy Hit"],
  ["# Life per Enemy Killed"],
  ["# Mana per Enemy Killed"],
  ["#% increased Critical Strike Chance"],
  ["#% to Global Critical Strike Multiplier"],
  ["# to Accuracy Rating"],
  ["#% reduced Attribute Requirements"],
  ["#% increased Global Accuracy Rating#% increased Light Radius"],
  ["#% to Damage over Time Multiplier"],
];

const SHAPER_PREFIX = [
  ["Socketed Gems are Supported by Level # Added Fire Damage", "#% increased Physical Damage"],
  [
    "Socketed Gems are supported by Level # Elemental Damage with Attacks",
    "#% increased Elemental Damage with Attack Skills",
  ],
  ["#% of Physical Damage as Extra Cold Damage"],
  ["#% of Physical Damage as Extra Lightning Damage"],
  ["Penetrates #% Elemental Resistances"],
  ["Socketed Skills deal 40% more Attack Damage"],
  ["Adds # to # Cold Damage to Attacks with this Weapon per 10 Dexterity"],
  ["Adds # to # Lightning Damage to Attacks with this Weapon per 10 Intelligence"],
];

const SHAPER_SUFFIX = [
  ["Socketed Gems are supported by Level # Melee Splash", "#% increased Area Damage"],
  ["Socketed Gems are Supported by Level # Faster Attacks", "#% increased Attack Speed"],
  ["Socketed Gems are Supported by Level # Increased Critical Strikes", "#% increased Critical Strike Chance"],
  ["Socketed Gems are Supported by Level # Maim", "#% chance to Maim on Hit"],
  ["#% chance to gain Onslaught for # seconds on Kill"],
  ["#% Chance to Block Attack Damage while Dual Wielding"],
  ["Enemies have #% reduced Evasion if you have Hit them Recently"],
  ["#% increased Critical Strike Chance against Blinded Enemies"],
];

const ELDER_PREFIX = [
  [
    "Socketed Gems are Supported by Level # Melee Physical Damage",
    "#% increased Physical Damage, Socketed Gems are Supported by Level # Brutality",
    "#% increased Physical DamageSocketed Gems are Supported by Level # Ruthless",
    "#% increased Physical Damage",
  ],
  ["#% to Damage over Time Multiplier for Bleeding from Hits with this Weapon"],
  ["#% to Damage over Time Multiplier for Poison inflicted with this Weapon"],
];
const ELDER_SUFFIX = [
  ["Socketed Gems are Supported by Level # Ancestral Call", "#% increased Area of Effect"],
  ["Socketed Gems are supported by Level # Multistrike", "#% increased Attack Speed"],
  ["Socketed Gems are supported by Level # Increased Critical Damage", "#% to Global Critical Strike Multiplier"],
  ["Socketed Gems are Supported by Level # Chance to Poison", "#% chance to Poison on Hit"],
  ["Socketed Gems are Supported by Level # Chance To Bleed", "#% chance to cause Bleeding on Hit"],
  ["#% chance to gain Unholy Might for # seconds on Kill"],
  ["#% chance to Blind Enemies on Hit with Attacks"],
  ["#% increased Physical Attack Damage while Dual Wielding"],
  ["#% of Physical Damage Converted to Chaos Damage"],
  ["When you Kill a Rare Monster, #% chance to gain one of its Modifiers for 10 seconds"],
  ["Gain # Life per Blinded Enemy Hit with this Weapon"],
];

const CRUSADER_PREFIX = [
  ["#% increased Physical Damage", "#% increased Critical Strike Chance"],
  ["Adds # to # Lightning DamageAttacks with this", "Weapon Penetrate #% Lightning Resistance"],
  ["Attacks with this Weapon Penetrate #% Lightning Resistance"],
  ["Gain #% of Physical Damage as Extra Lightning Damage"],
];
const CRUSADER_SUFFIX = [
  ["#% increased Impale Effect"],
  ["#% of Physical Damage Converted to Cold Damage"],
  ["#% of Physical Damage Converted to Lightning Damage"],
  ["#% increased Critical Strike Chance if you have Killed Recently"],
];

const HUNTER_PREFIX = [
  ["Adds # to # Chaos DamageAttacks with this", "Weapon Penetrate #% Chaos Resistance"],
  ["Attacks with this Weapon Penetrate #% Chaos Resistance"],
  ["Attacks with this Weapon Penetrate #% Elemental Resistances"],
  ["Adds (1–2) to (3–4) Cold Damage to Attacks with this Weapon per 10 Dexterity"],
  ["Adds 1 to (5–6) Lightning Damage to Attacks with this Weapon per 10 Intelligence"],
  ["#% increased Chaos Damage over Time"],
];

const HUNTER_SUFFIX = [
  ["Poisons you inflict deal Damage #% faster"],
  ["#% of Physical Damage Converted to Chaos Damage"],
  ["Hits with this Weapon have #% chance to ignore Enemy Physical Damage Reduction"],
  ["#% chance to Intimidate Enemies for # seconds on Hit"],
];

const WARLORD_PREFIX = [
  ["#% increased Physical Damage", "#% to Global Critical Strike Multiplier"],
  ["Adds # to # Fire Damage", "Attacks with this Weapon Penetrate #% Fire Resistance"],
  ["Attacks with this Weapon Penetrate #% Fire Resistance"],
];
const WARLORD_SUFFIX = [
  ["#% chance to gain Unholy Might for # seconds on Kill"],
  ["#% increased Physical Attack Damage while Dual Wielding"],
  ["#% to Critical Strike Multiplier if you've Killed Recently"],
  ["When you Kill a Rare Monster, #% chance to gain one of its Modifiers for # seconds"],
];

const REDEEMER_PREFIX = [
  ["#% chance to gain a Frenzy Charge on Kill"],
  ["#% chance to gain a Power Charge on Kill"],
  ["Adds # to # Cold DamageAttacks with this", "Weapon Penetrate #% Cold Resistance"],
  ["Attacks with this Weapon Penetrate #% Cold Resistance"],
  ["Gain #% of Physical Damage as Extra Cold Damage"],
];
const REDEEMER_SUFFIX = [
  ["Auras from your Skills grant 2% increased Damage to you and Allies"],
  ["#% chance to Blind Enemies on Hit with Attacks"],
  ["#% chance to gain Onslaught for # seconds on Kill"],
  ["#% Chance to Block Attack Damage while Dual Wielding"],
];
