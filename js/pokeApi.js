const url = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1`;
const displayDiv = document.querySelector(".display-pokemon");

async function fetchPokemonName() {
    const response = await fetch(url);

    if (!response.ok) {
        throw Error("Failed to fetch info");
    }
    const data = await response.json();

    const pokemonResults = data.results;

    //Loop for the second end fetch
    for (let individualPokemon of pokemonResults) {
        let pokemonUrl = individualPokemon.url;

        // console.log(individualPokemon);

        const pokemonResponse = await fetch(pokemonUrl);

        if (!pokemonResponse.ok) {
            throw Error("Failed to fetch pokemon");
        }

        const pokemonData = await pokemonResponse.json();

        // console.log(pokemonData);

        //Variables for the data enpoints
        const name = pokemonData.name;
        const abilities = pokemonData.abilities;
        const images = pokemonData.sprites.front_default;
        const pokemonId = pokemonData.id;

        // console.log(pokemonId);

        const abilitiesName = abilities.map(x => x.ability.name);

        // console.log(abilitiesName)

        let submitBtn = document.getElementById("submit");

        //This is the card container, parent of the p and img and over info
        const cardContainer = document.createElement("div");
        cardContainer.style = "height:18em";
        cardContainer.classList.add("card-size", "card", "d-flex", "flex-column", "mx-2", "w-25", "mb-3");

        //Holds the name
        const pElement = document.createElement("h2");
        pElement.classList.add("text-center", "live");
        pElement.textContent = capitalizeFirstLetter(name);

        //Image
        const imgElement = document.createElement("img");
        imgElement.classList.add("w-50", "mx-auto", "my-auto");
        // imgElement.value = pokemonId;
        imgElement.src = images;

        //Id element
        const idElement = document.createElement("input");
        idElement.classList.add("d-none");
        idElement.setAttribute("id", "id-value");
        idElement.setAttribute("value", pokemonId);

        console.log(idElement);


        //Ablilites text
        // const abilityText = document.createElement("p");
        // abilityText.classList.add("text-center", "fw-bold");
        // abilityText.textContent = "Abilities";
        // const abilitiesElement = document.createElement("p");
        // abilitiesElement.classList.add("text-center");
        // abilitiesElement.textContent = abilitiesName;

        //Display container, holds everything, most parent

        cardContainer.classList.add("cards");
        cardContainer.appendChild(pElement);
        cardContainer.appendChild(imgElement);
        cardContainer.appendChild(idElement);
        // cardContainer.appendChild(abilityText);
        // cardContainer.appendChild(abilitiesElement);

        // console.log(cardContainer);
        //Appeding all the child elements to the parent most div
        displayDiv.appendChild(cardContainer);

        // fetchForPage(pokemonId);
        // function matchId() {
        //     if (pokemonId == ){
        //     }
        //
    }


}

async function fetchForPage(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(data => {
            return data.json();
        })
        .then(pokemon => {
            console.log(pokemon);
        });
}


//Search function
function liveSearch() {

    let cards = document.querySelectorAll('.cards');
    let nameFinder = document.querySelectorAll('.live')
    let search_query = document.getElementById("search").value;
    for (let i = 0; i < cards.length; i++) {
        console.log(cards[i])
        if (nameFinder[i].innerText.toLowerCase()
            .includes(search_query.toLowerCase())) {
            cards[i].classList.remove("d-none");
        } else {
            cards[i].classList.add("d-none");
        }
    }
}


//Capitalize the first letter
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

fetchPokemonName();
