
let pokemonRepository = (function () {
    let modalContainer = document.querySelector('#modal-container');
    let repository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //function adds pokemon to list
    function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'detailsUrl' in pokemon
      ) {
        repository.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }

    //function creates button for pokemon list
    function addListItem(pokemon) {
      let pokeList = $('#pokemon-list');
      let listItem = $('<li></li>');
      let button = $('<button></button>');
      button.attr({ type: 'button', 'data-toggle': 'modal', 'data-target': '#modal' });
      button.text(pokemon.name);
      button.addClass('poke-button', 'btn', 'btn-primary');
      listItem.addClass('group-list-item');
      listItem.append(button);
      pokeList.append(listItem);
      button.addEventListener('click', function (event) {
        showDetails(pokemon);
      });
    }

    //function loads list from api
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
    }

    function getAll() {
      return repository;
    }

    //function to fetch details for each pokemon from api
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    //function shows pokemon name, height and image
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
      });
    }

    //Start Modal function
    function showModal(item) {
      let modalBody = $('modal-body');
      let modalTitle = $('modal-title');
      let modalHeader = $('modal-header');

      //let $modalContainer = $('#modal-container);
      //clear existing content of the modal//modalHeader.emtpy();
      modalTitle.empty();
      modalBody.empty();

      //creating element for name in modal content
      let titleElement = $('<h1>' + item.name + '</h1>');

      //creating img in modal content
      let imageElement = document.creatElement('img');
      imageElement.classList.add('modal-img');
      imageElement.src = pokemon.imageUrl;

      //creating element for height in modal content
      let heightElement = $('<p>' + 'height : ' + item.height + '</p>');

      //creating element for weight in modal content
      let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');

      //creating element for types in modal content
      let typesElement = $('<p>' + 'types : ' + item.types + '</p>');

      modalTitle.append(titleElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
    }

    //Using ESC key to exit out of modal
    //window.addEventListener('keydown', (e) => {
    //if (e.key === 'Escape' &&
    //modalContainer.classList.contains('is-visible')) {
    //hideModal();
    //}
    //});

    //CLosing modal by clicking outside the container
    //modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    //let target = e.target;
    //if (target === modalContainer) {
    //hideModal();
    //}
    //});

    //document.querySelector('#show-modal').addEventListener('click', () => {
    //showModal('Modal title', 'This is the modal content!');
    //});

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
    };
  })();

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
