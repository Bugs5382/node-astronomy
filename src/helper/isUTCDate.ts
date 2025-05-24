/**
 *
 * @param date
 */
export const isUTCDate = (date: Date): boolean => {
  return (
    date.getUTCFullYear() === date.getFullYear() &&
    date.getUTCMonth() === date.getMonth() &&
    date.getUTCDate() === date.getDate() &&
    date.getUTCHours() === date.getHours() &&
    date.getUTCMinutes() === date.getMinutes() &&
    date.getUTCSeconds() === date.getSeconds() &&
    date.getUTCMilliseconds() === date.getMilliseconds()
  );
};
