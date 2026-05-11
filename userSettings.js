if (localStorage.getItem('userSettings') === null)
{ localStorage.setItem('userSettings', JSON.stringify({'theme' : 'bc-light'})); }

const savedSettings = JSON.parse(localStorage.getItem('userSettings'));
const systemDark = window.matchMedia('(prefers-color-scheme: bc-dark)').matches;
const initialTheme = savedSettings.theme || (systemDark ? 'bc-dark' : 'bc-light');

document.documentElement.setAttribute('data-bs-theme', initialTheme);

function darkMode()
{
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'bc-dark' ? 'bc-light' : 'bc-dark';
    const currentIcon = document.getElementById('modeIcon');

    html.setAttribute('data-bs-theme', newTheme);

    localStorage.setItem('userSettings', JSON.stringify({'theme' : newTheme}));

    if (currentTheme === 'bc-dark')
    { currentIcon.className = 'fa fa-sun-o'; }
    else
    { currentIcon.className = 'fa fa-moon-o'; }
}