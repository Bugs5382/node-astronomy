export interface ITimeOfInterest {
  T?: number;
  /**
   * Create from JD vs. Date object. If JD is used, props.time will be ingored and overridden.
   * @since 0.1.0
   */
  jd?: number;
  /**
   * The Time/Date that we are using to base our calculation on.
   * @since 0.1.0
   */
  time?: Date;
}
