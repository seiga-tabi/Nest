const buttons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-ja][data-ko]');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  buttons.forEach((button) => button.classList.toggle('active', button.dataset.lang === lang));
  translatable.forEach((node) => {
    node.textContent = node.dataset[lang];
  });
  localStorage.setItem('seiga-lang', lang);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

document.getElementById('year').textContent = new Date().getFullYear();
setLanguage(localStorage.getItem('seiga-lang') || 'ja');
