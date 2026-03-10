// 1) Palette moderne/ergonomique (Tailwind)
const AVATAR_FALLBACK_COLORS = [
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-fuchsia-100 text-fuchsia-700",
] as const;

// 2) Choix stable depuis une string (id, username, initials, etc.)
export function getAvatarFallbackColor(seed?: string) {
  if (!seed) return AVATAR_FALLBACK_COLORS[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_FALLBACK_COLORS[hash % AVATAR_FALLBACK_COLORS.length];
}
