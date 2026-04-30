# Issue #17 — deferred follow-ups

These items were called out in [issue #17](https://github.com/Bugs5382/node-astronomy/issues/17) but were intentionally not addressed in the bug-fix pass. They are queued for the upcoming structural refactor.

## 1. Step granularity is fixed at 1 second

**Where:** `src/astronomicalObject/sun/times.ts` constructor passes `{ stepSeconds: 1 }` to `getBands`. The class also has a dead-code default `defaultParameters = { stepSeconds: 10 }` that is never used.

**Current state:** Output is already ±1 second precise. The issue's "10-second granularity" concern is stale — but the dead-code default is misleading.

**Action during refactor:**
- Remove `defaultParameters` (dead code).
- Either expose `stepSeconds` as a constructor option (faster builds at coarser precision) or document that 1s is fixed.

## 2. `solarNoon()` returns `undefined` in polar regions — not documented

**Where:** `src/astronomicalObject/sun/times.ts` `solarNoon()`. The astrometry library's `getGeneralizedSolarTransit` can return `null` for polar nights / midnight sun.

**Action during refactor:**
- Document the polar-region behavior in `pages/suntimes.md`.
- Consider an explicit `polarRegion` flag on the snapshot rather than scattered `undefined` returns from various methods.

## 3. Sun parent class `sunTime` field is unused

**Where:** `src/astronomicalObject/sun/index.ts` lines 19-25. The `sunTime` private field is set but never read.

**Action during refactor:** delete it.

## 4. `getTimes` first/last "Night" detection is positional

**Where:** `src/astronomicalObject/sun/times.ts` `getTimes()`. It detects the bookend `night` bands using `index === 0` and `index === converted.length - 1`. At high latitudes near the solstices this can produce surprising names if the day starts/ends in a non-Night band.

**Action during refactor:** classify by altitude trajectory rather than position in the array.

## 5. `convertEquatorialToHorizontal` returns geometric (no refraction) altitude

**Where:** the band thresholds in `getAltitude` apply NOAA-style refraction-aware values (-0.833°, -0.27°) but the altitude itself comes from `convertEquatorialToHorizontal` which is geometric. So the threshold names match NOAA sunrise/sunset *boundaries* but the band interior altitudes are pure geometric.

**Action during refactor:** consider applying refraction in the `altitudeAt` API (or expose both `altitudeAt` and `apparentAltitudeAt`), and clarify in docs that band boundaries are calibrated to refraction-corrected events but reported altitudes are geometric.
