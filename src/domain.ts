export enum ClassName {
  DRUID = 'Druid',
  HUNTER = 'Hunter',
  MAGE = 'Mage',
  PALADIN = 'Paladin',
  PRIEST = 'Priest',
  ROGUE = 'Rogue',
  SHAMAN = 'Shaman',
  WARLOCK = 'Warlock',
  WARRIOR = 'Warrior',
  DEMONHUNTER = 'Demon Hunter',
  DEATHKNIGHT = 'Death Knight',
}

export interface Card {
  id: string
  dbfId: number
  name: string
  text?: string
  flavor?: string
  artist?: string
  attack?: number
  cardClass?: string
  collectible: boolean
  cost: number
  mana: number
  elite?: boolean
  faction?: string
  health?: number
  mechanics?: string[]
  rarity?: string
  set?: string
  type?: string
}

export interface CardSlot {
  card: Card
  amount: 1 | 2
}

export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
}

export interface Deck {
  title: string
  deckID: string
  code: string
  className: ClassName
  winrate: number | null
  dust: number
  slots: CardSlot[]
}
