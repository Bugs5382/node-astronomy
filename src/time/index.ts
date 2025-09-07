import { ITimeOfInterest } from "@/time/props";

/**
 * Time of Interest
 * @summary Generate the object in which subductions do most of the work.
 * @example
 * const toi = new TimeOfInterest()
 * @remarks This class creates the most important 'toi' (Time of Interest), which all other functions and calculations depend on.
 * @since 0.1.0
 */
export class TimeOfInterest implements ITimeOfInterest {
  public time!: Date;

  /**
   * Constructs a new TimeOfInterest instance.
   * @param props - Optional time input object.
   * @remarks
   * @since 0.1.0
   */
  constructor(props: ITimeOfInterest = {}) {
    this.time = props.time ?? new Date();
  }
}

export default TimeOfInterest;
