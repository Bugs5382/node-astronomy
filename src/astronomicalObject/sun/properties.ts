import { ISunProperties } from "@/astronomicalObject/sun/types";

export interface ISunTimesProperties extends ISunProperties {
  /** Latitude on the Earth */
  latitude: number;
  /** Longitude on the Earth */
  longitude: number;
  /** Timezone on the Earth */
  timezone?: string;
}
