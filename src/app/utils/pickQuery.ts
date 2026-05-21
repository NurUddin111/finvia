export const pickQuery = <T extends Record<string, unknown>>(
  query: T,
  fields: (keyof T)[],
) => {
  const picked: Partial<T> = {};

  for (const field of fields) {
    const value = query[field];

    if (value !== undefined) {
      picked[field] = value;
    }
  }

  return picked;
};
