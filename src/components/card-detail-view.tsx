import { Action, ActionPanel, Detail, Icon } from '@raycast/api'
import { useEffect, useState } from 'react'
import { CardImageLanguage, getDefaultCardImageLanguage } from '../preferences'
import { Card, CardSlot } from '../types/types'
// import { getRarityColor } from './utils'

interface CardDetailViewProps {
  slot?: Partial<CardSlot>
  card?: Partial<Card> | null
  deckCode?: string
  language?: 'enUS' | 'zhCN'
}

export function CardDetailView({ 
  slot = {}, 
  card = null, 
  language = 'enUS'
}: CardDetailViewProps) {
  const safeSlot: CardSlot = {
    card: {
      name: slot?.card?.name || 'Unknown',
      cost: slot?.card?.cost ?? 0,
      collectible: slot?.card?.collectible ?? false,
      rarity: slot?.card?.rarity || 'Unknown',
      id: '',
      dbfId: 0,
      mana: slot?.card?.mana ?? 0
    },
    amount: slot?.amount ?? 1
  }

  const safeCard: Card = {
    name: card?.name || safeSlot.card.name,
    cost: card?.cost ?? safeSlot.card.cost,
    cardClass: card?.cardClass || 'NEUTRAL',
    collectible: card?.collectible ?? false,
    id: card?.id || '',
    dbfId: card?.dbfId || 0,
    mana: card?.mana ?? 0,
    attack: card?.attack ?? 0,
    health: card?.health ?? 0,
    mechanics: card?.mechanics || [],
    rarity: card?.rarity || safeSlot.card.rarity,
    text: card?.text || '',
    flavor: card?.flavor || '',
    type: card?.type || '',
    set: card?.set || '',
    elite: card?.elite || false,
    faction: card?.faction || ''
  }

  const [cardImageLanguage, setCardImageLanguage] = useState<CardImageLanguage>(
    language === 'enUS' ? CardImageLanguage.ENGLISH : CardImageLanguage.CHINESE
  )

  useEffect(() => {
    const defaultLanguage = getDefaultCardImageLanguage()
    setCardImageLanguage(defaultLanguage)
  }, [])

  const cardId = safeCard.id
  const dbfId = safeCard.dbfId.toString()
  const cardName = safeCard.name
  const set = safeCard.set
  const type = safeCard.type
  const attack = safeCard.attack?.toString() ?? '0'
  const health = safeCard.health?.toString() ?? '0'
  const elite = safeCard.elite ? 'Yes' : 'No'
  const faction = safeCard.faction ?? ''
  const mechanics = safeCard.mechanics?.join(', ') ?? ''
  const rarity = safeCard.rarity
  
  const cardClass = safeCard.cardClass?.toUpperCase() || 'NEUTRAL'

  const classNameMap: Record<string, string> = {
    'DEATHKNIGHT': 'Death Knight',
    'DEMONHUNTER': 'Demon Hunter',
    'DRUID': 'Druid',
    'HUNTER': 'Hunter',
    'MAGE': 'Mage',
    'NEUTRAL': 'Neutral',
    'PALADIN': 'Paladin',
    'PRIEST': 'Priest',
    'ROGUE': 'Rogue',
    'SHAMAN': 'Shaman',
    'WARLOCK': 'Warlock',
    'WARRIOR': 'Warrior'
  }

  const classSymbolMap: Record<string, string> = {
    'DEATHKNIGHT': '✠', 
    'DEMONHUNTER': '☠', 
    'DRUID': '⍟', 
    'HUNTER': '⍉', 
    'MAGE': '∗', 
    'NEUTRAL': '○', 
    'PALADIN': '⛨', 
    'PRIEST': '✙', 
    'ROGUE': '⚔', 
    'SHAMAN': '☸︎', 
    'WARLOCK': '⏣', 
    'WARRIOR': '⊗'
  }

  const imageUrl = safeCard.id
    ? `https://art.hearthstonejson.com/v1/render/latest/${cardImageLanguage === CardImageLanguage.ENGLISH ? 'enUS' : 'zhCN'
    }/256x/${safeCard.id.replace(/^CORE_/, '')}.png`
    : null

  const toggleCardImageLanguage = () => {
    setCardImageLanguage(
      cardImageLanguage === CardImageLanguage.ENGLISH 
        ? CardImageLanguage.CHINESE 
        : CardImageLanguage.ENGLISH
    )
  }

  const markdown = `
${imageUrl ? `![${cardName}](${imageUrl})` : '*Card image not found*'}

${safeCard.text ? `**Card Text:**\n\n${safeCard.text}` : ''}

${safeCard.flavor ? `*Flavor Text:*\n\n${safeCard.flavor}` : ''}
${safeCard.id ? `*ID Text:*\n\n${safeCard.id}` : ''}

${safeCard.dbfId ? `*dbfId Text:*\n\n${safeCard.dbfId}` : ''}
  `

  return (
    <Detail
      markdown={markdown}
      navigationTitle={`${cardName} Details`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Card Name" text={cardName} />
          <Detail.Metadata.Label title="Card ID" text={cardId} />
          <Detail.Metadata.Label title="DBF ID" text={dbfId} />
          <Detail.Metadata.Label title="Type" text={type} />
          <Detail.Metadata.Label title="Set" text={set} />
          <Detail.Metadata.Label title="Attack" text={attack} />
          <Detail.Metadata.Label title="Health" text={health} />
          <Detail.Metadata.Label title="Rarity" text={rarity} />
          <Detail.Metadata.Label title="Elite" text={elite} />
          <Detail.Metadata.Label title="Faction" text={faction} />
          <Detail.Metadata.Label title="Mechanics" text={mechanics} />
          <Detail.Metadata.Label 
            title="Class" 
            text={`${classSymbolMap[cardClass] || '⚬'}  ${classNameMap[cardClass] || cardClass}`} 
          />
          <Detail.Metadata.Label 
            title="Mana Cost" 
            text={`♦  ${safeCard.mana.toString().padStart(3, '0')}`} 
          />
          <Detail.Metadata.Label 
            title="Collectible" 
            text={safeCard.collectible ? 'Yes' : 'No'} 
          />
          <Detail.Metadata.Label
            title="Card Language"
            text={cardImageLanguage === CardImageLanguage.ENGLISH ? 'English' : 'Chinese'}
            icon={{ source: Icon.Globe }}
          />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action
            title={cardImageLanguage === CardImageLanguage.ENGLISH ? 'Switch to Chinese Card' : 'Switch to English Card'}
            icon={Icon.Globe}
            onAction={toggleCardImageLanguage}
          />
          <Action.OpenInBrowser
            url="https://hearthstone.blizzard.com/en-us/cards"
            title="Hearthstone Card Database 🇺🇲"
            shortcut={{ modifiers: ['cmd', 'shift'], key: 'e' }}
          />
          <Action.OpenInBrowser
            url="https://hs.blizzard.cn/cards"
            title="Hearthstone Card Database 🇨🇳"
            shortcut={{ modifiers: ['cmd', 'shift'], key: 'c' }}
          />
        </ActionPanel>
      }
    />
  )
}
