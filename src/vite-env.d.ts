/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HAND_SIZE?: string;
  readonly VITE_WIN_SCORE_DELTA?: string;
  readonly VITE_LOSS_SCORE_DELTA?: string;
  readonly VITE_MAX_DRAW_EXHAUSTIONS?: string;
  readonly VITE_MIN_TILE_VALUE?: string;
  readonly VITE_MAX_TILE_VALUE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
