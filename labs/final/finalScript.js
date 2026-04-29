const songCell = document.getElementById("favSongs");

const favSongs = [178119, 805916];
const favSongData = {};

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
            const result = await fetch(`https://vocadb.net/api/songs/${favSongId}?lang=English`);
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
        const card = document.createElement("paragraph");
        const key = localStorage.key(i);

        if (key.startsWith('cachedSong'))
        {
            const song = JSON.parse(localStorage.getItem(key));
            
            card.innerHTML =
            `
            
            `;
        }
        
        console.log("test");
        songCell.appendChild(card);
    }
}
async function testLog()
{
    console.log({ ...localStorage });
    console.log('localStorage objects: ' + localStorage.length);
}

loadData();
createSongCells();
testLog();
// localStorage.clear();