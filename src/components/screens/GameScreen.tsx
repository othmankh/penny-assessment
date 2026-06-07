import { BettingPanel } from "@/components/game/BettingPanel";
import { DeckStatus } from "@/components/game/DeckStatus";
import { GameHeader } from "@/components/game/GameHeader";
import { HistoryPanel } from "@/components/game/HistoryPanel";
import type { BetType, RoundResult } from "@/game/models/GameState";
import type { Hand } from "@/game/models/Hand";
import { TileHand } from "@/components/tiles/TileHand";

export function GameScreen({
  score,
  currentHand,
  history,
  drawPileCount,
  discardPileCount,
  reshuffleCount,
  onBet,
  onExit,
}: {
  readonly score: number;
  readonly currentHand: Hand | null;
  readonly history: readonly RoundResult[];
  readonly drawPileCount: number;
  readonly discardPileCount: number;
  readonly reshuffleCount: number;
  readonly onBet: (bet: BetType) => void;
  readonly onExit: () => void;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <GameHeader score={score} onExit={onExit} />
      <div className="grid gap-6 lg:grid-cols-[1fr_.4fr]">
        <section className="space-y-6">
          <DeckStatus draw={drawPileCount} discard={discardPileCount} reshuffles={reshuffleCount} />
          {currentHand ? <TileHand hand={currentHand} /> : null}
          <BettingPanel onBet={onBet} />
        </section>
        <HistoryPanel history={history} />
      </div>
    </main>
  );
}
