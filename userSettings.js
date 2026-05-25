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
function testLog()
{
    console.log({ ...localStorage });
    getLocalStorageUsage(); 
}
function getLocalStorageUsage()
{
    var totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        let value = localStorage.getItem(key);
        totalBytes += (key.length + value.length) * 2;
    }
    const maxBytes = 5 * 1024 * 1024;
    const remainingBytes = maxBytes - totalBytes;
    const percentageUsed = (totalBytes / maxBytes) * 100;
    const formattedPercentage = (Math.round(percentageUsed * 100000) / 100000).toFixed(5);
    console.log('localStorage Objects: ' + localStorage.length);
    console.log(`LocalStorage Bytes Allocated: ${totalBytes}`);
    console.log(`LocalStorage Bytes Remaining: ${remainingBytes}`);
    console.log(`LocalStorage Percentage Used: ${formattedPercentage} %`);
}