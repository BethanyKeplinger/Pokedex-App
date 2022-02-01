const pokemonRepository = (() => {
  let repository = [
  {
    name: 'Jigglypuff',
    height: .5,
    type: ['fairy', 'normal'],
  },

  {
    name: 'Beedrill',
    height: 1,
    type: ['bug', 'poison'],
  },

  {
    name: 'Slowpoke',
    height: 1.2,
    type: ['psychic', 'water'],
  },
];

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    //adding eventhandler to button to show pokemon
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    //add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
