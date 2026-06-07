import { motion } from "framer-motion";
import { slideFromRightMotion } from "@/components/motion/landingMotion";
import type { ScoreEntry } from "@/game/models/GameState";

export function LeaderboardPanel({ leaderboard }: { readonly leaderboard: readonly ScoreEntry[] }) {
  return (
    <motion.section
      {...slideFromRightMotion}
      className="rounded-[2rem] border border-penny-teal/15 bg-white p-8 shadow-card"
    >
      <h2 className="text-2xl font-black text-penny-navy">Top 5 Leaderboard</h2>
      <div className="mt-5 space-y-3">
        {leaderboard.length === 0 ? <p className="text-slate-500">No scores yet. Start the first game.</p> : null}
        {leaderboard.map((entry, index) => (
          <div key={entry.id} className="flex items-center justify-between rounded-2xl bg-penny-teal-soft px-4 py-3">
            <span className="font-bold text-penny-navy">#{index + 1}</span>
            <span className="text-penny-navy-muted">{entry.rounds} rounds</span>
            <strong className="text-penny-teal">{entry.score}</strong>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
