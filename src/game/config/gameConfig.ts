const getEnvInt = (value: string | undefined, fallback: number): number => {
  if (value === undefined || value === "") return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const gameConfig = {
  handSize: getEnvInt(import.meta.env.VITE_HAND_SIZE, 3),
  winScoreDelta: getEnvInt(import.meta.env.VITE_WIN_SCORE_DELTA, 1),
  lossScoreDelta: getEnvInt(import.meta.env.VITE_LOSS_SCORE_DELTA, -1),
  maxReshuffles: getEnvInt(import.meta.env.VITE_MAX_DRAW_EXHAUSTIONS, 3),
  minDynamicTileValue: getEnvInt(import.meta.env.VITE_MIN_TILE_VALUE, 0),
  maxDynamicTileValue: getEnvInt(import.meta.env.VITE_MAX_TILE_VALUE, 10),
} as const;
