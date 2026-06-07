import type { Tile } from "../models/Tile";
import { createDeck } from "../factories/TileFactory";
import { shuffle } from "@/utils/random";

export interface DeckState {
  readonly drawPile: readonly Tile[];
  readonly discardPile: readonly Tile[];
  readonly reshuffleCount: number;
}

export interface DrawResult extends DeckState {
  readonly drawnTiles: readonly Tile[];
}

export function createInitialDeck(): DeckState {
  return { drawPile: shuffle(createDeck()), discardPile: [], reshuffleCount: 0 };
}

export function drawTiles(state: DeckState, count: number): DrawResult {
  const prepared = state.drawPile.length < count ? reshuffle(state) : state;
  const drawnTiles = prepared.drawPile.slice(0, count);
  const drawPile = prepared.drawPile.slice(count);
  return { ...prepared, drawPile, drawnTiles };
}

export function discardTiles(state: DeckState, tiles: readonly Tile[]): DeckState {
  return { ...state, discardPile: [...state.discardPile, ...tiles] };
}

function reshuffle(state: DeckState): DeckState {
  return {
    drawPile: shuffle([...createDeck(), ...state.discardPile]),
    discardPile: [],
    reshuffleCount: state.reshuffleCount + 1,
  };
}
