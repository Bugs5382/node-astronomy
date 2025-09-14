import { TimeOfInterest } from "@/time";
import { ITimeOfInterest } from "@/time/properties";

export interface IAstronomicalObject extends ITimeOfInterest {
  name?: string;
}

export class AstronomicalObject
  extends TimeOfInterest
  implements IAstronomicalObject
{
  public readonly name: string;

  constructor(name: string, properties?: IAstronomicalObject) {
    super(properties);
    this.name = name;
  }
}

export default AstronomicalObject;
