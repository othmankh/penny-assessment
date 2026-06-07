import type { Tile as TileModel } from "@/game/models/Tile";
import { motion } from "framer-motion";

export function Tile({ tile, compact = false }: { readonly tile: TileModel; readonly compact?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border border-penny-teal/40 bg-white text-penny-navy shadow-card ${compact ? "px-2 py-1" : "px-6 py-3"}`}
      title={tile.label}
    >
      <div className={`${compact ? "text-2xl" : "text-8xl"}`}>{tile.symbol}</div>
      <div className={`my-3 text-center font-bold text-penny-teal ${compact ? "text-xs" : "text-xl"}`}>{tile.currentValue}</div>
    </motion.div>
  );
}
