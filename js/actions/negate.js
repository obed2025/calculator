export default (expression) => {
  if (isNaN(+expression)) {
    throw new Error('It must be a number');
  }

  return +expression * -1;
};
