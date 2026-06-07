import type { DragonSuit, NumberSuit, Tile, WindSuit } from "../models/Tile";
import { createId } from "@/utils/random";

const numberSymbolEntries: readonly { suit: NumberSuit; symbols: readonly string[] }[] = [
  { suit: "bamboo", symbols: ["🀐", "🀑", "🀒", "🀓", "🀔", "🀕", "🀖", "🀗", "🀘"] },
  { suit: "characters", symbols: ["🀇", "🀈", "🀉", "🀊", "🀋", "🀌", "🀍", "🀎", "🀏"] },
  { suit: "dots", symbols: ["🀙", "🀚", "🀛", "🀜", "🀝", "🀞", "🀟", "🀠", "🀡"] },
];

const dragonSymbolEntries: readonly { suit: DragonSuit; symbol: string }[] = [
  { suit: "red", symbol: "🀄" },
  { suit: "green", symbol: "🀅" },
  { suit: "white", symbol: "🀆" },
];

const windSymbolEntries: readonly { suit: WindSuit; symbol: string }[] = [
  { suit: "east", symbol: "🀀" },
  { suit: "south", symbol: "🀁" },
  { suit: "west", symbol: "🀂" },
  { suit: "north", symbol: "🀃" },
];

export function createDeck(): Tile[] {
  const numberTiles = numberSymbolEntries.flatMap(({ suit, symbols }) =>
    Array.from({ length: 9 }, (_, index) => {
      const faceValue = index + 1;
      return Array.from({ length: 4 }, (): Tile => ({
        id: createId(`${suit}-${faceValue}`),
        kind: "number",
        suit,
        faceValue,
        label: `${faceValue} ${suit}`,
        symbol: symbols[index],
        baseValue: faceValue,
        currentValue: faceValue,
      }));
    }).flat(),
  );

  const dragonTiles = dragonSymbolEntries.flatMap(({ suit, symbol }) =>
    Array.from({ length: 4 }, (): Tile => ({
      id: createId(`dragon-${suit}`),
      kind: "dragon",
      suit,
      label: `${suit} dragon`,
      symbol,
      baseValue: 5,
      currentValue: 5,
    })),
  );

  const windTiles = windSymbolEntries.flatMap(({ suit, symbol }) =>
    Array.from({ length: 4 }, (): Tile => ({
      id: createId(`wind-${suit}`),
      kind: "wind",
      suit,
      label: `${suit} wind`,
      symbol,
      baseValue: 5,
      currentValue: 5,
    })),
  );

  return [...numberTiles, ...dragonTiles, ...windTiles];
}
