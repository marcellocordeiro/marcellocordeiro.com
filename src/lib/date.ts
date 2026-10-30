const utcDateFormatterShort = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  dateStyle: "short",
});

const localDateFormatterShort = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
});

const utcDateFormatterMedium = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  dateStyle: "medium",
});

const localDateFormatterMedium = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const utcDateFormatterLong = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  dateStyle: "long",
});

const localDateFormatterLong = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

const utcDateFormatterFull = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  dateStyle: "full",
});

const localDateFormatterFull = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
});

const utcDateTimeFormatterFull = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  dateStyle: "full",
  timeStyle: "long",
});

const localDateTimeFormatterFull = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "long",
});

export function formatShortUtcDate(date: Date): string {
  return utcDateFormatterShort.format(date);
}

export function formatShortLocalDate(date: Date): string {
  return localDateFormatterShort.format(date);
}

export function formatMediumUtcDate(date: Date): string {
  return utcDateFormatterMedium.format(date);
}

export function formatMediumLocalDate(date: Date): string {
  return localDateFormatterMedium.format(date);
}

export function formatLongUtcDate(date: Date): string {
  return utcDateFormatterLong.format(date);
}

export function formatLongLocalDate(date: Date): string {
  return localDateFormatterLong.format(date);
}

export function formatFullUtcDate(date: Date): string {
  return utcDateFormatterFull.format(date);
}

export function formatFullLocalDate(date: Date): string {
  return localDateFormatterFull.format(date);
}

export function formatFullUtcDateTime(date: Date): string {
  return utcDateTimeFormatterFull.format(date);
}

export function formatFullLocalDateTime(date: Date): string {
  return localDateTimeFormatterFull.format(date);
}
