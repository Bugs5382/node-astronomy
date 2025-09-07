import { TimeOfInterest } from "@/time";
import { ITimeOfInterest } from "@/time/props";

export interface IAstronomicalObject extends ITimeOfInterest {
  name?: string;
}

export class AstronomicalObject
  extends TimeOfInterest
  implements IAstronomicalObject
{
  public readonly name: string;

  constructor(name: string, props?: IAstronomicalObject) {
    super(props);
    this.name = name;
  }
}

export default AstronomicalObject;
