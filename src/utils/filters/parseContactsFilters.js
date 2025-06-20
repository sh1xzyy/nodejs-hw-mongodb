const parseBoolean = (value) => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
};

const parseString = (type) => {
  if (typeof type !== 'string') return;

  return type;
};

export const parseContactsFilters = ({ isFavourite, type }) => {
  const parsedFavourite = parseBoolean(isFavourite);
  const parsedType = parseString(type);
  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};
