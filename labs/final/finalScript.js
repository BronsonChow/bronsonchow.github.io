const songCell = document.getElementById("favSongs");
const producerCell = document.getElementById("favProducers");
const favSongs = [178119, 805916, 820162, 131090, 812344, 829512, 160589, 164107, 166391, 850999, 129109, 753120, 642667];
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
}
function createFavCells()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        const cell = document.createElement("paragraph");
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
    // const formattedPercentage = (Math.round(percentageUsed * 100000) / 100000).toFixed(5);
    console.log(`LocalStorage Bytes Allocated: ${totalBytes}`);
    console.log(`LocalStorage Bytes Remaining: ${remainingBytes}`);
    console.log(`LocalStorage Percentage Used: ${percentageUsed} %`);
}
async function testLog()
{
    console.log({ ...localStorage });
    getLocalStorageUsage();
    console.log('localStorage Objects: ' + localStorage.length);
}

loadSongs();
loadProducers();
createFavCells();
testLog();
// localStorage.clear();