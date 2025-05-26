/**
 * The Sun's center at the true geometric horizon (no atmospheric refraction).
 * Used for theoretical calculations.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_CENTER = -0;

/**
 * Sun's upper limb (top edge) at the geometric horizon (no refraction).
 * Represents the earliest visible edge at sunrise/set in vacuum conditions.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_UPPER_LIMB = -0.25;

/**
 * Standard altitude of the sun's center including atmospheric refraction (~34')
 * and solar radius (~16.2'). Commonly used for calculating sunrise/sunset.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_CENTER_REFRACTION = -0.583;

/**
 * Standard altitude of the sun’s upper limb including atmospheric refraction.
 * This is the most common value used in civil sunrise/sunset calculations.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_UPPER_LIMB_REFRACTION = -0.833;

/**
 * Altitude of the sun's center at the start/end of civil twilight.
 * Civil twilight occurs when the sun is 6° below the horizon.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_CIVIL_TWILIGHT = -6;

/**
 * Altitude of the sun's center at the start/end of nautical twilight.
 * Nautical twilight begins when the sun is 12° below the horizon.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_NAUTICAL_TWILIGHT = -12;

/**
 * Altitude of the sun's center at the start/end of astronomical twilight.
 * Astronomical twilight begins when the sun is 18° below the horizon.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_SUN_ASTRONOMICAL_TWILIGHT = -18;

/**
 * Apparent altitude of the moon’s center, including standard refraction
 * and average lunar radius (~15 arcminutes).
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_MOON_CENTER_REFRACTION = 0.125;

/**
 * Apparent altitude of planets (and stars), corrected for average atmospheric refraction.
 * Typically used when calculating rise/set times for celestial objects.
 * @since 0.1.0
 */
export const STANDARD_ALTITUDE_PLANET_REFRACTION = -0.5667;
