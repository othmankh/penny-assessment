import { describe, expect, it } from "vitest";
import { BetType, GameStatus, type GameState } from "../models/GameState";
import { gameConfig } from "../config/gameConfig";
import { playRound, startNewGame } from "../engine/GameEngine";
import { dynamicTileLimitMessage, hasTerminalDynamicValue, updateDynamicValues } from "../rules/TileValueRule";
import type { Hand } from "../models/Hand";
import type { Tile } from "../models/Tile";

const dynamicTile = (value: number): Tile => ({
  id: `dragon-${value}`,
  kind: "dragon",
  suit: "red",
  label: "red dragon",
  symbol: "🀄",
  baseValue: 5,
  currentValue: value,
});

const numberTile = (value: number): Tile => ({
  id: `bamboo-${value}`,
  kind: "number",
  suit: "bamboo",
  faceValue: value,
  label: `${value} bamboo`,
  symbol: "🀐",
  baseValue: value,
  currentValue: value,
});

const hand = (tiles: readonly Tile[]): Hand => ({ id: "hand", tiles, totalValue: tiles.reduce((sum, tile) => sum + tile.currentValue, 0) });

const playingState = (overrides: Partial<GameState>): GameState => ({
  currentHand: hand([numberTile(1), numberTile(1), numberTile(1)]),
  history: [],
  drawPile: [],
  discardPile: [],
  score: 0,
  reshuffleCount: 0,
  status: GameStatus.Playing,
  ...overrides,
});

describe("GameEngine", () => {
  it("starts with a current hand and draw pile", () => {
    const game = startNewGame();
    expect(game.currentHand?.tiles).toHaveLength(3);
    expect(game.drawPile.length).toBeGreaterThan(0);
    expect(game.status).toBe(GameStatus.Playing);
  });

  it("plays a round and records history", () => {
    const game = startNewGame();
    const next = playRound(game, BetType.Higher);
    expect(next.history).toHaveLength(1);
    expect(next.currentHand).not.toBeNull();
  });

  it("ends the game after the maximum number of reshuffles", () => {
    const game = playingState({
      drawPile: [numberTile(1)],
      discardPile: [numberTile(2)],
      reshuffleCount: 2,
    });

    const next = playRound(game, BetType.Higher);

    expect(next.status).toBe(GameStatus.GameOver);
    expect(next.gameOverReason).toBe("The draw pile ran out for the 3 time.");
    expect(next.reshuffleCount).toBe(3);
  });

  it("ends the game when a dynamic tile reaches the max value after a win", () => {
    const game = playingState({
      currentHand: hand([numberTile(1), numberTile(1), numberTile(1)]),
      drawPile: [dynamicTile(gameConfig.maxDynamicTileValue - 1), numberTile(5), numberTile(5)],
    });

    const next = playRound(game, BetType.Higher);

    expect(next.status).toBe(GameStatus.GameOver);
    expect(next.gameOverReason).toBe(dynamicTileLimitMessage());
    expect(
      next.currentHand?.tiles.some(
        (tile) => tile.kind === "dragon" && tile.currentValue === gameConfig.maxDynamicTileValue,
      ),
    ).toBe(true);
  });

  it("ends the game when a dynamic tile reaches the min value after a loss", () => {
    const game = playingState({
      currentHand: hand([numberTile(1), numberTile(1), numberTile(1)]),
      drawPile: [dynamicTile(gameConfig.minDynamicTileValue + 1), numberTile(5), numberTile(5)],
    });

    const next = playRound(game, BetType.Lower);

    expect(next.status).toBe(GameStatus.GameOver);
    expect(next.gameOverReason).toBe(dynamicTileLimitMessage());
    expect(
      next.currentHand?.tiles.some(
        (tile) => tile.kind === "dragon" && tile.currentValue === gameConfig.minDynamicTileValue,
      ),
    ).toBe(true);
  });
});

describe("TileValueRule", () => {
  it("increases dynamic tile values after wins", () => {
    expect(updateDynamicValues(hand([dynamicTile(5)]), true)[0]?.currentValue).toBe(6);
  });

  it("decreases dynamic tile values after losses", () => {
    expect(updateDynamicValues(hand([dynamicTile(5)]), false)[0]?.currentValue).toBe(4);
  });

  it("detects terminal values at the max limit", () => {
    expect(hasTerminalDynamicValue([dynamicTile(gameConfig.maxDynamicTileValue)])).toBe(true);
  });

  it("detects terminal values at the min limit", () => {
    expect(hasTerminalDynamicValue([dynamicTile(gameConfig.minDynamicTileValue)])).toBe(true);
  });
});
