const songIndex = document.getElementById("favSongIndex");
const songCell = document.getElementById("favSongCells");
const producerIndex = document.getElementById("favProducerIndex");
const producerCell = document.getElementById("favProducerCells");

const favSongs = [
    {id: 131090, rank: 1.3}
,   {id: 640212, rank: 3.3}
,   {id: 642667, rank: 0.0}
,   {id: 823241, rank: 3.2}
,   {id: 805916, rank: 0.3}
,   {id: 820162, rank: 0.1}
,   {id: 198286, rank: 1.0}
,   {id: 274835, rank: 4.4}
,   {id: 251400, rank: 4.5}
,   {id: 813747, rank: 4.1}
,   {id: 416211, rank: 3.5}
,   {id: 129109, rank: 1.6}
,   {id: 7042, rank: 4.6}
,   {id: 178119, rank: 2.0}
,   {id: 160589, rank: 1.4}
,   {id: 291470, rank: 1.5}
,   {id: 166391, rank: 1.2}
,   {id: 362821, rank: 2.4}
,   {id: 850999, rank: 2.1}
,   {id: 588814, rank: 3.4}
,   {id: 732509, rank: 3.0}
,   {id: 131087, rank: 4.3}
,   {id: 812344, rank: 2.2}
,   {id: 829477, rank: 3.1}
,   {id: 796304, rank: 4.2}
,   {id: 796307, rank: 4.0}
,   {id: 718225, rank: 3.6}
,   {id: 829512, rank: 1.1}
,   {id: 25667, rank: 2.5}
,   {id: 1501, rank: 0.2}
,   {id: 164107, rank: 2.3}
];
const favProducers = [
    {id: 28, rank: 0.0, alias: "ピノキオP", voicebanks: "Hatsune Miku V4X (Original), Hatsune Miku V4X (Dark)", lang: "Japanese, English"}
,   {id: 144288, rank: 1.1, alias: "TAK / DORIDORI", voicebanks: "Hatsune Miku V4X (Original), Kasane Teto SV", lang: "Japanese, Korean, English"}
,   {id: 99484, rank: 2.2, alias: "André Luiz", voicebanks: "Hatsune Miku V4 (English)", lang: "English"}
,   {id: 53, rank: 1.0, alias: "GenjitsutouhiP", voicebanks: "Hatsune Miku, GUMI, Megurine Luka", lang: "Japanese"}
,   {id: 23155, rank: 0.1, alias: "JamieP", voicebanks: "Kasane Teto SV, V3 GUMI", lang: "English"}
,   {id: 144555, rank: 2.1, alias: "東京真中, Tokyo Manaka", voicebanks: "Kasane Teto SV, Chis-A, Hatsune Miku", lang: "Japanese"}
,   {id: 140646, rank: 2.0, voicebanks: "Hatsune Miku, Kasane Teto SV", lang: "English"}
,   {id: 49431, rank: 1.2, voicebanks: "Hatsune Miku, KAFU, Kasane Teto SV", lang: "Japanese"}
,   {id: 624, rank: 3.0, alias: "Tucada", voicebanks: "Hatsune Miku, Megurine Luka, KAITO", lang: "Japanese"}
,   {id: 470, rank: 1.3, alias: "きくお", voicebanks: "Hatsune Miku, Hatsune Miku V3 (English)", lang: "Japanese"}
];

