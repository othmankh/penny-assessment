import type { Tile } from "./Tile";

export interface Hand {
  readonly id: string;
  readonly tiles: readonly Tile[];
  readonly totalValue: number;
}
