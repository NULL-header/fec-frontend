export const createGetSuffix = (suffix: string) => (isAdded: boolean) =>
  isAdded ? suffix : "";
