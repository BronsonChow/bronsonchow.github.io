const customArmy =
[
    1558,
    704,
    1174,
    94
];

async function getSecureData()
{
    if (localStorage.getItem("cachedUnits"))
    {
        console.log("Loading units from localstorage.");
        displayArmy();
        return;
    }
    try
    {
        const response = await fetch('/.netlify/functions/fetch_data');
        if (!response.ok)
        {
            throw new Error(`Function returned ${response.status}: ${await response.text()}`);
        }
        
        const data = await response.json();
        console.log("Successfully fetched data:", data);
        try
        {
            const matchLocalArmy = data.values.filter((row) => customArmy.includes(parseInt(row[0])));
            
            console.log("Storing data in localstorage.");
            localStorage.setItem("cachedUnits", JSON.stringify(matchLocalArmy));
            console.log(`Successfully stored ${matchLocalArmy.length} local units in localstorage.`);
        } catch (error) {
            console.error("Error storing data in localStorage:", error);
        }

        displayArmy();
    } catch (error) {
        console.error("Error calling function:", error);
    }
}
function displayArmy()
{
    const matchedArmy = JSON.parse(localStorage.getItem("cachedUnits")) || [];
    
    document.querySelector('cardContainer').appendChild(document.createElement('br'));

    matchedArmy.forEach((row, index) => {
        const unitCard = document.createElement('unitCard');
        // console.log(`Displaying data for row ${index}:`, row);

        unitCard.innerHTML =
        `
        <h1>${row[2] || "N/A"}</h1>
        <p>${row[3] || "N/A"}</p>
        <p>${row[4] || "N/A"}</p>
        <p>${row[5] || "N/A"}</p>
        <p>${row[6] || "N/A"}</p>
        <p>${row[8] || "N/A"}</p>
        `;
        document.querySelector('cardContainer').appendChild(unitCard);
    });
}

getSecureData();