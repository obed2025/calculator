export default (expression) => {
  if (!isValidExpression(expression)) {
    throw new Error('Invalid Expression');
  }

  const result = (() => {
    if (expression === '') {
      return '0';
    }

    return new Function('return ' + expression)();
  })();

  const currentHistory = JSON.parse(localStorage.getItem('history') ?? '[]');
  currentHistory.push({ expression, result });

  localStorage.setItem('history', JSON.stringify(currentHistory));

  return result;
};

function isValidExpression(expression) {
  const pattern =
    /^(\s*-?(\d+(\.\d+)?|(\d+(\.\d+)?e-?\d+))(\s*[-+*/]{1,2}\s*-?(\d+(\.\d+)?|(\d+(\.\d+)?e-?\d+)))*\s*)*$|^$/;
  return pattern.test(expression);
}
