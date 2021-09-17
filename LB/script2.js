//choose the number of pokemons
const numberOfPokemons = 9;

//get the pokedex and searchbar element from DOM
const pokedex = document.getElementById("pokedex");
const search = document.getElementById("search__bar");

//get the card__wrapper so you can click on it
const cardWrapper = document.querySelector(".card__wrapper");

//save fetched pokemons to this array so you can use the searchbar
let pokemons = [];

//use this colors array so you can find the pokemon by its type, then change the color
const colors = {
  fire: "fire",
  grass: "grass",
  electric: "electric",
  water: "water",
  ground: "ground",
  rock: "rock",
  fairy: "fairy",
  poison: "poison",
  bug: "bug",
  dragon: "dragon",
  psychic: "psychic",
  flying: "flying",
  fighting: "fighting",
  normal: "normal ",
};

//get the keys from colors array
const mainTypes = Object.keys(colors);

//search bar functionality based on keyup event
search.addEventListener("keyup", (e) => {
  //check the typed value
  let searchStr = e.target.value.toLowerCase();
  //get all pokemons
  Promise.all(pokemons).then((results) => {
    //get the filtered value
    const pokemon = results.map((result) => ({
      id: result.id,
      name: result.name,
      types: result.types,
      hp: result.stats[0].base_stat,
      attack: result.stats[1].base_stat,
      defense: result.stats[2].base_stat,
      specialAttack: result.stats[3].base_stat,
      specialDefense: result.stats[4].base_stat,
      speed: result.stats[5].base_stat,
    }));
    const filteredStr = pokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchStr);
    });
    //display the filtered value
    displayPokemon(filteredStr);
  });
});

//fetching desired number of pokemons
const fetchPokemons = async () => {
  for (let i = 1; i <= numberOfPokemons; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    pokemons.push(fetch(url).then((res) => res.json()));
  }
  //get all pokemons
  Promise.all(pokemons).then((results) => {
    const pokemon = results.map((result) => ({
      id: result.id,
      name: result.name,
      types: result.types,
      hp: result.stats[0].base_stat,
      attack: result.stats[1].base_stat,
      defense: result.stats[2].base_stat,
      specialAttack: result.stats[3].base_stat,
      specialDefense: result.stats[4].base_stat,
      speed: result.stats[5].base_stat,
    }));
    //display pokemons
    displayPokemon(pokemon);
  });
};

fetchPokemons();

// displaying pokemons on screen
const displayPokemon = (pokemon) => {
  const htmlString = pokemon
    .map((pokemon) => {
      const id = pokemon.id;
      const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const hp = pokemon.hp;
      const attack = pokemon.attack;
      const defense = pokemon.defense;
      const specialAttack = pokemon.specialAttack;
      const specialDefense = pokemon.specialDefense;
      const speed = pokemon.speed;
      //fetch the types of pokemons
      const pokeTypes = pokemon.types.map((type) => type.type.name);
      //check if you can find a type within maintypes array
      const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
      //if so change the class name to whatever type you get
      const classEl = colors[type];

      return `
    <div class="scene">
        <div class="card__wrapper">
            <div class="pokemonCard__front ${classEl}--el">

                <p class="number--el">#${id.toString().padStart(3, "0")}</p>
                <h3>${name}</h3>

                <div class="img__container">
                <img src="${img}"></img>
                </div>

            </div>

            <div class="pokemonCard__back">
              <p>${name}</p>
              <h3>Pokemon stats : </h3>
              <p>HP: ${hp}</p>
              <p>type: ${type}</p>
              <div class="stats__container">
                <p>Attack: ${attack}</p>
                <p>Defence: ${defense}</p>
              </div>
              <div class="stats__container">
              <p>Special Attack: ${specialAttack}</p>
              <p>Special Defense: ${specialDefense}</p>
              </div>
              <p>Speed: ${speed}</p>
            </div>
        </div>
    </div>
`;
    })
    .join("");
  pokedex.innerHTML = htmlString;
};

//flipping card function

pokedex.addEventListener("click", (e) => {
  if (e.target.classList.contains("pokemonCard__front")) {
    e.target.parentElement.style.transform = "rotateY(180deg)";
  } else {
    e.target.parentElement.style.transform = "rotateY(0deg)";
  }
});
