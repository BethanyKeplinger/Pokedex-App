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
      let pokemonList = document.querySelector('.pokemon-list');
      let listpokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);

      //Add event listener to button
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
        item.imageUrl =
        details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    //function shows pokemon name, height and image
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item.name, 'Height: ' + item.height, item.imageUrl);
      });
    }

    //Start Modal function
    function showModal(title, text, imgSrc) {
      let modalContainer = document.querySelector('#modal-container');

      //Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      //Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let modalImg = document.createElement('img');
      modalImg.classList.add('modal-img');
      modalImg.src = imgSrc;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(modalImg);
      modalContainer.appendChild(modal);

      //makes modal visible
      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    //Using ESC key to exit out of modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' &&
      modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    //CLosing modal by clicking outside the container
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
