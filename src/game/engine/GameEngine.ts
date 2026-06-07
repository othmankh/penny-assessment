import { gameConfig } from "@/game/config/gameConfig";
import { createInitialDeck, discardTiles, drawTiles } from "@/game/engine/DeckManager";
import { createHand } from "@/game/engine/HandManager";
import { BetType, GameStatus, type GameState, type RoundResult } from "@/game/models/GameState";
import type { Tile } from "@/game/models/Tile";
import { didWin } from "@/game/rules/BettingRule";
import { scoreDelta } from "@/game/rules/ScoreRule";
import { dynamicTileLimitMessage, hasTerminalDynamicValue, updateDynamicValues } from "@/game/rules/TileValueRule";

export function startNewGame(): GameState {
  const deck = createInitialDeck();
  const firstDraw = drawTiles(deck, gameConfig.handSize);
  return {
    currentHand: createHand(firstDraw.drawnTiles),
    history: [],
    drawPile: firstDraw.drawPile,
    discardPile: [],
    score: 0,
    reshuffleCount: 0,
    status: GameStatus.Playing,
  };
}

export function playRound(state: GameState, bet: BetType): GameState {
  if (state.status !== GameStatus.Playing || state.currentHand === null) return state;

  const deckWithDiscardedCurrent = discardTiles(state, state.currentHand.tiles);
  const draw = drawTiles(deckWithDiscardedCurrent, gameConfig.handSize);
  const rawNextHand = createHand(draw.drawnTiles);
  const won = didWin(bet, state.currentHand, rawNextHand);
  const adjustedTiles = updateDynamicValues(rawNextHand, won);
  const nextHand = createHand(adjustedTiles);
  const roundScoreDelta = scoreDelta(won);
  const round: RoundResult = { bet, previousHand: state.currentHand, nextHand, won, scoreDelta: roundScoreDelta };
  const nextScore = Math.max(0, state.score + roundScoreDelta);

  const gameOverReason = getGameOverReason(draw.reshuffleCount, adjustedTiles);

  return {
    currentHand: nextHand,
    history: [round, ...state.history],
    drawPile: draw.drawPile,
    discardPile: draw.discardPile,
    score: nextScore,
    reshuffleCount: draw.reshuffleCount,
    status: gameOverReason ? GameStatus.GameOver : GameStatus.Playing,
    gameOverReason,
  };
}

function getGameOverReason(reshuffleCount: number, tiles: readonly Tile[]): string | undefined {
  if (hasTerminalDynamicValue(tiles)) return dynamicTileLimitMessage();
  if (reshuffleCount >= gameConfig.maxReshuffles) {
    return `The draw pile ran out for the ${gameConfig.maxReshuffles} time.`;
  }
  return undefined;
}
