export const constructQuery = (queryObj: {
  [key: string]: string | undefined;
}) => {
  const copy = { ...queryObj };
  Object.keys(queryObj).forEach((k) => {
    if (!queryObj[k]) {
      delete copy[k];
    }
  });
  return copy;
};
