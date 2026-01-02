export const getPageFromUrl = (value: string | null): number => {
  const page = Number(value);

  return Number.isFinite(page) && page > 0 ? page : 1;
};
