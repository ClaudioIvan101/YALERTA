/**
 * YAlerta Design System — Color Tokens
 * Single source of truth for all colors in the app.
 */
export const Colors = {
  // ── Primary ──
  primary: '#4dfd9d',
  primaryDim: 'rgba(77, 253, 157, 0.15)',
  primaryGlow: 'rgba(77, 253, 157, 0.35)',
  primaryBorder: 'rgba(77, 253, 157, 0.40)',
  primaryMuted: '#12dd81',
  primaryOnDark: '#004625',

  // ── Surface (backgrounds) ──
  surface: '#090e1c',
  surfaceLow: '#0d1323',
  surfaceHigh: '#181f33',
  surfaceElevated: '#1e2640',
  surfaceTranslucent: 'rgba(9, 14, 28, 0.88)',
  surfaceOverlay: 'rgba(9, 14, 28, 0.90)',

  // ── Status ──
  error: '#ff716c',
  errorDim: 'rgba(255, 113, 108, 0.15)',
  errorBorder: 'rgba(255, 113, 108, 0.30)',
  tertiary: '#feb700',
  tertiaryDim: 'rgba(254, 183, 0, 0.15)',
  tertiaryBorder: 'rgba(254, 183, 0, 0.30)',
  info: '#3b82f6',
  infoDim: 'rgba(59, 130, 246, 0.15)',

  // ── Text ──
  textPrimary: '#ffffff',
  textSecondary: '#a6aabf',
  textMuted: '#6b7194',

  // ── Borders ──
  border: '#181f33',
  borderSubtle: '#0d1323',
} as const;

export type ColorToken = keyof typeof Colors;
