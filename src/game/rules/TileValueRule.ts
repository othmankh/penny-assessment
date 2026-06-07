import type { Hand } from "../models/Hand";
import type { Tile } from "../models/Tile";
import { isDynamicTile } from "../models/Tile";
import { gameConfig } from "../config/gameConfig";

export function updateDynamicValues(hand: Hand, won: boolean): Tile[] {
  return hand.tiles.map((tile) => {
    if (!isDynamicTile(tile)) return tile;
    const change = won ? 1 : -1;
    return { ...tile, currentValue: tile.currentValue + change };
  });
}

export function hasTerminalDynamicValue(tiles: readonly Tile[]): boolean {
  return tiles.some(
    (tile) =>
      isDynamicTile(tile) &&
      (tile.currentValue <= gameConfig.minDynamicTileValue ||
        tile.currentValue >= gameConfig.maxDynamicTileValue),
  );
}

export function dynamicTileLimitMessage(): string {
  return `A Dragon or Wind tile reached ${gameConfig.minDynamicTileValue} or ${gameConfig.maxDynamicTileValue}.`;
}
