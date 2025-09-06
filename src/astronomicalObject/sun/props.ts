import { ISunProps } from "@/astronomicalObject/sun/types";

export interface ISunTimesProps extends ISunProps {
  latitude: number;
  longitude: number;
  timezone?: string;
}
