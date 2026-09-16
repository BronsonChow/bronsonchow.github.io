const cardCell = document.getElementById("cardCell");
const cards = [
    `565fc4d4-4c17-44d5-a5bc-31bc99018e5d`, // Armageddon
    `4c7c9072-d14c-442c-a386-bfdc0cbe110d`, // Propaganda
    `906482a9-4b9d-4fc3-a3e5-ac135ed076d3`, // Miku, Child of Song
    `43c037e3-7d1a-48ca-8ecc-276696592f62`, // Heroic Intervention
    `f2c4f80e-84a0-463b-82c3-5c6503809351`, // Doubling Season
    `d6914dba-0d27-4055-ac34-b3ebf5802221`, // Rhystic Study
    `test` // testing error handling
];

async function fetchCards()
{
    
    
    for (let cardID of cards)
    {
        const cardExist = localStorage.getItem(`cachedCard${cardID}`);
        if (cardExist)
        {
            console.log(`Loading card ${cardID} from cache`);
            showCard(cardID);
        }
        else
        {
            try
            {
                console.log(`Fetching card ${cardID} from API`);

                const result = await fetch(`https://api.scryfall.com/cards/${cardID}`);
                const card = await result.json();

                localStorage.setItem(`cachedCard${cardID}`, JSON.stringify(card));
                console.log(`Card ${cardID} cached successfully`);
                showCard(cardID);
            }
            catch (error)
            {
                console.error(`Error fetching card ${cardID}:`, error);
            }
        }
    }
}
function showCard(cardID)
{
    const key = localStorage.getItem(`cachedCard${cardID}`);
    const card = JSON.parse(key);
    if (card.object === 'card')
    {
        const cardHTML = document.createElement("div");
        cardHTML.classList.add("card");

        console.log(card.image_uris.normal);

        cardHTML.innerHTML =
        `
        <img src="${card.image_uris.normal}" alt="${card.name}" class="card-image">
        `;
        cardCell.appendChild(cardHTML);
    }
}
fetchCards();