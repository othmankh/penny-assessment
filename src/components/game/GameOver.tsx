export function GameOver({ score, rounds, reason, onRestart, onExit }: { readonly score: number; readonly rounds: number; readonly reason?: string; readonly onRestart: () => void; readonly onExit: () => void }) {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-penny-teal/20 bg-white p-8 text-center shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-penny-teal">Game Over</p>
      <h1 className="mt-3 text-5xl font-black text-penny-navy">Final Score: {score}</h1>
      <p className="mt-4 text-penny-navy-muted">Rounds played: {rounds}</p>
      <p className="mt-2 text-slate-500">{reason}</p>
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={onRestart} className="rounded-xl bg-penny-teal px-5 py-3 font-bold text-white hover:bg-penny-teal-dark">
          Play Again
        </button>
        <button onClick={onExit} className="rounded-xl border border-penny-teal/25 px-5 py-3 font-bold text-penny-navy hover:bg-penny-teal-soft">
          Home
        </button>
      </div>
    </section>
  );
}
