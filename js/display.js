import calculate from './actions/calculate.js';
import negate from './actions/negate.js';
import _delete from './actions/delete.js';
import clear from './actions/clear.js';
import { State } from './utils/state.js';

const buttons = document.querySelectorAll('.btn[data-value]');
const actionButtons = document.querySelectorAll('.btn[data-action]');
const screen = document.querySelector('.screen');

const actions = { calculate, negate, delete: _delete, clear };

const screenValue = new State();
screenValue.subscribe(() => (screen.value = screenValue.value));
screenValue.value = '0';

buttons.forEach((btn) => {
  const btnValue = btn.dataset.value;

  btn.addEventListener('click', (e) => {
    if (screen.getAttribute('error')) {
      removeError();
    }

    if (screenValue.value === '0') {
      screenValue.value = '';
    }

    screenValue.value = screenValue.value + btnValue;
    screen.scrollLeft = screen.scrollWidth;
  });
});

actionButtons.forEach((btn) => {
  const { action } = btn.dataset;

  btn.addEventListener('click', () => {
    if (screen.getAttribute('error')) {
      removeError();
    }

    try {
      screenValue.value = actions[action](screenValue.value);
    } catch (err) {
      screen.value = err.message;
      screen.setAttribute('error', 'true');
    }
  });
});

function removeError() {
  screen.removeAttribute('error');
  screen.value = screenValue.value;
}
