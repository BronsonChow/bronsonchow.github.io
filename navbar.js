// Dark mode icon swapper
let iconTheme = 'fa fa-moon-o';

if (savedSettings.theme === 'bc-dark')
{ iconTheme = 'fa fa-moon-o'; }
else
{ iconTheme = 'fa fa-sun-o'; }

// Directory path
const rootPath = '../';
const path = window.location.pathname;
const segments = path.split('/').filter(segment => segment.length > 0);
let depth = segments.length;
if (depth > 6) { depth -= 7; } // personal machine
const dupeDirCopy = rootPath.repeat(depth);

const navigation = `
<nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="${dupeDirCopy}index.html">
            <img src="${dupeDirCopy}assets/bc_logo.svg" alt="Home Page" width="39" height="39">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Personal Projects</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${dupeDirCopy}content/keyboard/keyb.html">Custom Keyboard Info</a></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}content/voca/voca.html">Vocaloid Stuff</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">CSC 225 Labs</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${dupeDirCopy}README.md">Lab 1 - readme</a></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}labs/StarterPage.html">Lab 2 - Starter Page</a></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}labs/lab3.html">Lab 3 - Bootstrap</a></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}labs/lab4.html">Lab 4 - JavaScript</a></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}labs/lab5.html">Lab 5 - JavaScript contd.</a></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}labs/lab6.html">Lab 6 - Rest API</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="${dupeDirCopy}labs/final/final.html">Final Project</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" target="_blank" href="https://docs.google.com/spreadsheets/d/15gTjHYgSWRcKoOGMVjodmE6AoESzgY2RV_Dej49yHBo/edit?usp=sharing">Future Plans List</a>
                </li>
                <div class="me-2"></div>
                <li class="nav-item align-items-center d-flex">
                    <a class="btn btn-voca active" onclick="darkMode()">
                        <i class="${iconTheme}" id="modeIcon"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div style="margin:3rem"></div>
`;
document.getElementById("nav").insertAdjacentHTML('afterbegin', navigation);