const customArmy =
[
    1558,
    704,
    1174,
    94
];

async function getSecureData()
{
    try
    {
        const response = await fetch('/.netlify/functions/fetch_data');
        if (!response.ok)
        {
            throw new Error(`Function returned ${response.status}: ${await response.text()}`);
        }
        
        const data = await response.json();
        console.log("Successfully fetched data:", data);
        displayData(data);
    } catch (error) {
        console.error("Error calling function:", error);
    }
}
function displayData(data)
{
    const matchedArmy = data.values.filter((row) => customArmy.includes(parseInt(row[0])));

    const unitCardIndex = document.createElement('unitCardIndex');
    unitCardIndex.innerHTML =
    `
    <h2>Locally Saved Units</h2>
    `;
    document.querySelector('cardContainer').appendChild(unitCardIndex);
    document.querySelector('cardContainer').appendChild(document.createElement('br'));

    matchedArmy.forEach((row, index) => {
        const unitCard = document.createElement('unitCard');
        console.log(`Displaying data for row ${index}:`, row);

        unitCard.innerHTML =
        `
        <p>${row[2]}</p>
        <p>${row[3]}</p>
        `;
        document.querySelector('cardContainer').appendChild(unitCard);
    });
}

getSecureData();