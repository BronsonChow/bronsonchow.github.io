const spreadsheetID = "1WMIVNClOw7a2aftjfZl0al2rAorJvz1El-ihGO9mogE";
const range = "vocaDB-ID-list!A1:C";
const domainAPIkey = "AIzaSyBWyQ295daWJeBa5rWi1UXEgY7HaUtOyRU"; // Restricted by domain
const userData = JSON.parse(localStorage.getItem("userSettings"));
const now = new Date().getTime();
const updateCheck = new Date(now + (8 * 60 * 60 * 1000));

async function loadVocaData(pageName)
{
    if (!(userData.lastUpdate)) // Updates songs if over 8h since last updated
    {
        console.log("Creating localStorage time check");
        userData.lastUpdate = 0;
        localStorage.setItem("userSettings", JSON.stringify(userData));
    }
    if (userData.lastUpdate < now)
    {
        console.log("Updating song list from " + updateCheck.toString() + " to " + updateCheck.toString());
        try
        {
            const totalResult = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${range}?key=${domainAPIkey}`);
            const totalList = await totalResult.json();
            if (totalList.error)
            {
                console.warn("Error fetching API data");
            }
            else
            {
                localStorage.setItem("totalSongs", JSON.stringify(totalList));
                console.log("Cumulative total songs successfully saved to localStorage");
            }
        }
        catch (error)
        {
            console.warn("Error fetching data");
        }
        updateLSTime();
    }
    else
    {
        const list = JSON.parse(localStorage.getItem("totalSongs"));
        console.warn("Not enough alloted time passed; using localStorage data.\n" + ((userData.lastUpdate - now) / 3600000).toFixed(3) + " hours until next update.");
    }

    switch (pageName)
    {
        case "favoriteVoca":
            loadFavSongData();
            break;
        case "totalVoca":
            loadTotalSongData();
            break;
        default:
            console.log("No such directory exists.");
    }
}
function updateLSTime()
{
    userData.lastUpdate = updateCheck.getTime();
    localStorage.setItem("userSettings", JSON.stringify(userData));
}
function resetLSTime()
{
    userData.lastUpdate = 0;
    localStorage.setItem("userSettings", JSON.stringify(userData));
}