async function loadData()
{
    for (let eachSong of favSongs)
    {
        const cacheKey = `cachedSong${eachSong.id}`;
        const songExist = localStorage.getItem(cacheKey);
        
        if (songExist)
        {
            console.log(`Loading song ID ${eachSong.id} from localStorage`);
            continue;
        }
        try
        {
            const result = await fetch(`https://vocadb.net/api/songs/${eachSong.id}?fields=MainPicture&lang=English`);
            const song = await result.json();
            localStorage.setItem(cacheKey, JSON.stringify(song));
            console.log(`Song ${eachSong.id} successfully saved to localStorage`);
        }
        catch (error)
        {
            console.warn(`Error for song ${eachSong.id}`);
        }
    }
    for (let eachProd of favProducers)
    {
        const cacheKey = `cachedProducer${eachProd.id}`;
        const producerExist = localStorage.getItem(cacheKey);

        if (producerExist)
        {
            console.log(`Loading producer ID ${eachProd.id} from localStorage`);
            continue;
        }
        try
        {
            const result = await fetch(`https://vocadb.net/api/artists/${eachProd.id}?fields=MainPicture&lang=English`);
            const producer = await result.json();
            localStorage.setItem(cacheKey, JSON.stringify(producer));
            console.log(`Producer ${eachProd.id} successfully saved to localStorage`);
        }
        catch (error)
        {
            console.warn(`Error for producer ${eachProd.id}`);
        }
    }
    cleanLocalStorage();
    initializeData();
    sortSongsRanked();
    sortProducersRanked();
}
function cleanLocalStorage()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        let LSobj = JSON.parse(localStorage.getItem(key));
        if (favSongs.find((element) => element.id === LSobj.id)) { continue; }
        if (favProducers.find((element) => element.id === LSobj.id)) { continue; }
        if (LSobj.name)
        {
            console.log(`Removing from local storage : ${LSobj.name}, ${LSobj.id}`);
            localStorage.removeItem(key);
        }
    }
}
function initializeData()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);
        const dataJSON = JSON.parse(localStorage.getItem(key));
        if (key.startsWith('cachedSong'))
        {
            const get = favSongs.find((element) => element.id === dataJSON.id);

            get.name = dataJSON?.name;
            get.dataKey = key;
            if (dataJSON.publishDate === undefined)
            { get.date = ''; }
            else
            { get.date = Date.parse(dataJSON?.publishDate); }
            continue;
        }
        if (key.startsWith('cachedProducer'))
        {
            const get = favProducers.find((element) => element.id === dataJSON.id);

            get.name = dataJSON?.name;
            get.dataKey = key;
        }
    }
}
function createSongIndex()
{
    songIndex.innerHTML = '';

    for (let i = 0; i < favSongs.length; i++)
    {
        const cell = document.createElement("div");
        const song = JSON.parse(localStorage.getItem(`${favSongs[i]?.dataKey}`));
        
        cell.innerHTML =
        `
        <div class="container-fluid song-index" id="songIndex">
            <div class="row justify-content-center">
                <div class="col-2" style="display: flex; justify-content: center; text-align: center;">
                    <h1 class="index">${i+1}</h1>
                </div>
                <div class="col-10">
                    <button type="button" class="list-group-item btn btn-voca-index" data-bs-target="#song-carousel" data-bs-slide-to="${i}">${song?.name}</button>
                </div>
            </div>
        </div>
        `;
        songIndex.appendChild(cell);
    }
}
function createSongCells()
{
    var ifCellFirst = '';
    songCell.innerHTML = '';

    for (let i = 0; i < favSongs.length; i++)
    {
        const cell = document.createElement("div");
        const song = JSON.parse(localStorage.getItem(`${favSongs[i]?.dataKey}`));
        const minutes = Math.floor(song.lengthSeconds / 60);
        const seconds = song.lengthSeconds % 60;
        const formattedSeconds = seconds.toString().padStart(2, '0');
        var date = new Date(`${song.publishDate}`.replace(/-/g, '\/').replace(/T.+/, ''));
        var formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }).format(date);

        if (i === 0)
        { ifCellFirst = ` active`; }
        else
        { ifCellFirst = ''; }
        
        cell.innerHTML =
        `
        <div class="carousel-item${ifCellFirst}">
            <img src="${song?.mainPicture?.urlOriginal}" class="d-block w-100" alt="Slide ${i + 1}">
            <div class="carousel-caption d-none d-md-block">
                <h1 class="cellh">${song.name}</h1>
                <p class="cellp">
                    <b class="b1">Producer(s):</b> ${song.artistString} <br>
                    <b class="b1">Length:</b> ${minutes}:${formattedSeconds} <br>
                    <b class="b1">Published:</b> ${formattedDate} <br>
                    <a target="_blank" href="https://vocadb.net/S/${song.id}">VocaDB link</a>
                </p>
            </div>
        </div>
        `;
        songCell.appendChild(cell);
    }
}
function createProducerIndex()
{
    producerIndex.innerHTML = '';

    for (let i = 0; i < favProducers.length; i++)
    {
        const cell = document.createElement("div");
        const producer = JSON.parse(localStorage.getItem(`${favProducers[i]?.dataKey}`));
        
        cell.innerHTML =
        `
        <div class="container-fluid producer-index" id="producerIndex">
            <div class="row justify-content-center">
                <div class="col-2" style="display: flex; justify-content: center; text-align: center;">
                    <h1 class="index">${i+1}</h1>
                </div>
                <div class="col-10">
                    <button type="button" class="list-group-item btn btn-voca-index" data-bs-target="#prod-carousel" data-bs-slide-to="${i}">${producer?.name}</button>
                </div>
            </div>
        </div>
        `;
        producerIndex.appendChild(cell);
    }
}
function createProducerCells()
{
    var ifCellFirst = '';
    producerCell.innerHTML = '';

    for (let i = 0; i < favProducers.length; i++)
    {
        const cell = document.createElement("div");
        const producer = JSON.parse(localStorage.getItem(`${favProducers[i]?.dataKey}`));
        const alias = favProducers.find(p => p.id === producer.id)?.alias;
        const voicebanks = favProducers.find(p => p.id === producer.id)?.voicebanks;
        const lang = favProducers.find(p => p.id === producer.id)?.lang;

        if (i === 0)
        { ifCellFirst = ` active`; }
        else
        { ifCellFirst = ''; }
        
        cell.innerHTML =
        `
        <div class="carousel-item${ifCellFirst}">
            <img src="${producer?.mainPicture?.urlOriginal}" class="d-block w-100" alt="Slide ${i + 1}">
            <div class="carousel-caption d-none d-md-block">
                <h1 class="cellh">${producer.name}</h1>
                <p class="cellp">
                    <b class="b1">Aliases(s):</b> ${alias || "TBA"} <br>
                    <b class="b1">Main Voicebank(s):</b> ${voicebanks || "TBA"} <br>
                    <b class="b1">Main Language(s):</b> ${lang || "TBA"} <br>
                    <a target="_blank" href="https://vocadb.net/Ar/${producer.id}">VocaDB link</a>
                </p>
            </div>
        </div>
        `;
        producerCell.appendChild(cell);
    }
}
function sortSongsRanked()
{
    favSongs.sort((x, y) => x?.rank - y?.rank);
    
    createSongIndex();
    createSongCells();
}
function sortSongsAlphabetically()
{
    favSongs.sort((x, y) => x?.name?.localeCompare(y?.name, undefined, { sensitivity: 'base' }));
    
    createSongIndex();
    createSongCells();
}
function sortSongsId()
{
    favSongs.sort((x, y) => x.date - y.date);

    createSongIndex();
    createSongCells();
}
function sortProducersRanked()
{
    favProducers.sort((x, y) => x?.rank - y?.rank);

    createProducerIndex();
    createProducerCells();  
}
function sortProducersAlphabetically()
{
    favProducers.sort((x, y) => x?.name?.localeCompare(y?.name, undefined, { sensitivity: 'base' }));
    
    createProducerIndex();
    createProducerCells();  
}