export const findAllByKey = (obj, keyToFind) => {
  return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === `object` && value)
          ? acc.concat(findAllByKey(value, keyToFind))
          : acc
      , []) || [];
};
