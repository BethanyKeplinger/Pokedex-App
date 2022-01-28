let pokemonRepository= (function () {
const pokemonRepository = (() => {
let pokemonList = [
  { name: 'Jigglypuff',
    height: .5,
    type: ['fairy', 'normal']
  },

  { name: 'Beedrill' ,
    height: 1,
    type: ['bug', 'poison']
  },

  { name: 'Slowpoke',
    height: 1.2,
    type: ['psychic', 'water']
  }
];

return {
  add: function (pokemon) {
    pokemonList.push(pokemon);
  },
  getAll: function () {
    return pokemonList;
  }
};
})();

// for(let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 1) {
//   document.write (
//     pokemonList[i].name +
//     ' (height:' +
//     pokemonList[i].height +
//     'm)-' +
//     ' Wow, that\'s a big pokemon!' +
//     '<br>'
//   )
// } else
//   document.write(
//   pokemonList[i].name +
//   ' (height: ' +
//   pokemonList[i].height +
//   'm)'+
//   '<br>'
//   );
// }

pokemonRepository.getAll().forEach(function (pokemon) {
  console.log(pokemon.name + ' is ' + pokemon.height + ' meters tall ');
});
