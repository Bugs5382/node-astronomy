# 🌅 SunTimes API Guide

The `SunTimes` utility lets you query solar events (e.g., 🌄 sunrise, 🌇 sunset, 🌌 dawn, 🌃 dusk) for a given latitude, longitude, and date.

Example usage:

```ts
const sunTimes = new SunTimes({
  latitude: 40.6676,
  longitude: -73.9851,
  time: new Date("1982-05-03T00:00:00-00:00"),
  timezone: "America/New_York",
});

// Example: Get sunrise
const sunrise = sunTimes.sunrise();
console.log(sunrise);
```

## 📅 Single-day snapshot

A `SunTimes` instance covers **exactly one civil day** in the supplied timezone — from local midnight to the next local midnight. On a DST-transition day the window is 23 or 25 hours long. The instance exposes the boundaries directly:

```ts
sunTimes.start;   // Date — UTC instant of local midnight
sunTimes.end;     // Date — UTC instant of next local midnight (half-open)
sunTimes.coversDate(d); // true if d falls in [start, end)
```

If you need a different day, construct a new `SunTimes` for that date.

## 📝 General Notes

* All functions return either:

  ```ts
    {
        from: Date;        // ⏰ Start of the period (Date object, always in UTC internally)
        fromTz: string;    // 📍 Start of the period, formatted as a string in the requested timezone
        seconds: number;   // ⏳ Duration of the event or interval in seconds
        to: Date;          // ⏰ End of the period (Date object, always in UTC internally)
        toTz: string;      // 📍 End of the period, formatted as a string in the requested timezone
    }
  ```

  or `undefined` if the event does not occur on the given date at that location.

* If no timezone is specified, **UTC** is used by default. The `timezone` parameter determines both the day window of the snapshot and how `fromTz`/`toTz`/`dateTz` strings are formatted.

* `solarNoon()` returns `{ date: Date, dateTz: string }` and is defined astronomically even in polar regions — it returns the sun's meridian-crossing time regardless of whether the sun is above or below the horizon. It only returns `undefined` if the underlying ephemeris fails (rare; numerical edge case in extreme polar conditions).

## ❄️ Polar regions

The `polarRegion` field on a `SunTimes` instance flags the two cases where the sun does not cross the horizon during the snapshot's civil day:

* **`"midnight-sun"`** — the sun stays above the horizon for the whole day. There is no `sunrise()`/`sunset()`/`day()`-versus-twilight transition; every band is `Day` or `GoldenHour`.
* **`"polar-night"`** — the sun stays below the horizon. There is no `day()` block; the day is partitioned across the night/twilight bands only.
* **`undefined`** — normal day with at least one true sunrise/sunset transition.

The `from_midnight_morning` and `to_midnight_evening` blocks (returned via `midnightToAstronomicalDawn()` and `astronomicalDuskToMidnight()`) are still defined in polar regions — they just describe whichever band the local-midnight straddles rather than always being `Night`.

## ⚙️ Construction options

```ts
new SunTimes({
  latitude: number,
  longitude: number,
  time?: Date,            // default: now
  timezone?: string,      // default: "UTC"
  stepSeconds?: number,   // default: 1
});
```

* **`stepSeconds`** controls the resolution of the internal twilight-band scan. The default of `1` second is the precision floor — band edges are accurate to ±`stepSeconds`. Raise to `60` for a faster constructor when minute-level precision is enough; lowering past `1` does not help.

## 🌍 Available Queries

### 🌌 Astronomical Events

* **`astronomicalDawn()`** → When the sun is 18° below the horizon in the morning (earliest detectable light).
* **`astronomicalDusk()`** → When the sun is 18° below the horizon in the evening (true darkness).
* **`astronomicalDuskToMidnight()`** → Interval from astronomical dusk until midnight.
* **`midnightToAstronomicalDawn()`** → Interval from midnight until astronomical dawn.

### ⚓ Nautical Events

* **`nauticalDawn()`** → When the sun is 12° below the horizon (sailors can navigate by the horizon line).
* **`nauticalDusk()`** → Evening equivalent (sun 12° below horizon after sunset).

