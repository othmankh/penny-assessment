import type { RoundResult } from "@/game/models/GameState";
import { Tile } from "@/components/tiles/Tile";

export function HistoryPanel({ history }: { readonly history: readonly RoundResult[] }) {
  return (
    <aside className="max-h-[560px] overflow-auto rounded-3xl border border-penny-teal/15 bg-white p-5 shadow-card">
      <h2 className="mb-4 text-xl font-black text-penny-navy">History</h2>
      {history.length === 0 ? <p className="text-sm text-slate-500">Previous hands will appear here.</p> : null}
      <div className="space-y-4">
        {history.map((round, index) => (
          <div key={`${round.nextHand.id}-${index}`} className="rounded-2xl bg-penny-teal-soft p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className={round.won ? "font-semibold text-penny-success" : "font-semibold text-penny-blue"}>
                {round.won ? "Won" : "Lost"} • {round.bet}
              </span>
              <strong className="text-penny-navy">{round.nextHand.totalValue}</strong>
            </div>
            <div className="flex gap-2">{round.nextHand.tiles.map((tile) => <Tile key={tile.id} tile={tile} compact />)}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
