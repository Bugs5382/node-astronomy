# 🪐 Planets API Guide

Three layers:

- **Per-planet snapshot classes** — `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto`. Observer-free; expose ecliptic / equatorial coordinate, distances, symbol.
- **`Earth`** — separate shape; exposes orbital info (eccentricity, obliquity, distance from Sun, heliocentric position) but no observer-aware methods (rise/set from Earth on Earth makes no sense).
- **`PlanetTimes`** — observer-aware. Position (alt/az), rise/set, arc/track, peak. Takes a `planet` field; works for every planet *except* Earth.

## 🌌 Snapshots

```ts
import { Mars, Jupiter, Pluto } from "node-astronomy";

const mars = new Mars({ time: new Date("2026-04-30T22:00:00Z") });

mars.eclipticCoordinate();      // { longitude, latitude }, degrees
mars.equatorialCoordinate();    // { ra, dec }, degrees
mars.heliocentricDistance();    // AU
mars.geocentricDistance();      // AU (approximate)
mars.heliocentricPosition();    // { longitude, latitude, radius }
mars.symbol();                  // "♂"
mars.displayName();             // "Mars"
```

The same shape works for every concrete planet class.

## 🌍 Earth — orbital info

```ts
import { Earth } from "node-astronomy";

const earth = new Earth({ time: new Date("2026-04-30T22:00:00Z") });

earth.eccentricity();          // ≈ 0.0167
earth.obliquityOfEcliptic();   // ≈ 23.44° at J2000, decreasing slowly
earth.distanceFromSun();       // AU, ~0.983 (perihelion) to ~1.017 (aphelion)
earth.heliocentricPosition();  // { longitude, latitude, radius }
```

Earth deliberately has **no** `EarthTimes` form. Looking at Earth from Earth doesn't have a meaningful rise/set — use `SunTimes` if you wanted "when does the sun rise here".

## 🧭 Observer-aware: `PlanetTimes`

```ts
import { PlanetTimes } from "node-astronomy";

const m = new PlanetTimes({
  planet: "mars",
  latitude: 40.7128,
  longitude: -74.006,
  timezone: "America/New_York",
  time: new Date("2026-04-30T22:00:00Z"),
});

m.position();                   // { altitude, azimuth }
m.altitudeAt(date);
m.apparentAltitudeAt(date);     // adds Bennett refraction
m.azimuthAt(date);

m.isAboveHorizon();
m.isCircumpolar();              // true for Polaris-style high-dec at high lat

m.nextRise();                   // { from, fromTz, ... } | undefined
m.nextSet();
```

### Arc / peak (per-planet path through the sky)

```ts
m.arc({ samples: 60 });
// [{ date, altitude, azimuth }, ...]

m.peak();
// { date, dateTz, altitude, azimuth } | undefined  — highest altitude in the visible window

m.dailyTrack({ samples: 144 });
// 24h evenly-spaced loop — useful for circumpolar planets
```

The default `arc()` window is `nextRise()` → following `nextSet()` with 60 evenly-spaced samples. Pass `from`/`to` for any custom interval.

## ♇ Pluto

Astrometry doesn't ship Pluto; we hand-roll the ephemeris in `src/astronomicalObject/planet/pluto/ephemeris.ts`. The propagator uses J2000 mean elements with simple Keplerian propagation — accurate to ≈ arc-minute level over 1900–2100. For sub-arcsecond precision, use a higher-order solution (Meeus *Astronomical Algorithms* Ch 37 periodic terms or JPL Horizons).

`Pluto` and `PlanetTimes({ planet: "pluto" })` work identically to the other planets.

## 📏 Conventions

- Distances: AU (astronomical units).
- Angles: degrees. Longitude / RA in `[0, 360)`. Latitude / Dec in `[-90, 90]`. Azimuth in `[0, 360)` clockwise from north.
- All `Date`s are UTC; `*Tz` strings render in the snapshot's `timezone`.

## ⚠️ Known limitations (v0.2.0)

- **Apparent magnitude** is not exposed. Astrometry doesn't ship the per-planet phase functions for it; rolling our own would be a follow-up plan.
- **Retrograde-motion detection** is not built in. Compute it yourself by sampling `eclipticCoordinate()` over a few days and checking the longitude derivative sign.
- **Pluto accuracy** is intentionally arc-minute-grade; see above.
