# Hand Betting Game

A polished web-based Mahjong tile betting game built for the Penny Software technical assessment.

## Features

- Landing page with New Game and top 5 leaderboard
- Mahjong-inspired tile deck with Dragons, Winds, and Number tiles
- Bet Higher / Bet Lower gameplay
- Dynamic Dragon/Wind value scaling
- Draw pile and discard pile counters
- Reshuffle handling with game-over condition on the 3rd draw-pile depletion
- Game-over summary and persistent local leaderboard
- Modular game engine designed for interview-time extension
- Unit tests for core game logic

## Tech Stack

- Vite
- React
- TypeScript
- Zustand
- TailwindCSS
- Framer Motion
- Vitest

## Setup

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Tests

Unit tests:

```bash
npm test
```

End-to-end tests (Playwright):

```bash
npm run test:e2e
```

Interactive Playwright UI:

```bash
npm run test:e2e:ui
```

## Architecture

The project separates UI from game rules:

- `src/game/engine` contains the pure game engine.
- `src/game/rules` contains isolated rules for betting, scoring, and tile value scaling.
- `src/game/factories` creates the Mahjong tile deck.
- `src/store` connects the pure engine to React.
- `src/components` renders the interface.

New betting modes, tile types, power-ups, or scoring systems can be added without rewriting React components.

## AI Usage

AI was used for the following parts of this project:

- **Visual design and UI polish** — layout ideas and styling direction for a clean, professional game interface aligned with a modern SaaS feel (including Penny-inspired theming).
- **Tailwind CSS guidance** — utility classes, responsive layout patterns (e.g. grid columns, spacing), and Framer Motion animation setup.
- **Mahjong tile deck** — card definitions in `src/game/factories/TileFactory.ts`, including suits (bamboo, characters, dots, dragons, winds) and tile symbols, instead of entering them manually.
- **Shuffle utility** — the Fisher–Yates shuffle and ID helper in `src/utils/random.ts`, used when creating and reshuffling the deck.