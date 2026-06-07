import type { ScoreEntry } from "@/game/models/GameState";
import { createId } from "@/utils/random";

const KEY = "hand-betting-game:leaderboard";

export const leaderboardService = {
  getTopScores(): ScoreEntry[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as ScoreEntry[];
      return parsed.slice(0, 5);
    } catch {
      return [];
    }
  },

  addScore(score: number, rounds: number): ScoreEntry[] {
    if (typeof window === "undefined") return [];
    const scores = this.getTopScores();
    const next = [
      ...scores,
      { id: createId("score"), score, rounds, createdAt: new Date().toISOString() },
    ]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  },
};
