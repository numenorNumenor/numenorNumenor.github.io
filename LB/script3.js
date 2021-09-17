//get the number of Pokemons
const numberOfPokemons = 150;

//get the pokedex from DOM
const pokedex = document.getElementById("pokedex");
//get the searchbar from DOM
const search = document.getElementById("search__bar");
//save pokemons to array
let pokemons = [];

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

//save the key values from colors object into const
const mainTypes = Object.keys(colors);

//functionality of searchbar
search.addEventListener("keyup", (e) => {
  const searchStr = e.target.value;

  console.log(pokemons);
});

//async function that fetches pokemons from API
const fetchPokemons = async () => {
  // run desired number of times
  for (let i = 1; i <= numberOfPokemons; i++) {
    //save the url to const
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    //fetch the data from API
    const res = await fetch(url);
    //save the pokemon to const
    pokemons.push(await res.json());
    //display pokemon
    displayPokemon(pokemons);
  }
};

fetchPokemons();

//Function displaying pokeomons
function displayPokemon(pokemon) {
  const cardWrapper = document.createElement("div");
  const pokemonCardFront = document.createElement("div");
  const pokemonCardBack = document.createElement("div");
  const pokemonCardFrontBg = document.createElement("div");

  cardWrapper.classList.add("card__wrapper");
  pokemonCardFront.classList.add("pokemonCard__front");
  pokemonCardBack.classList.add("pokemonCard__back");
  pokemonCardFrontBg.classList.add("pokemonCard__frontBg");

  const pokeTypes = pokemons.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[type];

  pokemonCardFront.style.background = `${color}`;

  const id = pokemons.id;
  const name = pokemons.name;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  pokemonCardFront.innerHTML = `

    <small>#${id.toString().padStart(3, "0")}</small>

    <div class="img__container">
      <img src="${img}"></img>
      <h3>${name}</h3>
    </div>

  `;

  pokedex.appendChild(cardWrapper);

  cardWrapper.appendChild(pokemonCardBack);

  cardWrapper.appendChild(pokemonCardFront);
}
