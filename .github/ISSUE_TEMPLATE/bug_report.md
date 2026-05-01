---
name: 🐛 Bug report
about: Calculation looks wrong, an API misbehaves, or something throws
title: "[BUG] "
labels: bug
assignees: ''
---

## What happened?

A clear, concise description of the unexpected behavior.

## What did you expect?

What should the result have been? If a known reference (Stellarium, USNO,
JPL Horizons, NOAA solar calculator, etc.) gave a different value, link it.

## Reproduction

Minimal code that reproduces the issue:

```ts
import { Sun, SunTimes /* … */ } from "node-astronomy";

const sunTimes = new SunTimes({
  latitude: 0,
  longitude: 0,
  time: new Date("YYYY-MM-DDTHH:mm:ssZ"),
  timezone: "UTC",
});
console.log(sunTimes.sunrise());
```

## Inputs

- **Body / API**: e.g. `SunTimes.sunrise()`
- **Latitude / longitude**:
- **`time` (UTC ISO)**:
- **`timezone`**:
- **Other options**: (e.g. `stepSeconds`)

## Output

```
Paste the actual value or stack trace here.
```

## Environment

- node-astronomy version: (e.g. `0.2.0`)
- Node.js version: `node --version`
- OS:
- Module system: ESM / CJS

## Additional context

Anything else worth knowing — high latitude / polar regime, DST transition
day, system timezone differs from supplied timezone, etc.
