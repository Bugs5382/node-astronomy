# 🌅 SunTimes API Guide

The `SunTimes` utility lets you query solar events (e.g., 🌄 sunrise, 🌇 sunset, 🌌 dawn, 🌃 dusk) for a given latitude, longitude, and date.

Example usage:

```ts
const sunTimes = new SunTimes({
  latitude: 40.6676,
  longitude: -73.9851,
  time: new Date("1982-05-03T00:00:00-00:00"),
});

// Example: Get sunrise
const sunrise = sunTimes.sunrise();
console.log(sunrise);
````
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

* If no timezone is specified, **UTC** is used by default.

* `solarNoon()` is an exception: it returns a single time as a string (`HH:mm:ss`) or `undefined`.

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

* **`day()`** → Interval from sunrise to sunset.
* **`sunrise()`** → Moment when the sun’s upper edge breaks the horizon in the morning.
* **`sunset()`** → Moment when the sun’s upper edge disappears below the horizon in the evening.
* **`solarNoon()`** → The exact time the sun reaches its highest point in the sky.

### ✨ Golden Hours

* **`goldenHourAM()`** → Interval just after sunrise with soft, warm light (favored for photography 📸).
* **`goldenHourPM()`** → Interval just before sunset with similar golden light.

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
