
const switcher = document.querySelector('#languageSwitch');
let language = 'en';

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;

  document.querySelectorAll('[data-en]').forEach((element) => {
    const value = element.getAttribute(`data-${language}`);
    if (value) element.innerHTML = value;
  });

  switcher.innerHTML =
    language === 'en'
      ? 'ES <span>/</span> EN'
      : 'EN <span>/</span> ES';
}

switcher.addEventListener('click', () =>
  setLanguage(language === 'en' ? 'es' : 'en')
);
