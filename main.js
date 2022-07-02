const url = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=12`;

async function fetchPokemonName() {
    const response = await fetch(url);

    if(!response.ok){
        throw Error("Failed to fetch info");
    }
    const data = await response.json();


    const pokemonResults = data.results;


    //Loop for the second end fetch
    for(let individualPokemon of pokemonResults){
        let pokemonUrl = individualPokemon.url;

        const pokemons = await fetch(pokemonUrl);

        if(!pokemons.ok){
            throw Error("Failed to fetch pokemon");
        }

        const data = await pokemons.json();

        console.log(data);

        //Variables for the data enpoints
        const name = data.name;
        const abilities = data.abilities;
        const images = data.sprites.front_default;

        //Ability Loop
        let abilityArr = [];
        for(let ability of abilities){
            abilityArr.push(ability.ability.name);
        }

        //This is the card container, parent of the p and img and over info
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute("class"," card-size card d-flex flex-column mx-2 w-25 mb-3")

        //Holds the name
        const pElement = document.createElement("h2");
        pElement.setAttribute("class", "text-center");
        pElement.textContent = capitalizeFirstLetter(name);

        //Image
        const imgElement = document.createElement("img");
        imgElement.setAttribute("class", "w-25 mx-auto");
        imgElement.src = images;

        //Ablilites text
        const abilityText = document.createElement("p");
        abilityText.setAttribute("class", "text-center fw-bold");
        abilityText.textContent = "Abilities";
        const abilitiesElement = document.createElement("p");
        abilitiesElement.setAttribute("class", "text-center");
        abilitiesElement.textContent = abilityArr;

        //Display container, holds everything, most parent
        const displayDiv = document.querySelector(".display-pokemon");

        cardContainer.appendChild(pElement);
        cardContainer.appendChild(imgElement);
        cardContainer.appendChild(abilityText);
        cardContainer.appendChild(abilitiesElement);

        //Appeding all the child elements to the parent most div
        displayDiv.appendChild(cardContainer);
    }

    // console.log(pokemonResults);

    //Capitalize the first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

fetchPokemonName();