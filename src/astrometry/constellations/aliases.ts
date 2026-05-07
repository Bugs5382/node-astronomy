/**
 * Constellation name resolver — accepts canonical IAU Latin names (any
 * case), IAU 3-letter abbreviations, and common asterism / English
 * aliases (e.g. "Big Dipper" → "Ursa Major").
 *
 * @since 0.2.0
 */

import { constellations } from "@/astrometry/constellations";
import { type ConstellationName } from "@/astrometry/constellations/types";

/**
 * Asterism and informal-name aliases. Keys are lower-cased and white-
 * space-trimmed when matched. Each value is the parent IAU constellation.
 *
 * Ambiguous asterisms (e.g. "summer triangle" spans Lyra/Cygnus/Aquila)
 * resolve to the most prominent parent and are documented inline.
 *
 * @since 0.2.0
 */
const ASTERISM_ALIASES: Record<string, ConstellationName> = {
  "big dipper": "Ursa Major",
  bull: "Taurus",
  "circlet of pisces": "Pisces",
  crab: "Cancer",
  "false cross": "Vela",
  fish: "Pisces",
  "great bear": "Ursa Major",
  "great square": "Pegasus",
  "great square of pegasus": "Pegasus",
  hunter: "Orion",
  keystone: "Hercules",
  kite: "Boötes",
  lion: "Leo",
  "little dipper": "Ursa Minor",
  "northern cross": "Cygnus",
  plough: "Ursa Major",
  ram: "Aries",
  scales: "Libra",
  scorpion: "Scorpius",
  "sickle of leo": "Leo",
  "southern cross": "Crux",
  "summer triangle": "Lyra", // spans Lyra/Cygnus/Aquila; resolves to Lyra
  swan: "Cygnus",
  teapot: "Sagittarius",
  twins: "Gemini",
  water: "Aquarius",
  "water bearer": "Aquarius",
  "winter circle": "Orion", // spans Orion/Taurus/Auriga/Gemini/Canis Major/Canis Minor
};

interface AliasIndex {
  byAbbreviationLower: Map<string, ConstellationName>;
  byCanonicalLower: Map<string, ConstellationName>;
}

let cachedIndex: AliasIndex | undefined;

/**
 * Resolve a free-form input to a canonical IAU constellation name.
 *
 * Accepts (case-insensitive):
 * - Canonical Latin name (e.g. `"Orion"`, `"orion"`, `"ORION"`)
 * - IAU 3-letter abbreviation (e.g. `"Ori"`, `"UMa"`)
 * - Common asterism / English nickname (e.g. `"big dipper"`, `"plough"`)
 *
 * Returns `undefined` if no match.
 *
 * @since 0.2.0
 */
export function resolveConstellationName(
  input: string,
): ConstellationName | undefined {
  const key = normalise(input);
  const index = getIndex();
  const direct = index.byCanonicalLower.get(key);
  if (direct) return direct;
  const abbrev = index.byAbbreviationLower.get(key);
  if (abbrev) return abbrev;
  const alias = ASTERISM_ALIASES[key];
  if (alias) return alias;
  return undefined;
}

/**
 * Suggest the closest canonical names / aliases for an unrecognised
 * input. Used to produce a helpful error message.
 *
 * @since 0.2.0
 */
export function suggestConstellationNames(input: string, limit = 3): string[] {
  const key = normalise(input);
  const candidates = new Set<string>();
  for (const name of getIndex().byCanonicalLower.values()) candidates.add(name);
  for (const alias of Object.keys(ASTERISM_ALIASES)) candidates.add(alias);
  const ranked = [...candidates]
    .map((c) => ({ c, d: levenshtein(key, c.toLowerCase()) }))
    .toSorted((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((entry) => entry.c);
  return ranked;
}

function buildIndex(): AliasIndex {
  const byCanonicalLower = new Map<string, ConstellationName>();
  const byAbbreviationLower = new Map<string, ConstellationName>();
  for (const [name, data] of constellations) {
    byCanonicalLower.set(name.toLowerCase(), name);
    byAbbreviationLower.set(data.abbreviation.toLowerCase(), name);
  }
  return { byAbbreviationLower, byCanonicalLower };
}

function getIndex(): AliasIndex {
  if (!cachedIndex) cachedIndex = buildIndex();
  return cachedIndex;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const previous = Array.from<number>({ length: n + 1 });
  const current = Array.from<number>({ length: n + 1 });
  for (let index = 0; index <= n; index++) previous[index] = index;
  for (let index = 1; index <= m; index++) {
    current[0] = index;
    for (let index_ = 1; index_ <= n; index_++) {
      const cost =
        a.codePointAt(index - 1) === b.codePointAt(index_ - 1) ? 0 : 1;
      current[index_] = Math.min(
        current[index_ - 1] + 1,
        previous[index_] + 1,
        previous[index_ - 1] + cost,
      );
    }
    for (let index = 0; index <= n; index++) previous[index] = current[index];
  }
  return previous[n];
}

function normalise(input: string): string {
  return input.trim().toLowerCase().replaceAll(/\s+/g, " ");
}
