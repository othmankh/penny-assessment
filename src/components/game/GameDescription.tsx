import { motion } from "framer-motion";
import { slideFromLeftMotion } from "@/components/motion/landingMotion";

export function GameDescription({ onStartGame }: { readonly onStartGame: () => void }) {
  return (
    <motion.section
      {...slideFromLeftMotion}
      className="rounded-[2rem] border border-penny-teal/15 bg-white p-10 shadow-card"
    >
      <p className="text-sm font-bold uppercase tracking-[0.35em] text-penny-teal">Penny Software</p>
      <h1 className="mt-5 text-6xl font-black leading-tight text-penny-navy">Hand Betting Game</h1>
      <p className="mt-5 max-w-2xl text-lg text-penny-navy-muted">
        Predict whether the next Mahjong hand will be higher or lower. Dragons and Winds shift value as they win
        and lose, so every round changes the risk.
      </p>
      <button
        onClick={onStartGame}
        className="mt-8 rounded-2xl bg-penny-teal px-8 py-4 text-xl font-black text-white shadow-glow transition hover:-translate-y-2 hover:bg-penny-teal-dark"
      >
        New Game
      </button>
    </motion.section>
  );
}
