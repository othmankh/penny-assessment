import type { Tile } from "@/game/models/Tile";

export interface Hand {
  readonly id: string;
  readonly tiles: readonly Tile[];
  readonly totalValue: number;
}
