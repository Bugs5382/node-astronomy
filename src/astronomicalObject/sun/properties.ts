import { ISunProperties } from "@/astronomicalObject/sun/types";

export interface ISunTimesProperties extends ISunProperties {
  latitude: number;
  longitude: number;
  timezone?: string;
}
