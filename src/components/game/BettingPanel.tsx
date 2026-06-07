import { BetType } from "@/game/models/GameState";

export function BettingPanel({ onBet }: { readonly onBet: (bet: BetType) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        onClick={() => onBet(BetType.Higher)}
        className="rounded-2xl bg-penny-success px-8 py-5 text-xl font-black text-white shadow-glow transition hover:-translate-y-1 hover:bg-penny-mint"
      >
        Bet Higher ↑
      </button>
      <button
        onClick={() => onBet(BetType.Lower)}
        className="rounded-2xl border-2 border-penny-blue bg-white px-8 py-5 text-xl font-black text-penny-blue shadow-card transition hover:-translate-y-1 hover:bg-penny-teal-soft"
      >
        Bet Lower ↓
      </button>
    </div>
  );
}
