import { format as timeFormat } from "date-fns-tz";

export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const formatLocal = (date: Date) =>
  timeFormat(date, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
