
let pokemonList = [
  { name: 'Jigglypuff', height: .5, type: ['fairy', 'normal'] },
  { name: 'Beedrill' , height: 1, type: ['bug', 'poison'] },
  { name: 'Slowpoke', height: 1.2, type: ['psychic', 'water'] }
];

for(let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
  document.write (
    pokemonList[i].name +
    ' (height:' +
    pokemonList[i].height +
    'm)-' +
    ' Wow, that\'s a big pokemon!'
  )
} else
  document.write(
  pokemonList[i].name +
  ' (height: ' +
  pokemonList[i].height +
  'm)'
  );
}
