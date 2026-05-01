---
name: ✨ Feature request
about: A new astronomical query, body, or convenience API you'd like
title: "[FEATURE] "
labels: enhancement
assignees: ''
---

## Problem / use case

What are you trying to do that the current API doesn't support? E.g.
"I want to know when Mars is above the horizon at my location next
Saturday night."

## Proposed API

A rough sketch of how you'd want to call it:

```ts
const mars = new PlanetTimes({
  planet: "mars",
  latitude: 40.7,
  longitude: -74.0,
  time: new Date(),
  timezone: "America/New_York",
});

mars.nextRise();    // { from, to, seconds, ... }
mars.arc({ samples: 60 }); // [{ date, altitude, azimuth }, ...]
```

## Alternatives considered

What are you doing today instead? (Manual computations from another
package, hard-coded values, …)

## Reference / source

If you've seen this calculation elsewhere, link to the formula or the
implementation. Bonus points for a citation (Meeus chapter, JPL Horizons,
NOAA, etc.) so the implementation can be validated against a known
source.

## Additional context

Edge cases that should be supported (polar regions, southern hemisphere,
high precision, fast bulk lookups, etc.).
