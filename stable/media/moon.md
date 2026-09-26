# 🌙 Moon API Guide

Two classes:

- **`Moon`** — observer-free snapshot. Phase, illumination, distance, age, equatorial coordinate, next-event lookups.
- **`MoonTimes`** — observer-aware. Position (alt/az), rise/set, arc/track across the visible window, peak, topocentric angular diameter, circumpolar check.

## 📅 Snapshot semantics

A `Moon` (and `MoonTimes`) instance captures `time` at construction. Reusing the same instance later in a long-running process keeps returning results for the construction instant. For "now" each time, build a new instance.

## 🌗 `Moon` — phase, illumination, distance

```ts
import { Moon, MoonPhase } from "node-astronomy";

const moon = new Moon({ time: new Date("2026-04-30T22:00:00Z") });

moon.phase();              // MoonPhase.WaxingGibbous, MoonPhase.Full, ...
moon.phaseAngle();         // degrees, 0 = new, 180 = full
moon.illumination();       // fraction in [0, 1]
moon.distance();           // km, ~356_500..406_700
moon.age();                // days since the last new moon
moon.equatorialCoordinate(); // { ra, dec } in degrees
moon.isFull();             // boolean
moon.isNew();              // boolean
moon.isBlue();             // boolean — second full moon in a calendar month
moon.nextNewMoon();        // Date — next new moon after `time`
moon.nextFullMoon();       // Date
```

Every method takes an optional `Date` so you can sweep one snapshot across multiple instants without rebuilding it.

## 🧭 `MoonTimes` — position, rise/set, arc

```ts
import { MoonTimes } from "node-astronomy";

const m = new MoonTimes({
  latitude: 40.7128,
  longitude: -74.006,
  timezone: "America/New_York",
  time: new Date("2026-04-30T22:00:00Z"),
  // optional:
  elevation: 0,            // metres above sea level (used only by angularDiameter)
});

m.position();              // { altitude, azimuth } in degrees
m.altitudeAt(date);        // geometric, no refraction
m.apparentAltitudeAt(date); // geometric + Bennett refraction (≥ 0)
m.azimuthAt(date);

m.isAboveHorizon();        // boolean
m.isCircumpolar();         // boolean — moon never sets at this lat/dec

m.nextRise();              // { from, fromTz, ... } or undefined
m.nextSet();
```

### 🌜 The moon's nightly arc

Unlike the sun's predictable arc, the moon's track is meaningfully different night to night — declination drifts ~5° per day across the lunar month. `arc()` returns the actual sampled path:

```ts
m.arc({ samples: 60 });
// [
//   { date: Date, altitude: number, azimuth: number },  // at rise
//   ...
//   { date: Date, altitude: number, azimuth: number },  // at set
// ]
```

By default `from` is the next rise and `to` is the following set; pass explicit `from`/`to` to sample any window.

For circumpolar moon (the moon never sets — happens at extreme latitudes when the moon's declination is high), `arc()` returns `[]`. Use `dailyTrack({ samples })` for a 24-hour sample loop in that case.

`peak()` returns the highest-altitude sample of the visible arc — analogous to `solarNoon()`:

```ts
m.peak();
// { date: Date, dateTz: string, altitude: number, azimuth: number } | undefined
```

### 📏 Angular diameter (the "altitude" effect)

The moon's apparent angular size differs slightly from the geocentric value when seen by an observer on Earth's surface — that's the topocentric correction. `angularDiameter()` returns both:

```ts
m.angularDiameter();
// { geocentric: number, topocentric: number } in degrees, both ≈ 0.5°
```

Pass `elevation` to the constructor (metres above sea level) to refine the topocentric value.

## 📏 Conventions

- Distances: kilometres (km).
- Angles: degrees. RA normalised to `[0, 360)`. Dec in `[-90, 90]`. Azimuth `[0, 360)` clockwise from north.
- Illumination: fraction `[0, 1]`.
- All `Date`s are UTC; the `*Tz` strings render in the snapshot's `timezone`.
