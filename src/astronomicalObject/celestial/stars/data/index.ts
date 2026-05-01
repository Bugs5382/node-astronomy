import { IStarCatalogEntry } from "@/astronomicalObject/celestial/stars/types";

import rawData from "./named-stars.json" with { type: "json" };

/**
 * The curated named-stars catalog. Keys are common names (e.g.
 * `"Polaris"`, `"Sirius"`); values are full {@link IStarCatalogEntry}
 * records with J2000 RA/Dec, magnitude, spectral class, and IAU
 * constellation.
 *
 * @since 0.2.0
 */
export const NAMED_STARS = rawData as Record<string, IStarCatalogEntry>;

/**
 * Union of every supported star name. Use this as the parameter type
 * for {@link Star} and {@link StarTimes} constructors.
 *
 * @since 0.2.0
 */
export type NamedStar = keyof typeof rawData;
