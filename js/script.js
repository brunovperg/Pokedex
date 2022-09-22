const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const RegExName = /\s/g  //RegEx for ignoring whitespaces on input
const input = document.querySelector('.input__search');
const type1 = document.querySelector('.type1')
const type2 = document.querySelector('.type2')
const icon1 = document.querySelector('.icon1')
const icon2 = document.querySelector('.icon2')
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'block';
  icon1.className = "icon1";
  icon2.className = "icon2";
  const data = await fetchPokemon(pokemon);
  
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    searchPokemon = data.id;
    if (data.id < 650){
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    else {
      //add static pictures while i`m searching for gifs api
      pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
    }
    type1Name = data["types"][0]["type"]["name"]
    type1.src = "./images/typesImg/"+type1Name+".svg"
    icon1.className += ` ${type1Name}`;
    if(data["types"][1]){
      type2.style.visibility = "visible";
      type2Name = data["types"][1]["type"]["name"]
      type2.src = "./images/typesImg/"+type2Name+".svg"
      icon2.className += ` ${type2Name}`;
    }
    else{
      type2.style.visibility = "hidden";
    }

  } else {
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  
  renderPokemon(input.value.toLowerCase().replace(RegExName, ''));  // IGNORE WHITESPACES

  input.value = '';
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);