const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById("search__bar");
const allPokemon = [];

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

const mainTypes = Object.keys(colors);

// choose the number of pokemons in the pokedex

const pokemonNumber = 2;

//get a pokemon and then run the display function

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  displayPokemon(pokemon);
  allPokemon.push(pokemon);
};

// fetch as much pokemons as const pokemonNumber dictates then run getPokemon function.

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonNumber; i++) {
    await getPokemon(i);
  }
};

// create elements that could display pokemons

function displayPokemon(pokemon) {
  const cardWrapper = document.createElement("div");
  const pokemonCardFront = document.createElement("div");
  const pokemonCardBack = document.createElement("div");
  const pokemonCardFrontBg = document.createElement("div");

  cardWrapper.classList.add("card__wrapper");
  pokemonCardFront.classList.add("pokemonCard__front");
  pokemonCardBack.classList.add("pokemonCard__back");
  pokemonCardFrontBg.classList.add("pokemonCard__frontBg");

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[type];

  pokemonCardFrontBg.style.borderLeft = `50rem solid ${color}`;

  const id = pokemon.id;
  const name = pokemon.name;
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

  pokemonCardFront.appendChild(pokemonCardFrontBg);
}

fetchPokemons();

// flips the card when clicked

pokedex.addEventListener("click", (e) => {
  if (e.target.classList.contains("pokemonCard__back")) {
    e.target.parentElement.style.transform = "rotateY(180deg)";
  }
  if (!e.target.classList.contains("pokemonCard__back")) {
    const cards = pokedex.querySelectorAll(".card__wrapper");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        card.style.transform = "rotateY(0deg)";
      });
    });
  }
});
