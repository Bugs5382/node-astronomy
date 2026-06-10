# AGENTS.md - node-astronomy

Guide for AI agents working in this repository. Pair with `CLAUDE.md` (the working agreement and
hook-enforced rules). Keep this file current when the build, layout, or public API changes.

## What this is

A pure-TypeScript astronomy library that computes information about solar-system objects and stars:
planet/sun/moon positions, rise/set and twilight times, moon phases, and constellations. No runtime
services or network calls — every result is computed from a supplied time and (where relevant) an
observer location.

Published to npm as `node-astronomy`. Ships dual ESM + CJS with type declarations (built to `lib/`).

## Using node-astronomy in an app

If you are an agent consuming this package, the contract:

- **Single entry point.** Import everything from `node-astronomy` (do not deep-import `lib/...`). The
  surface includes the snapshot classes (`Sun`, `Moon`, `Planet` and its subclasses `Mercury`,
  `Venus`, `Earth`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto`), the time helpers
  (`SunTimes`, `MoonTimes`, `MoonPhase`, `StarTimes`), `Celestial`/`Star`/`Constellation`,
  `TimeOfInterest`, and functions like `findConstellationAt`, `getNamedStar`, `listNamedStars`,
  `visibleConstellations`.
- **Construct a snapshot with a time.** Pass `{ time }` where `time` is a `Date` (or a
  `TimeOfInterest`). Times are UTC instants.

```ts
import { Mars, type PlanetName } from "node-astronomy";

const mars = new Mars({ time: new Date("2026-04-30T22:00:00Z") });
mars.planet;               // "mars"
mars.symbol();             // "Mars"  (a word, not the astronomical glyph)
mars.eclipticCoordinate(); // { longitude: number /* 0..360 */, latitude: number /* -90..90 */ }
```

- **CJS works too:** `const { Mars } = require("node-astronomy");`.
- **Import types from this package**, not from internal paths: `import type { PlanetName } from "node-astronomy"`.
- `symbol()` returns the planet **name in words** (e.g. `"Mars"`), not the Unicode astrological glyph
  — the glyphs were dropped so the source stays ASCII-only.

## Layout

- `src/index.ts` - the public entry point; re-exports the surface below.
- `src/astronomicalObject/` - the consumer-facing snapshot classes (`Planet` + subclasses, `Sun`,
  `Moon`, `Celestial`, `Star`, `Constellation`) and their `*Times`/`*Phase` helpers.
- `src/astrometry/` - the underlying math (VSOP87 earth/heliocentric, moon terms, planet
  geo/heliocentric, sun anomaly/ecliptic, constellations, transit/hour-angle/circumpolar).
- `src/time/` - `TimeOfInterest` and time conversions.
- `src/util/` - angle and coordinate transforms.
- `__tests__/` - the vitest suite (pinned reference times; pure computation, no external services).

## Build, test, lint

- Build: `npm run build` (tsdown -> ESM+CJS in `lib/`, with type declarations).
- Test: `npm test` (vitest; no broker/service needed). Coverage: `npm run test:coverage`.
- Lint: `npm run lint` (`eslint | snazzy`); `npm run lint:fix` to autofix.
- Docs: `npm run typedoc` — `typedoc.json` sets `treatWarningsAsErrors`, so a dangling or
  undocumented reference fails the build (and the PR, since `action-test` runs it).
- License headers: `task license` verifies the MIT header (CI); `task license:fix` injects it.

## Conventions and gotchas

- See `CLAUDE.md` for the branch/commit/PR rules; they are enforced by the git hooks in
  `.claude/hooks` (run `bash .claude/hooks/install.sh` once per clone).
- No Unicode glyphs in source — astronomical/astrological symbols are stored as words (the emoji scan
  blocks raw glyphs). Keep new doc comments to ASCII (`->`, `approx`) rather than `→`, `≈`.
- Times are UTC; rise/set and twilight computations also need an observer location.
