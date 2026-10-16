/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Default Card Image Language - Choose the default language for card images only (UI remains in English) */
  "defaultCardImageLanguage": "enUS" | "zhCN"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-best-decks` command */
  export type SearchBestDecks = ExtensionPreferences & {}
  /** Preferences accessible in the `search-class-decks` command */
  export type SearchClassDecks = ExtensionPreferences & {}
  /** Preferences accessible in the `card-list` command */
  export type CardList = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-best-decks` command */
  export type SearchBestDecks = {}
  /** Arguments passed to the `search-class-decks` command */
  export type SearchClassDecks = {}
  /** Arguments passed to the `card-list` command */
  export type CardList = {}
}

