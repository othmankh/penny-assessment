import { GameStatus, type GameState } from "@/game/models/GameState";

const KEY = "hand-betting-game:state";

export const gameStateService = {
  load(): GameState | null {
    if (typeof window === "undefined") return null;
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as GameState;
      if (parsed.status === GameStatus.Idle) return null;
      return parsed;
    } catch {
      return null;
    }
  },

  save(state: GameState): void {
    if (typeof window === "undefined") return;
    if (state.status === GameStatus.Idle) {
      window.sessionStorage.removeItem(KEY);
      return;
    }
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  },

  clear(): void {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(KEY);
  },
};
