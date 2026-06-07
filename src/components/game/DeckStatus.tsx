export function DeckStatus({ draw, discard, reshuffles }: { readonly draw: number; readonly discard: number; readonly reshuffles: number }) {
  const item = (label: string, value: number) => (
    <div className="rounded-2xl border border-penny-teal/15 bg-white px-5 py-3 text-center shadow-card">
      <div className="text-xs font-semibold uppercase tracking-widest text-penny-navy-muted">{label}</div>
      <div className="text-2xl font-black text-penny-teal">{value}</div>
    </div>
  );
  return <div className="grid grid-cols-3 gap-3">{item("Draw", draw)}{item("Discard", discard)}{item("Empty", reshuffles)}</div>;
}
