const formatRule = (key, selector, values) => {
  if (key.indexOf('@') > -1) {
    return `${key}{${selector}{${values}}}`;
  }

  return `${selector}${key}{${values}}`;
};

export { formatRule };
