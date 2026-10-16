// Display labels only; filtering must continue to use the original set identifier.
// Enum reference: https://github.com/HearthSim/python-hearthstone/blob/master/hearthstone/enums.py
const CARD_SET_NAMES: Record<string, string> = {
  BE: "Reign of the Black Empire",
  EXPERT1: "Classic",
  HOF: "Hall of Fame",
  NAXX: "Curse of Naxxramas",
  GVG: "Goblins vs Gnomes",
  BRM: "Blackrock Mountain",
  TGT: "The Grand Tournament",
  LOE: "The League of Explorers",
  OG: "Whispers of the Old Gods",
  KARA: "One Night in Karazhan",
  GANGS: "Mean Streets of Gadgetzan",
  UNGORO: "Journey to Un'Goro",
  ICECROWN: "Knights of the Frozen Throne",
  LOOTAPALOOZA: "Kobolds & Catacombs",
  GILNEAS: "The Witchwood",
  BOOMSDAY: "The Boomsday Project",
  TROLL: "Rastakhan's Rumble",
  DALARAN: "Rise of Shadows",
  ULDUM: "Saviors of Uldum",
  DRAGONS: "Descent of Dragons",
  BLACK_TEMPLE: "Ashes of Outland",
  SCHOLOMANCE: "Scholomance Academy",
  DARKMOON_FAIRE: "Madness at the Darkmoon Faire",
  THE_BARRENS: "Forged in the Barrens",
  STORMWIND: "United in Stormwind",
  ALTERAC_VALLEY: "Fractured in Alterac Valley",
  THE_SUNKEN_CITY: "Voyage to the Sunken City",
  REVENDRETH: "Murder at Castle Nathria",
  RETURN_OF_THE_LICH_KING: "March of the Lich King",
  BATTLE_OF_THE_BANDS: "Festival of Legends",
  WILD_WEST: "Showdown in the Badlands",
  WONDERS: "Caverns of Time",
  WHIZBANGS_WORKSHOP: "Whizbang's Workshop",
  ISLAND_VACATION: "Perils in Paradise",
  SPACE: "The Great Dark Beyond",
  EMERALD_DREAM: "Into the Emerald Dream",
  TIME_TRAVEL: "Across the Timeways",
  TB: "Tavern Brawl",
  LETTUCE: "Mercenaries",
};

export function formatCardSetName(set: string): string {
  return (
    CARD_SET_NAMES[set] ??
    set
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
