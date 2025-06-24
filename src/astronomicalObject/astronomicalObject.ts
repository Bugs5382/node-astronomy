import { TimeOfInterest } from "@/time";

export interface IAstronomicalObject {
  toi?: TimeOfInterest;
}

export class AstronomicalObject implements IAstronomicalObject {
  public readonly name: string;
  public readonly toi: TimeOfInterest;

  constructor(name: string, props?: IAstronomicalObject) {
    this.name = name;
    this.toi = props?.toi || new TimeOfInterest({ time: new Date() });
  }
}
