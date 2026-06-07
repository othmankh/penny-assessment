import type { Hand } from "@/game/models/Hand";
import type { Tile } from "@/game/models/Tile";

export enum BetType {
  Higher = "higher",
  Lower = "lower",
}

export enum GameStatus {
  Idle = "idle",
  Playing = "playing",
  GameOver = "game-over",
}

export interface RoundResult {
  readonly bet: BetType;
  readonly previousHand: Hand;
  readonly nextHand: Hand;
  readonly won: boolean;
  readonly scoreDelta: number;
}

export interface GameState {
  readonly currentHand: Hand | null;
  readonly history: readonly RoundResult[];
  readonly drawPile: readonly Tile[];
  readonly discardPile: readonly Tile[];
  readonly score: number;
  readonly reshuffleCount: number;
  readonly status: GameStatus;
  readonly gameOverReason?: string;
}

export interface ScoreEntry {
  readonly id: string;
  readonly score: number;
  readonly rounds: number;
  readonly createdAt: string;
}
