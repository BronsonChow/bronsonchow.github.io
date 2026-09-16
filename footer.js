var footerMiddleCol;

function loadFooter(pageName)
{
    switch (pageName)
    {
        case "voca":
            footerMiddleCol = `
            <ul class="credit">
                <p class="credit">Powered by </p>
                    <a class="credit" href="https://vocadb.net/">VocaDB</a>
                    <p class="credit"> : </p>
                    <a class="credit" href="https://wiki.vocadb.net/docs/">Public API Documentation</a>
                <br><p class="credit">Hero background image by Rella : </p>
                    <a class="credit" href="https://www.pixiv.net/en/users/163536">Pixiv</a>
                    <p class="credit"> : </p>
                    <a class="credit" href="https://www.pixiv.net/en/artworks/70858371">Direct Image Link</a>
                <br><p class="credit">Page background image by PinocchioP : </p>
                    <a class="credit" href="https://www.pixiv.net/en/users/1746464">Pixiv</a>
                    <p class="credit"> : </p>
                    <a class="credit" href="https://www.pixiv.net/en/artworks/68054943">Direct Image Link</a>
            </ul>
            `;
            break;
        case "csc436lab1":
            footerMiddleCol = `
            <ul class="credit">
                <p class="credit">Powered by </p>
                    <a class="credit" href="https://scryfall.com/">Scryfall</a>
                    <p class="credit"> : </p>
                    <a class="credit" href="https://scryfall.com/docs/api">Public API Documentation</a>
            </ul>
            `;
            break;
        default:
            footerMiddleCol = `
            <ul class="credit">
                <p class="credit">This website is hosted directly from a respository on GitHub.</p>
            </ul>
            `;
    }
    const footerHTML = `
    <hr class="my-4">
    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-5 py-3 my-5 footer">
            <div class="col-lg-1"></div>
            <div class="col-lg-2">
                <h1 class="credit">General</h1>
                <ul class="credit">
                    <p class="credit">Bronson Chow's Website</p><br>
                    <a href="https://github.com/BronsonChow/"><i class="fa fa-github credit" aria-hidden="true"></i></a>
                </ul>
            </div>
            <div class="col-lg-6">
                <h1 class="credit">Credit</h1>
                ${footerMiddleCol}
            </div>
            <div class="col-lg-2">
                <h1 class="credit">Contact</h1>
                <ul class="credit">
                    <p class="credit">Discord: chow39</p>
                    <a class="credit" href="mailto:bronch42@gmail.com">bronch42@gmail.com</a>
                </ul>
            </div>
            <div class="col-lg-1"></div>
        </div>
    </div>
    `;
    document.getElementById("footer").insertAdjacentHTML("afterbegin", footerHTML);
}