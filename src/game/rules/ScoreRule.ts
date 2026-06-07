import { gameConfig } from "@/game/config/gameConfig";

export function scoreDelta(won: boolean): number {
  return won ? gameConfig.winScoreDelta : gameConfig.lossScoreDelta;
}
