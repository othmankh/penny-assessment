import { GameDescription } from "@/components/game/GameDescription";
import { LeaderboardPanel } from "@/components/game/LeaderboardPanel";
import type { ScoreEntry } from "@/game/models/GameState";

export function LandingScreen({
  leaderboard,
  onStartGame,
}: {
  readonly leaderboard: readonly ScoreEntry[];
  readonly onStartGame: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
      <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <GameDescription onStartGame={onStartGame} />
        <LeaderboardPanel leaderboard={leaderboard} />
      </div>
    </main>
  );
}
