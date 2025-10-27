const buttons = document.querySelectorAll('#tag-filter .tag');
const resources = document.querySelectorAll('.resource');
const andBtn = document.getElementById('and-mode');
const orBtn = document.getElementById('or-mode');
const clearBtn = document.getElementById('clear-tags');
let mode = 'and';

function applyFilter() {
  const activeTags = [...buttons]
    .filter(b => b.classList.contains('active'))
    .map(b => b.dataset.tag);

  resources.forEach(card => {
    const tags = card.dataset.tags.split(',');
    const match =
      !activeTags.length ||
      (mode === 'and'
        ? activeTags.every(t => tags.includes(t))
        : activeTags.some(t => tags.includes(t)));
    card.style.display = match ? '' : 'none';
  });
}

andBtn.addEventListener('click', () => {
  mode = 'and';
  andBtn.classList.add('active');
  orBtn.classList.remove('active');
  applyFilter();
});

orBtn.addEventListener('click', () => {
  mode = 'or';
  orBtn.classList.add('active');
  andBtn.classList.remove('active');
  applyFilter();
});

clearBtn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('active'));
  applyFilter();
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    applyFilter();
  });
});
