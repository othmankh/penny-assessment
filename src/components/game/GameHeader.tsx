import { useState } from "react";
import { ConfirmDialog } from "@/components/game/ConfirmDialog";

export function GameHeader({ score, onExit }: { readonly score: number; readonly onExit: () => void }) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-penny-teal">Penny Software</p>
          <p className="mt-1 text-sm uppercase tracking-[0.3em] text-penny-navy-muted">Score</p>
          <h1 className="text-5xl font-black text-penny-navy">{score}</h1>
        </div>
        <button
          onClick={() => setShowExitConfirm(true)}
          className="rounded-xl border border-penny-teal/25 px-5 py-3 font-bold text-penny-navy transition hover:bg-penny-teal-soft"
        >
          Exit Game
        </button>
      </header>

      {showExitConfirm ? (
        <ConfirmDialog
          title="Exit game?"
          message="Your current progress will be lost. Are you sure you want to leave?"
          confirmLabel="Exit Game"
          onConfirm={() => {
            setShowExitConfirm(false);
            onExit();
          }}
          onCancel={() => setShowExitConfirm(false)}
        />
      ) : null}
    </>
  );
}
