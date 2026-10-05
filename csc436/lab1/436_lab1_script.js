async function getSecureData() {
    try
    {
        const response = await fetch('/.netlify/functions/fetch_data');
        if (!response.ok)
        {
            throw new Error(`Function returned ${response.status}: ${await response.text()}`);
        }
        
        const data = await response.json();
        console.log("Successfully fetched data:", data);
    } catch (error) {
        console.error("Error calling function:", error);
    }
}

// async function fetchCards()
// {   
//     for (let cardID of cards)
//     {
//         const cardExist = localStorage.getItem(`cachedCard${cardID}`);
//         if (cardExist)
//         {
//             // console.log(`Loading card ${cardID} from cache`);
//             showCard(cardID);
//         }
//         else
//         {
//             try
//             {
//                 // console.log(`Fetching card ${cardID} from API`);

//                 const result = await fetch(`https://api.scryfall.com/cards/${cardID}`);
//                 const card = await result.json();

//                 localStorage.setItem(`cachedCard${cardID}`, JSON.stringify(card));
//                 // console.log(`Card ${cardID} cached successfully`);
//                 showCard(cardID);
//             }
//             catch (error)
//             {
//                 console.error(`Error fetching card ${cardID}:`, error);
//             }
//         }
//     }
// }
// function showCard(cardID)
// {
//     const key = localStorage.getItem(`cachedCard${cardID}`);
//     const card = JSON.parse(key);
//     if (card.object === 'card')
//     {
//         const cardHTML = document.createElement("div");
//         cardHTML.classList.add("card");

//         // console.log(card.image_uris.normal);

//         cardHTML.innerHTML =
//         `
//         <img src="${card.image_uris.normal}" alt="${card.name}" class="card-image">
//         `;
//         cardCell.appendChild(cardHTML);
//     }
// }
getSecureData();