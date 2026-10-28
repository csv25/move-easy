const switcher = document.querySelector('#languageSwitch');
let language = 'en';
function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en]').forEach((element) => {
    const value = element.getAttribute(`data-${language}`);
    if (value) element.innerHTML = value;
  });
  switcher.innerHTML = language === 'en' ? 'ES <span>/</span> EN' : 'EN <span>/</span> ES';
}
switcher.addEventListener('click', () => setLanguage(language === 'en' ? 'es' : 'en'));

document.querySelector('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('#formStatus');
  status.classList.remove('error');
  status.textContent = language === 'en' ? 'Thanks — we will be in touch soon.' : 'Gracias — nos pondremos en contacto pronto.';
  event.target.reset();
});
