import { LONG_MONTH_NAMES, SHORT_MONTH_NAMES } from "../constant";
import { MonthFormat } from "../types/global";

export const formatLocalDate = (
  dateString: string | Date,
  monthFormat: MonthFormat = "long"
): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const month =
    monthFormat === "long"
      ? LONG_MONTH_NAMES[monthIndex]
      : SHORT_MONTH_NAMES[monthIndex];
  return `${day} ${month} ${year}`;
};

export const formatLocalDateTime = (
  dateTimeString: string,
  monthFormat: MonthFormat = "long"
): string => {
  const dateTime = new Date(dateTimeString);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jakarta",
  };

  return `${formatLocalDate(
    dateTimeString,
    monthFormat
  )}, ${new Intl.DateTimeFormat("id-ID", options).format(dateTime)}`;
};
