/**
 * Returns the integer and fractional part of a number.
 * @param x
 */
export const modf = (x: number): [number, number] => {
  const intPart = Math.trunc(x);
  const fracPart = x - intPart;
  return [intPart, fracPart];
};
