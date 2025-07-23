import { copyToClipboard } from '../js/utils/copy-to-clipboard.js';

const historyEl = document.getElementById('history');
const history = JSON.parse(localStorage.getItem('history') ?? '[]');

if (!history.length) {
  historyEl.innerHTML = '<p>Nothing found in history!<p>';
}

const clearBtn = document.createElement('button');
clearBtn.innerText = 'Clear History';
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('history');
  document.location = '/';
});

if (history.length) {
  document.querySelector('.clear').appendChild(clearBtn);
}

history.forEach(({ expression, result }) => {
  const card = document.createElement('div');
  const btn = document.createElement('button');
  const p = document.createElement('p');
  const h2 = document.createElement('h2');

  card.className = 'history-item';
  btn.innerText = 'Copy Expression';

  btn.addEventListener('click', async () => {
    await copyToClipboard(expression);
    btn.innerText = 'Copied';

    setTimeout(() => (btn.innerText = 'Copy Expression'), 2000);
  });

  p.innerText = expression;
  h2.innerText = result;

  card.append(btn, p, h2);
  historyEl.appendChild(card);
});
