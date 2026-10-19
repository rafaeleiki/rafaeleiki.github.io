import { rgba } from './color';

export const SEED = 1996;
export const INK = '#050509';
export const ACCENT = '#7c6cff';
export const ACCENT_2 = '#2ee6c6';
export const ACCENT_DEEP = '#4c3fce';
export const PORTRAIT_BACKGROUND = '#e9e7f2';

export const ACCENT_GRADIENT = 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))';
export const BACKDROP_COLORS = [ACCENT, ACCENT_2, ACCENT_DEEP];
export const CURSOR_GLOW = `radial-gradient(circle, ${rgba(ACCENT, 0.14)}, transparent 60%)`;
export const MONOGRAM_STROKE = rgba(ACCENT, 0.18);
export const SCANLINE_GRADIENT = `linear-gradient(180deg, transparent, ${rgba(ACCENT, 0.08)}, transparent)`;
