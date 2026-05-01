# ✨ Stars API Guide

A curated catalog of named bright stars, plus snapshot and observer-aware classes:

- **`Star`** — observer-free snapshot. Name, Bayer designation, IAU name, HIP catalog number, J2000 RA/Dec, magnitude, spectral class, constellation.
- **`StarTimes`** — observer-aware. Position (alt/az), rise/set, arc/track, circumpolar check.
- **`getNamedStar(name)`** / **`listNamedStars()`** — top-level catalog helpers.

## 📚 The catalog

Lives at `src/astronomicalObject/celestial/stars/data/named-stars.json`. ~40 named bright stars: Polaris, Sirius, Canopus, Arcturus, Vega, Capella, Rigel, Procyon, Achernar, Betelgeuse, Hadar, Altair, Acrux, Aldebaran, Antares, Spica, Pollux, Fomalhaut, Deneb, Mimosa, Regulus, Adhara, Castor, Gacrux, Shaula, Bellatrix, Elnath, Alnilam, Alnitak, Dubhe, Mirfak, Wezen, Alkaid, Atria, Alhena, Mirzam, Alphard, Algol, Hamal, Diphda, Nunki, Saiph.

Each entry:

```json
{
  "name": "Polaris",
  "bayer": "α UMi",
  "iauName": "Polaris",
  "hip": 11767,
  "raDeg": 37.9546,
  "decDeg": 89.2641,
  "magnitude": 1.98,
  "spectralClass": "F7Ib",
  "constellation": "Ursa Minor"
}
```

Coordinates are J2000.0. Proper motion is intentionally not applied — at arcseconds/year for most named stars over a single century, it doesn't change "is it above the horizon" answers. Documented limitation.

## 🌟 `Star` — snapshot

```ts
import { Star } from "node-astronomy";

const polaris = new Star({ star: "Polaris" });

polaris.starName;              // "Polaris"
polaris.bayer();               // "α UMi"
polaris.constellation();       // "Ursa Minor"
polaris.equatorialCoordinate(); // { ra ≈ 38°, dec ≈ 89° }
polaris.magnitude();           // 1.98
polaris.spectralClass();       // "F7Ib"
polaris.hip();                 // 11767
```

## 🧭 `StarTimes` — observer-aware

```ts
import { StarTimes } from "node-astronomy";

const polaris = new StarTimes({
  star: "Polaris",
  latitude: 40.7128,
  longitude: -74.006,
  timezone: "America/New_York",
  time: new Date("2026-04-30T22:00:00Z"),
});

polaris.position();         // { altitude, azimuth }
polaris.altitudeAt(date);
polaris.apparentAltitudeAt(date);  // adds Bennett refraction
polaris.azimuthAt(date);

polaris.isAboveHorizon();
polaris.isCircumpolar();    // true at NYC, false at Sydney
```

## 🌌 Circumpolar handling — the Polaris case

Polaris is circumpolar at every northern-hemisphere observer with latitude > ~1°. For circumpolar stars, `nextRise()` and `nextSet()` return `undefined` (they never happen), and `arc()` returns `[]`. Use `dailyTrack({ samples })` instead for a 24-hour evenly-spaced loop:

```ts
polaris.nextRise();     // undefined (circumpolar at NYC)
polaris.nextSet();      // undefined
polaris.arc();          // []
polaris.dailyTrack({ samples: 144 });  // 144 points covering 24h
```

For non-circumpolar stars (Sirius, Vega, etc.), `arc()` works the usual way: default window is `nextRise()` → following `nextSet()`.

## 🔭 Catalog helpers

```ts
import { getNamedStar, listNamedStars } from "node-astronomy";

listNamedStars();              // ["Polaris", "Sirius", "Canopus", ...]
getNamedStar("Sirius");        // full IStarCatalogEntry
```

## 📏 Conventions

- All coordinates in degrees. RA in `[0, 360)`. Dec in `[-90, 90]`. Azimuth in `[0, 360)` clockwise from north.
- Coordinates are J2000.0; no proper-motion correction.
- All `Date`s are UTC; `*Tz` strings render in the snapshot's `timezone`.

## ⚠️ Limitations

- The catalog is curated, not exhaustive — it covers ~40 of the brightest naked-eye stars. Adding entries is non-breaking; the JSON file is the source of truth.
- No proper-motion correction. For modern (post-2024) usage the J2000 coordinates are within arc-seconds of true position for every named star here.
- Aberration / nutation could be applied for sub-arcsecond accuracy; not currently exposed.
