const songIndex = document.getElementById("favSongIndex");
const songCell = document.getElementById("favSongCells");
const producerIndex = document.getElementById("favProducerIndex");
const producerCell = document.getElementById("favProducerCells");

const favSongs = [
    131090, 640212, 642667, 823241, 805916,
    820162, 198286, 274835, 251400, 813747,
    416211, 129109, 7042, 178119, 160589,
    291470, 166391, 362821, 850999, 588814,
    732509, 131087, 812344, 829477, 796304,
    796307, 718225, 829512, 780061, 773406,
    1501, 164107
];
const favProducers = [
    144288, 28, 99484, 53, 23155,
    144555, 140646, 49431, 624, 470
];
const favProducersM = [
    {id: 28, alias: "ピノキオP", voicebanks: "Hatsune Miku V4X (Original), Hatsune Miku V4X (Dark)", lang: "Japanese, English"}
,   {id: 144288, alias: "TAK / DORIDORI", voicebanks: "Hatsune Miku V4X (Original), Kasane Teto SV", lang: "Japanese, Korean, English"}
,   {id: 99484, alias: "", voicebanks: "Hatsune Miku V4 (English)", lang: "English"}
,   {id: 53, alias: "GenjitsutouhiP", voicebanks: "Hatsune Miku, GUMI, Megurine Luka", lang: "Japanese"}
,   {id: 23155, alias: "JamieP", voicebanks: "Kasane Teto SV, V3 GUMI", lang: "English"}
,   {id: 144555, alias: "東京真中, Tokyo Manaka", voicebanks: "Kasane Teto SV, Chis-A, Hatsune Miku", lang: "Japanese"}
];
const songData = [];
const producerData = [];

