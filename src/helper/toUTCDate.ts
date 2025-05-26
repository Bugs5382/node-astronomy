import { isUTCDate } from "@/helper/isUTCDate";

/**
 *
 * @param date
 */
export const toUTCDate = (date: Date) =>
  isUTCDate(date)
    ? date
    : new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds(),
          date.getUTCMilliseconds(),
        ),
      );
