export type NumberSuit = "bamboo" | "characters" | "dots";
export type DragonSuit = "red" | "green" | "white";
export type WindSuit = "east" | "south" | "west" | "north";

export type TileKind = "number" | "dragon" | "wind";

export interface BaseTile {
  readonly id: string;
  readonly kind: TileKind;
  readonly label: string;
  readonly symbol: string;
  readonly baseValue: number;
  readonly currentValue: number;
}

export interface NumberTile extends BaseTile {
  readonly kind: "number";
  readonly suit: NumberSuit;
  readonly faceValue: number;
}

export interface DragonTile extends BaseTile {
  readonly kind: "dragon";
  readonly suit: DragonSuit;
}

export interface WindTile extends BaseTile {
  readonly kind: "wind";
  readonly suit: WindSuit;
}

export type Tile = NumberTile | DragonTile | WindTile;

export const isDynamicTile = (tile: Tile): tile is DragonTile | WindTile =>
  tile.kind === "dragon" || tile.kind === "wind";
