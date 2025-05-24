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
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds(),
        ),
      );
