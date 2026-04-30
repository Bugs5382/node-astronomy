export enum TwilightExtended {
  /**
   * GoldenHour - The time shortly after sunrise or shortly before sunset, when the sun
   * is just above the horizon (0 to ~6 degrees).
   */
  GoldenHour = "GoldenHour",
  /**
   * Sun - The visible sun-disk transition: from "upper limb at horizon"
   * (NOAA sunrise/sunset, true altitude -0.833°) to "lower limb at horizon"
   * (true altitude -0.27°, sun's angular radius).
   */
  Sun = "Sun",
}
