const navigation = `
<nav class="navbar navbar-expand-md fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="../index.html">BC</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Personal Projects</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../content/keyboard/keyb.html">Custom Keyboard Info</a></li>
                        <li><a class="dropdown-item" href="../content/voca/voca.html">Vocaloid Stuff</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">CSC 225 Labs</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../README.md">Lab 1 - readme</a></li>
                        <li><a class="dropdown-item" href="StarterPage.html">Lab 2 - Starter Page</a></li>
                        <li><a class="dropdown-item" href="lab3.html">Lab 3 - Bootstrap</a></li>
                        <li><a class="dropdown-item" href="lab4.html">Lab 4 - JavaScript</a></li>
                        <li><a class="dropdown-item" href="lab5.html">Lab 5 - JavaScript contd.</a></li>
                        <li><a class="dropdown-item" href="lab6.html">Lab 6 - Rest API</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="/final/final.html">Final Project</a></li>
                    </ul>
                </li>
                <!--
                <div class="me-4"></div>
                <li class="nav-item align-items-center d-flex">
                    <i class="fa fa-sun-o"></i>
                    <div class="ms-2 form-check form-switch ml-auto">
                        <input class="form-check-input" type="checkbox" role="switch" id="themingSwitcher" />
                    </div>
                    <i class="fa fa-moon-o"></i>
                </li>
                -->
            </ul>
        </div>
    </div>
</nav>
<div style="margin:4rem"></div>
`;
document.getElementById("nav").insertAdjacentHTML('afterbegin', navigation);