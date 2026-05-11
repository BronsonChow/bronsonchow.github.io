const songIndex = document.getElementById("favSongIndex");
const songCell = document.getElementById("favSongCells");
const producerIndex = document.getElementById("favProducerIndex");
const producerCell = document.getElementById("favProducerCells");

const favSongs = [178119, 805916, 820162, 131090, 812344, 829512, 164107, 166391, 850999, 129109, 753120, 642667, 131087, 198286, 588814, 506793, 1508];
const favProducers = [144288, 28, 99484, 53, 23155, 144555];
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
    if (localStorage.getItem('depAlert') === null)
    {
        alert("[Deprecation] See /content/voca/voca.html or go to Personal Projects -> Vocaloid Stuff in navigation bar.");
        localStorage.setItem('depAlert', "1");
    }
    for (let favSongId of favSongs)
    {
        const cacheKey = `cachedSong${favSongId}`;
        const songExist = localStorage.getItem(cacheKey);
        
        console.log(songExist);
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
                    <div class="col-lg-10" style="max-width: 400px;">
                        <a class="btn centered" href="#${song?.id}" role="button" style="padding: 0;">${song?.name}</a>
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
    for (let i = 0; i < songData.length; i++)
    {
        const cell = document.createElement("div");
        const key = songData[i]?.dataKey;

        if (key.startsWith('cachedSong'))
        {
            const song = JSON.parse(localStorage.getItem(`${songData[i]?.dataKey}`));
            
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
            &nbsp;
            <a class="anchor" id="${song.id}"></a>
            <div class="container-fluid" id="songCell">
                <div class="row">
                    <div class="col-lg-3 centered" style="padding-left: 0px;">
                        <div class="image-container">
                            <img class="img-fluid" style="transform: scale(1.5);" src="${song?.mainPicture?.urlOriginal}" title="${song.name}"/>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="title">
                            <h2><b>${song.name}</b></h2>
                        </div>
                        <p>
                            <b>Producer(s):</b> ${song.artistString} <br>
                            <b>Length:</b> ${minutes}:${formattedSeconds} <br>
                            <b>Published:</b> ${formattedDate} <br>
                            <a target="_blank" href="https://vocadb.net/S/${song.id}">VocaDB link</a>
                        </p>
                    </div>
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
                    <div class="col-lg-10" style="max-width: 400px;">
                        <a class="btn centered" href="#${producer?.id}" role="button" style="padding: 0;">${producer?.name}</a>
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
    for (let i = 0; i < producerData.length; i++)
    {
        const cell = document.createElement("div");
        const key = producerData[i]?.dataKey;

        if (key.startsWith('cachedProducer'))
        {
            const producer = JSON.parse(localStorage.getItem(`${producerData[i]?.dataKey}`));
            
            const alias = favProducersM.find(p => p.id === producer.id)?.alias;
            const voicebanks = favProducersM.find(p => p.id === producer.id)?.voicebanks;
            const lang = favProducersM.find(p => p.id === producer.id)?.lang;
            
            cell.innerHTML =
            `
            &nbsp;
            <a class="anchor" id="${producer.id}"></a>
            <div class="container-fluid" id="producerCell">
                <div class="row">
                    <div class="col-lg-3 centered" style="padding-left: 0px;">
                        <div class="image-container">
                            <img class="img-fluid" src="${producer?.mainPicture?.urlOriginal}" title="${producer.name}"/>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="title">
                            <h2><b>${producer.name}</b></h2>
                        </div>
                        <p>
                            <b>Aliases:</b> ${alias}<br>
                            <b>Main Voicebank(s):</b> ${voicebanks} <br>
                            <b>Main Language(s):</b> ${lang} <br>
                            <a target="_blank" href="https://vocadb.net/Ar/${producer.id}">VocaDB link</a>
                        </p>
                    </div>
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
function sortDataAlphabetically()
{
    sortSongDataAlphabetically();
    sortProducerDataAlphabetically();
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
function sortDataId()
{
    console.log(songData.length);
    console.log(producerData.length);
    sortSongDataId();
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
// testLog();