async function loadData()
{
    for (let favSongId of favSongs)
    {
        const cacheKey = `cachedSong${favSongId}`;
        const songExist = localStorage.getItem(cacheKey);
        
        if (songExist)
        {
            console.log(`Loading song ID ${favSongId} from localStorage`);
            continue;
        }
        try
        {
            const result = await fetch(`https://vocadb.net/api/songs/${favSongId}?fields=MainPicture&lang=English`);
            const song = await result.json();
            localStorage.setItem(cacheKey, JSON.stringify(song));
            console.log(`Song ${favSongId} successfully saved to localStorage`);
        }
        catch (error)
        {
            console.warn(`Error for song ${favSongId}`);
        }
    }
    for (let favProducerId of favProducers)
    {
        const cacheKey = `cachedProducer${favProducerId}`;
        const producerExist = localStorage.getItem(cacheKey);

        if (producerExist)
        {
            console.log(`Loading producer ID ${favProducerId} from localStorage`);
            continue;
        }
        try
        {
            const result = await fetch(`https://vocadb.net/api/artists/${favProducerId}?fields=MainPicture&lang=English`);
            const producer = await result.json();
            localStorage.setItem(cacheKey, JSON.stringify(producer));
            console.log(`Producer ${favProducerId} successfully saved to localStorage`);
        }
        catch (error)
        {
            console.warn(`Error for producer ${favProducerId}`);
        }
    }
    cleanLocalStorage();
    sortSongDataAlphabetically();
    sortProducerDataAlphabetically();
}
function createSongIndex()
{
    for (let i = 0; i < songData.length; i++)
    {
        const cell = document.createElement("div");
        const key = songData[i]?.dataKey;

        if (key.startsWith('cachedSong'))
        {
            const song = JSON.parse(localStorage.getItem(`${songData[i]?.dataKey}`));
            
            cell.innerHTML =
            `
            <div class="container-fluid" id="songIndex">
                <div class="row justify-content-center">
                    <div class="col-1" style="display: flex; justify-content: center; text-align: center;">
                        <h1 class="index">${i+1}</h1>
                    </div>
                    <div class="col-11">
                        <button type="button" class="list-group-item btn btn-voca-index" data-bs-target="#song-carousel" data-bs-slide-to="${i}">${song?.name}</button>
                    </div>
                </div>
            </div>
            `;
            songIndex.appendChild(cell);
        }
    }
}
function createSongCells()
{
    var ifCellFirst = '';

    for (let i = 0; i < songData.length; i++)
    {
        const cell = document.createElement("div");
        const key = songData[i]?.dataKey;

        if (key.startsWith('cachedSong'))
        {
            const song = JSON.parse(localStorage.getItem(`${songData[i]?.dataKey}`));
            if (i === 0)
            {
                ifCellFirst = ` active`;
            } else {
                ifCellFirst = '';
            }
            
            const minutes = Math.floor(song.lengthSeconds / 60);
            const seconds = song.lengthSeconds % 60;
            const formattedSeconds = seconds.toString().padStart(2, '0');
            var date = new Date(`${song.publishDate}`.replace(/-/g, '\/').replace(/T.+/, ''));
            var formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            }).format(date);
            
            cell.innerHTML =
            `
            <div class="carousel-item${ifCellFirst}">
                <img src="${song?.mainPicture?.urlOriginal}" class="d-block w-100" alt="Slide ${i + 1}">
                <div class="carousel-caption d-none d-md-block">
                    <h1 class="cellh">${song.name}</h1>
                    <p style="margin-bottom: 0rem;">
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
}
function createProducerIndex()
{
    for (let i = 0; i < producerData.length; i++)
    {
        const cell = document.createElement("div");
        const key = producerData[i]?.dataKey;

        if (key.startsWith('cachedProducer'))
        {
            const producer = JSON.parse(localStorage.getItem(`${producerData[i]?.dataKey}`));
            
            cell.innerHTML =
            `
            <div class="container-fluid" id="producerIndex">
                <div class="row justify-content-center">
                    <div class="col-1" style="display: flex; justify-content: center; text-align: center;">
                        <h1 class="index">${i+1}</h1>
                    </div>
                    <div class="col-11">
                        <button type="button" class="list-group-item btn btn-voca-index" data-bs-target="#prod-carousel" data-bs-slide-to="${i}">${producer?.name}</button>
                    </div>
                </div>
            </div>
            `;
            producerIndex.appendChild(cell);
        }
    }
}
function createProducerCells()
{
    var ifCellFirst = '';

    for (let i = 0; i < producerData.length; i++)
    {
        const cell = document.createElement("div");
        const key = producerData[i]?.dataKey;

        if (key.startsWith('cachedProducer'))
        {
            const producer = JSON.parse(localStorage.getItem(`${producerData[i]?.dataKey}`));
            if (i === 0)
            {
                ifCellFirst = ` active`;
            } else {
                ifCellFirst = '';
            }
            
            const alias = favProducersM.find(p => p.id === producer.id)?.alias;
            const voicebanks = favProducersM.find(p => p.id === producer.id)?.voicebanks;
            const lang = favProducersM.find(p => p.id === producer.id)?.lang;
            
            cell.innerHTML =
            `
            <div class="carousel-item${ifCellFirst}">
                <img src="${producer?.mainPicture?.urlOriginal}" class="d-block w-100" alt="Slide ${i + 1}">
                <div class="carousel-caption d-none d-md-block">
                    <h1 class="cellh">${producer.name}</h1>
                    <p style="margin-bottom: 0rem;">
                        <b class="b1">Aliases(s):</b> ${alias} <br>
                        <b class="b1">Main Voicebank(s):</b> ${voicebanks} <br>
                        <b class="b1">Main Language(s):</b> ${lang} <br>
                        <a target="_blank" href="https://vocadb.net/Ar/${producer.id}">VocaDB link</a>
                    </p>
                </div>
            </div>
            `;
            producerCell.appendChild(cell);
        }
    }
}
async function testLog()
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
function cleanLocalStorage()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        let LSobj = JSON.parse(localStorage.getItem(key));
        if (favSongs.find((element) => element === LSobj.id)) { continue; }
        if (favProducers.find((element) => element === LSobj.id)) { continue; }
        if (LSobj.name)
        {
            console.log(`Removing from local storage : ${LSobj.name}, ${LSobj.id}`);
            localStorage.removeItem(key);
            continue;
        }
    }
}
function sortSongDataAlphabetically()
{
    songData.length = 0;
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);

        if (key.startsWith('cachedSong'))
        {
            const dataJSON = JSON.parse(localStorage.getItem(key));
            songData.push({name: dataJSON?.name, dataKey: key});
        }
    }
    songData.sort((x, y) => x?.name?.localeCompare(y?.name, undefined, { sensitivity: 'base' }));
    
    songIndex.innerHTML = '';
    songCell.innerHTML = '';
    createSongIndex();
    createSongCells();
}
function sortProducerDataAlphabetically()
{
    producerData.length = 0;
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);

        if (key.startsWith('cachedProducer'))
        {
            const dataJSON = JSON.parse(localStorage.getItem(key));
            producerData.push({name: dataJSON?.name, dataKey: key});
        }
    }
    producerData.sort((x, y) => x?.name?.localeCompare(y?.name, undefined, { sensitivity: 'base' }));
    
    producerIndex.innerHTML = '';
    producerCell.innerHTML = '';
    createProducerIndex();
    createProducerCells();  
}
function sortSongDataId()
{
    songData.length = 0;
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);

        if (key.startsWith('cachedSong'))
        {
            const dataJSON = JSON.parse(localStorage.getItem(key));
            if (dataJSON.publishDate === undefined)
            {
                songData.push({name: dataJSON?.name, dataKey: key, date: ''});
            }
            else
            {
                songData.push({name: dataJSON?.name, dataKey: key, date: Date.parse(dataJSON?.publishDate)});
            }
        }
    }
    songData.sort((a, b) => a.date - b.date);

    songIndex.innerHTML = '';
    songCell.innerHTML = '';
    createSongIndex();
    createSongCells();
}