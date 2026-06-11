const songIndex = document.getElementById("favSongIndex");
const songCell = document.getElementById("favSongCells");
const producerIndex = document.getElementById("favProducerIndex");
const producerCell = document.getElementById("favProducerCells");

const favSongs = [
    {id: 131090}
,   {id: 640212}
,   {id: 642667}
];
const favProducers = [
    {id: 28, rank: 1}
,   {id: 144288, rank: 3}
,   {id: 99484, rank: 11}
,   {id: 53, rank: 7}
,   {id: 23155, rank: 2}
,   {id: 144555, rank: 10}
,   {id: 140646, rank: 8}
,   {id: 49431, rank: 4}
,   {id: 624, rank: 12}
,   {id: 470, rank: 5}
,   {id: 93529, rank: 6}
,   {id: 45, rank: 9}
];

async function loadFavSongData()
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
    cleanFavLocalStorage();
    storeFavDataInArray();
    sortFavSongs("ranked");
    sortFavProducers("ranked");
}
function cleanFavLocalStorage()
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
function storeFavDataInArray()
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
function sortFavSongs(sortBy)
{
    switch (sortBy)
    {
        case "ranked":
            favSongs.sort((x, y) => x?.rank - y?.rank);
            break;
        case "alphabet":
            favSongs.sort((x, y) => x?.name?.localeCompare(y?.name, undefined, { sensitivity: 'base' }));
            break;
        case "date":
            favSongs.sort((x, y) => x.date - y.date);
            break;
    }
    createSongIndex();
    createSongCells();
}
function sortFavProducers(sortBy)
{
    switch (sortBy)
    {
        case "ranked":
            favProducers.sort((x, y) => x?.rank - y?.rank);
            break;
        case "alphabet":
            favProducers.sort((x, y) => x?.name?.localeCompare(y?.name, undefined, { sensitivity: 'base' }));
            break;
    }
    createProducerIndex();
    createProducerCells();  
}