export const transformDate = (dateUTC: string) => {
  const date = new Date(dateUTC);

  const options = {
    year: "numeric",
    month: "short",
  } satisfies Intl.DateTimeFormatOptions;

  return { day: date.getDate(), monthYear: new Intl.DateTimeFormat("en", options).format(date) };
};

export const transformQuantity = (value: number) => {
  if (value < 1000) return value;

  const suffix = ["K", "M", "B"];
  let res = value;

  for (let i = 0; i < 3; i++) {
    res /= 1000;
    if (res >= 1000) continue;
    return `${Math.floor(res)}${suffix[i]}`;
  }
};

export const transformAuthors = (authors: string[], quantity = 2) => {
  if (authors.length === 0) return "N/A";
  let res = authors.slice(0, quantity).join(", ");
  if (authors.length > quantity) res += ", et al.";

  return res;
};
