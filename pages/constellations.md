# 🌌 Constellations API Guide

Three layers:

- **`Constellation`** — observer-free snapshot. IAU name, abbreviation, meaning, GeoJSON boundary, pre-computed centroid.
- **`ConstellationVisibility`** — observer-aware. Centroid in alt/az, above-horizon check, direction-filtered visibility.
- **`visibleConstellations({ ... })`** — top-level helper. List every constellation currently above the horizon (and optionally inside a direction window).

Plus `findConstellationAt({ ra, dec })` — reverse lookup from RA/Dec to its enclosing constellation.

## 📋 Snapshot

```ts
import { Constellation } from "node-astronomy";

const orion = new Constellation({ constellation: "Orion" });
orion.constellationName;   // "Orion"
orion.abbreviation;        // "Ori"
orion.meaning;             // "The Hunter"
orion.centroid;            // { ra, dec } in degrees
orion.feature();           // GeoJSON FeatureCollection of the IAU boundary
```

The centroid is the unit-vector centroid of every coordinate in the constellation's GeoJSON, computed once at module load. Using unit vectors handles RA wrap-around (some constellations straddle RA = 0°).

## 🧭 Observer-aware: `ConstellationVisibility`

```ts
import { ConstellationVisibility } from "node-astronomy";

const v = new ConstellationVisibility({
  constellation: "Orion",
  latitude: 40.7128,
  longitude: -74.006,
  time: new Date("2026-01-15T03:00:00Z"),
  direction: "west-east",   // optional direction filter — see below
});

v.isAboveHorizon();   // boolean — centroid altitude > 0
v.isVisible();        // above horizon AND inside direction window
v.centerAltAz();      // { altitude, azimuth }
```

## 🌍 Top-level helper

```ts
import { visibleConstellations } from "node-astronomy";

const list = visibleConstellations({
  latitude: 40.7128,
  longitude: -74.006,
  time: new Date("2026-01-15T03:00:00Z"),
  direction: "west-east",   // optional
});

list.map((c) => c.constellationName);
// e.g. ["Orion", "Leo", "Hydra", ...]
```

## 🧭 Direction filter

The `direction` field accepts three forms:

### 1. Single compass point

```ts
direction: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
```

Each maps to a ±45° window centred on its azimuth. Lower-case (`'n'`) and long form (`'north'`) also work.

### 2. Hyphenated pair — antipodal cardinals

These four cases are explicit and unambiguous:

| Direction | Window | Half-dome |
|---|---|---|
| `'west-east'` | 270° → 180° → 90° | **Southern** (a south-facing observer reads W on the left, E on the right) |
| `'east-west'` | 90° → 0° → 270° | **Northern** |
| `'north-south'` | 0° → 90° → 180° | **Eastern** |
| `'south-north'` | 180° → 270° → 0° | **Western** |

### 3. Hyphenated pair — other compass combinations

Any other kebab pair (e.g. `'NE-SW'`, `'south-east-east'`) is parsed as **the shorter compass arc** between the two endpoints.

### 4. Explicit window

Pass an object directly when none of the above shorthands fit:

```ts
direction: { azimuthMin: 350, azimuthMax: 10 }   // wraps through 0°
direction: { azimuthMin: 90, azimuthMax: 180 }   // east-to-south
```

If `azimuthMax < azimuthMin`, the window wraps through 0°.

## 📏 Conventions

- Angles: degrees. RA in `[0, 360)`. Dec in `[-90, 90]`. Azimuth in `[0, 360)` clockwise from north.
- The reverse-lookup `findConstellationAt` uses astrometry's Nancy Roman lookup table.
- "Visible" = centroid above horizon. Partial-visibility (constellation half above horizon) is not exposed yet.

## ⚠️ Notes

- Constellation boundaries are static IAU data — they don't change with time. The centroid map is computed once.
- `direction` is the only feature most consumers will need; the explicit `AzimuthWindow` form is the escape hatch when you need fine control.
