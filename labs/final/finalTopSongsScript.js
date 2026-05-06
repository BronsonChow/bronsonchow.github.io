const songTopRatedCell = document.getElementById("topRatedSongs");
const ratingSlider = document.getElementById("maxSongs");
const ratingMax = ratingSlider.getAttribute('max');

const songTopData = [];

async function loadTopRated()
{
    const cacheKey = `cachedTopSongs${ratingMax}`;
    const dbExist = localStorage.getItem(cacheKey);

    if (dbExist)
    {
        console.log(`Loading top ${ratingMax} songs from localStorage`);
    }
    else
    {
        try
        {
            const result = await fetch(`https://vocadb.net/api/songs/top-rated?maxResults=${ratingMax}&fields=MainPicture&languagePreference=English`);
            const topSongs = await result.json();
            localStorage.setItem(cacheKey, JSON.stringify(topSongs));
            console.log(`Top ${ratingMax} songs successfully saved to localStorage`);
        }
        catch (error)
        {
            console.warn(`Error for fetching top ${ratingMax} songs`);
        }
    }
    createTopSongCells();
}
function createTopSongCells()
{
    const cell = document.createElement("div");
    const topSongsArray = JSON.parse(localStorage.getItem(`cachedTopSongs${ratingMax}`));

    for (let i = 0; i < ratingMax; i++)
    {
        const song = topSongsArray[i];
        
        cell.innerHTML =
        `
        <p>${i}</p>
        `;
        songTopRatedCell.appendChild(cell);
        console.log(i);
    }
    /*

<div class="container-fluid" id="songCell">
    <div class="row">
        <div class="col-lg-3 centered" style="padding-left: 0px;">
            <div class="image-container">
                <img class="img-fluid" style="transform: scale(1.5);" src="${song?.mainPicture?.urlOriginal}" title="${song.name}"/>
            </div>
        </div>
        <div class="col-lg-9">
            <p><b>${song.name}</b></p>
            <p>
                <b>Producer(s):</b> ${song.artistString} <br>
                <b>Length:</b> ${minutes}:${formattedSeconds} <br>
                <b>Published:</b> ${formattedDate} <br>
                <b>Favorites:</b> ${song.favoritedTimes} <br>
                <b>Ratings:</b> ${song.ratingScore} <br>
                <a target="_blank" href="https://vocadb.net/S/${song.id}">VocaDB link</a>
            </p>
        </div>
    </div>
</div>

    */
}