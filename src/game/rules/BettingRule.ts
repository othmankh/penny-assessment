import { BetType } from "@/game/models/GameState";
import type { Hand } from "@/game/models/Hand";

export function didWin(bet: BetType, previousHand: Hand, nextHand: Hand): boolean {
  return bet === BetType.Higher
    ? nextHand.totalValue > previousHand.totalValue
    : nextHand.totalValue < previousHand.totalValue;
}
