import type { Hand } from "@/game/models/Hand";
import type { Tile } from "@/game/models/Tile";
import { createId } from "@/utils/random";

export function createHand(tiles: readonly Tile[]): Hand {
  return {
    id: createId("hand"),
    tiles,
    totalValue: tiles.reduce((total, tile) => total + tile.currentValue, 0),
  };
}
