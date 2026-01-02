type FormatDateOptions = Intl.DateTimeFormatOptions;

export const formatDate = (
  date: string | Date | null | undefined,
  locale: string = "en-US",
  options: FormatDateOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }
): string => {
  if (!date) return "";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat(locale, options).format(parsedDate);
};
