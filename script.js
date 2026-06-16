const buttons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-ja][data-ko]');
const ariaTranslatable = document.querySelectorAll('[data-aria-ja][data-aria-ko]');
const altTranslatable = document.querySelectorAll('[data-alt-ja][data-alt-ko]');
const supportedLanguages = ['ja', 'ko'];
const languageStorageKey = 'seiga-lang-v2';
const pageTitle = {
  ko: 'Seiga / 서아 링크 모음',
  ja: 'Seiga / 西雅 リンク集',
};

function normalizeLanguage(lang) {
  return supportedLanguages.includes(lang) ? lang : 'ja';
}

function setLanguage(lang) {
  const nextLang = normalizeLanguage(lang);

  document.documentElement.lang = nextLang;
  document.title = pageTitle[nextLang];

  buttons.forEach((button) => {
    const isActive = button.dataset.lang === nextLang;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  translatable.forEach((node) => {
    node.textContent = node.dataset[nextLang];
  });

  ariaTranslatable.forEach((node) => {
    node.setAttribute('aria-label', node.getAttribute(`data-aria-${nextLang}`));
  });

  altTranslatable.forEach((node) => {
    node.setAttribute('alt', node.getAttribute(`data-alt-${nextLang}`));
  });

  localStorage.setItem(languageStorageKey, nextLang);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

document.getElementById('year').textContent = new Date().getFullYear();
setLanguage(localStorage.getItem(languageStorageKey));
