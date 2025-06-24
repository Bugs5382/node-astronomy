/**
 * Rounds a number to a specified number of decimal places.
 * @param value
 * @param precision
 */
export const round = (value: number, precision: number = 0): number => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};
