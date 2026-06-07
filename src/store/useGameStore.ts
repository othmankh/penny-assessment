import { create } from "zustand";
import { playRound, startNewGame } from "@/game/engine/GameEngine";
import { GameStatus, type BetType, type GameState, type ScoreEntry } from "@/game/models/GameState";
import { gameStateService } from "@/services/gameStateService";
import { leaderboardService } from "@/services/leaderboardService";

interface GameStore extends GameState {
  readonly leaderboard: readonly ScoreEntry[];
  startGame(): void;
  placeBet(bet: BetType): void;
  exitGame(): void;
  loadLeaderboard(): void;
}

const initialState: GameState = {
  currentHand: null,
  history: [],
  drawPile: [],
  discardPile: [],
  score: 0,
  reshuffleCount: 0,
  status: GameStatus.Idle,
};

const loadState = (): GameState => ({
  ...initialState,
  ...(gameStateService.load() ?? {}),
});

const persist = (state: GameState) => gameStateService.save(state);

export const useGameStore = create<GameStore>((set, get) => ({
  ...loadState(),
  leaderboard: [],
  startGame: () => {
    const next = startNewGame();
    persist(next);
    set({ ...next });
  },
  placeBet: (bet) => {
    const next = playRound(get(), bet);
    const shouldSave = get().status !== GameStatus.GameOver && next.status === GameStatus.GameOver;
    const leaderboard = shouldSave ? leaderboardService.addScore(next.score, next.history.length) : get().leaderboard;
    persist(next);
    set({ ...next, leaderboard });
  },
  exitGame: () => {
    gameStateService.clear();
    set({ ...initialState, leaderboard: get().leaderboard });
  },
  loadLeaderboard: () => set({ leaderboard: leaderboardService.getTopScores() }),
}));
