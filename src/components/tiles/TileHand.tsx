import type { Hand } from "@/game/models/Hand";
import { Tile } from "./Tile";

export function TileHand({ hand }: { readonly hand: Hand }) {
  return (
    <section className="rounded-3xl border border-penny-teal/20 bg-white p-6 shadow-card">
      <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-penny-teal">Current Hand</p>
      <div className="flex justify-center gap-4">
        {hand.tiles.map((tile) => <Tile key={tile.id} tile={tile} />)}
      </div>
      <div className="mt-6 text-center">
        <span className="text-penny-navy-muted">Total value</span>
        <strong className="ml-3 text-5xl text-penny-teal">{hand.totalValue}</strong>
      </div>
    </section>
  );
}
