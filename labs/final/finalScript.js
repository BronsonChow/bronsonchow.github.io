const songCell = document.getElementById("favSongs");
const producerCell = document.getElementById("favProducers");
const favSongs = [178119, 805916, 820162, 131090, 812344, 829512, 160589, 164107, 166391, 850999, 129109, 753120, 642667];
const favProducers = [144288];

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
function createSongCells()
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
                            <img class="img-fluid" src="${song.mainPicture.urlOriginal}" title="${song.name}"/>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <p><b>${song.name}</b></p>
                        <p>
                            Producer(s): ${song.artistString} <br>
                            Length: ${minutes}:${formattedSeconds} <br>
                            Published: ${formattedDate} <br>
                            <a target="_blank" href="https://vocadb.net/S/${song.id}">VocaDB link</a>
                        </p>
                    </div>
                </div>
            </div>
            `;
        }
        songCell.appendChild(cell);
    }
}
async function loadProducers()
{

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
// loadProducers();
createSongCells();
// createProducerCells();
testLog();
// localStorage.clear();