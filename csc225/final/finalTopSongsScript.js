const songTopRatedIndex = document.getElementById("topRatedSongIndex");
const songTopRatedCell = document.getElementById("topRatedSongs");
const ratingSlider = document.getElementById("maxSongs");
const ratingMax = ratingSlider.getAttribute("max");

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
    createTopSongIndex(13);
    createTopSongCells(13);
}
function createTopSongIndex(sliderValue)
{
    const topSongsArray = JSON.parse(localStorage.getItem(`cachedTopSongs${ratingMax}`));

    for (let i = 0; i < sliderValue; i++)
    {
        const cell = document.createElement("div");
        const song = topSongsArray[i];
        
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
        songTopRatedIndex.appendChild(cell);
    }
}
function createTopSongCells(sliderValue)
{
    const topSongsArray = JSON.parse(localStorage.getItem(`cachedTopSongs${ratingMax}`));

    for (let i = 0; i < sliderValue; i++)
    {
        const cell = document.createElement("div");
        const song = topSongsArray[i];

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
                        <h1>${i+1}.</h1>
                        <h2><b>${song.name}</b></h2>
                    </div>
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
        `;
        songTopRatedCell.appendChild(cell);
    }
}
function displayTopSongs(value)
{
    const test = document.getElementById('valueDisplay').innerHTML = value;
    
    songTopRatedIndex.innerHTML = '';
    songTopRatedCell.innerHTML = '';
    createTopSongIndex(value);
    createTopSongCells(value);
}