### 🌆 Civil Events

* **`civilDawn()`** → When the sun is 6° below the horizon (enough light for most outdoor activities).
* **`civilDusk()`** → Evening equivalent (sun 6° below horizon after sunset).

### 🌞 Daylight

* **`day()`** → Interval from the end of morning golden hour to the start of evening golden hour (sun's altitude > 6°).
* **`sunrise()`** → The visible sun-disk transition in the morning. `from` is when the upper limb apparently reaches the horizon (NOAA sunrise, true altitude **-0.833°**); `to` is when the lower limb apparently reaches the horizon (true altitude **-0.27°**, the sun's angular radius). Typically ~3–4 minutes long.
* **`sunset()`** → The visible sun-disk transition in the evening. Mirrors `sunrise()` in reverse.
* **`solarNoon()`** → The exact time the sun reaches its highest point in the sky.

### ✨ Golden Hours

* **`goldenHourAM()`** → Interval just after sunrise with soft, warm light (favored for photography 📸).
* **`goldenHourPM()`** → Interval just before sunset with similar golden light.

### 🧭 Sun position (any instant)

* **`altitudeAt(date)`** → Sun's *geometric* altitude (degrees above horizon). Negative when the sun is below the horizon. No atmospheric refraction.
* **`apparentAltitudeAt(date)`** → Sun's *apparent* altitude — geometric altitude plus Bennett-model refraction. At the horizon `apparent ≈ geometric + 0.5°`. Use this for "what does an observer actually see?". Note: the band thresholds (`-0.833°`, `-0.27°`) are calibrated to apparent altitude crossing zero, so `altitudeAt(sunrise)` is around `-0.833°` while `apparentAltitudeAt(sunrise)` is around `0°`.
* **`azimuthAt(date)`** → Sun azimuth (degrees clockwise from north) at the given instant.
* **`positionAt(date)`** → `{ altitude, azimuth }` in one call (altitude is geometric).

### 📏 Twilight thresholds

| Band | Sun altitude (true, geometric) | Notes |
|---|---|---|
| Night | < -18° | |
| Astronomical | -18° to -12° | |
| Nautical | -12° to -6° | |
| Civil | -6° to -0.833° | Ends at NOAA sunrise/sunset. |
| Sun | -0.833° to -0.27° | Visible disk transition (refraction-aware). |
| GoldenHour | -0.27° to 6° | |
| Day | > 6° | |

## 🧾 Example Output

> ⚠️ Note:  The examples below might not indicate true data.

```ts
sunTimes.sunrise();
/*
{
  from: 1982-05-03T09:51:00.000Z,
  fromTz: "1982-05-03T09:51:00+00:00",
  seconds: 0,
  to: 1982-05-03T09:51:00.000Z,
  toTz: "1982-05-03T09:51:00+00:00"
}
*/
```

```ts
sunTimes.day();
/*
{
  from: 1982-05-03T09:51:00.000Z,
  fromTz: "1982-05-03T09:51:00+00:00",
  seconds: 48600,
  to: 1982-05-03T23:21:00.000Z,
  toTz: "1982-05-03T23:21:00+00:00"
}
*/
```

## 🕰️ Timezone Support

> ⚠️ Note:  The examples below might not indicate true data.

You can specify a timezone to get results in local time instead of UTC.

```ts
const sunTimesNY = new SunTimes({
    latitude: 40.6676,
    longitude: -73.9851,
    time: new Date("1982-05-03T00:00:00-00:00"),
    timezone: "America/New_York",
});

console.log(sunTimesNY.sunrise());
/*
{
  from: 1982-05-03T09:51:00.000Z,
  fromTz: "1982-05-03T05:51:00-04:00",
  seconds: 0,           
  to: 1982-05-03T09:51:00.000Z,
  toTz: "1982-05-03T05:51:00-04:00"
}
*/
```

* If `timezone` is not provided, **UTC** will always be used.
* Timezone names must follow the [🌐 IANA Time Zone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `America/New_York`, `Europe/London`, `Asia/Tokyo`).
