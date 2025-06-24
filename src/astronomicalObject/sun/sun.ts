import { AstronomicalObject } from "@/astronomicalObject";
import { ISun, ISunProps } from "@/astronomicalObject/sun/types";

export class Sun extends AstronomicalObject implements ISun {
  constructor(props?: ISunProps) {
    super("sun", props);
  }
}
