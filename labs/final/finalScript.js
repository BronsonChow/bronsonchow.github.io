const songCell = document.getElementById("favSongs");
const producerCell = document.getElementById("favProducers");
const favSongs = [178119, 805916, 820162, 131090, 812344, 829512, 164107, 166391, 850999, 129109, 753120, 642667, 131087, 198286, 588814, 506793];
const favProducers = [144288, 28, 99484];
const favProducersM = [
    {id: 28, alias: "ピノキオP", voicebanks: "Hatsune Miku V4X (Original), Hatsune Miku V4X (Dark)", lang: "Japanese, English"}
,   {id: 144288, alias: "TAK / DORIDORI", voicebanks: "Hatsune Miku V4X (Original), Kasane Teto SV", lang: "Japanese, Korean, English"}
,   {id: 99484, alias: " ", voicebanks: " ", lang: " "}
];

async function loadSongs()
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
    createSongIndex();
    createSongCells();
}
async function loadProducers()
{
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
    createProducerCells();
}
function createSongIndex()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        const cell = document.createElement("div");
        const key = localStorage.key(i);

        if (key.startsWith('cachedSong'))
        {
            const song = JSON.parse(localStorage.getItem(key));
            
            cell.innerHTML =
            `
            <div class="container-fluid" id="songIndex">
                <div class="row justify-content-center">
                    <div class="col-md-10" style="max-width: 400px;">
                        <a class="btn btn-light centered" href="#${song.id}" role="button" style="padding: 0;"><b>${song.name}</b></a>
                    </div>
                </div>
            </div>
            `;
            songCell.appendChild(cell);
        }
    }
}
function createSongCells()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        const cell = document.createElement("div");
        const key = localStorage.key(i);

        if (key.startsWith('cachedSong'))
        {
            const song = JSON.parse(localStorage.getItem(key));
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
                    <div class="col-md-3 centered">
                        <div class="image-container">
                            <img class="img-fluid" style="transform: scale(1.5);" src="${song?.mainPicture?.urlOriginal}" title="${song.name}"/>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <p><b>${song.name}</b></p>
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
function createProducerCells()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        const cell = document.createElement("div");
        const key = localStorage.key(i);

        if (key.startsWith('cachedProducer'))
        {
            const producer = JSON.parse(localStorage.getItem(key));
            const alias = favProducersM.find(p => p.id === producer.id)?.alias;
            const voicebanks = favProducersM.find(p => p.id === producer.id)?.voicebanks;
            const lang = favProducersM.find(p => p.id === producer.id)?.lang;
            
            cell.innerHTML =
            `
            &nbsp;
            <div class="container-fluid" id="producerCell">
                <div class="row">
                    <div class="col-md-3 centered">
                        <div class="image-container">
                            <img class="img-fluid" src="${producer?.mainPicture?.urlOriginal}" title="${producer.name}"/>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <p><b>${producer.name}</b></p>
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
    console.log(`LocalStorage Bytes Allocated: ${totalBytes}`);
    console.log(`LocalStorage Bytes Remaining: ${remainingBytes}`);
    console.log(`LocalStorage Percentage Used: ${formattedPercentage} %`);
}
function sortLocalStorage()
{
    const array = [];
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);
        const arrayJSON = JSON.parse(localStorage.getItem(key));
        array.push({arrayJSON});
        console.log(arrayJSON.name);
    }
    array.sort((x, y) => x?.arrayJSON?.name?.localeCompare(y?.arrayJSON?.name, undefined, { sensitivity: 'base' }));
    for (let i = 0; i < localStorage.length; i++)
    {
        console.log(array[i]);
    }
    for (let i = 0; i < localStorage.length; i++)
    {
        const key = localStorage.key(i);
        console.log(key);
    }
}
async function testLog()
{
    console.log({ ...localStorage });
    console.log('localStorage Objects: ' + localStorage.length);
    getLocalStorageUsage(); 
}

loadSongs();
loadProducers();
testLog();
// localStorage.clear();
sortTest();