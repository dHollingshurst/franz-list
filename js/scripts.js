/*IIFE employed. protects variables. to access pokemonList[], add(), getAll(), addListItem() etc., pokemonRepository
must first be envoked - see the add() and getAll().forEach() calls below  . see js functions pt 2 exercise 1.5 of full stack emersion.*/
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
    } else {
        console.log('pokemon is not correct');
    }
}
    
  function getAll() {
    // returns the list of pokemon and their details
        return pokemonList;
    }

  function addListItem(pokemon) {
        // .pokemon-list is the class of the ul
        let listElement = document.querySelector('.pokemon-list');
        // creates li for the ul
        let listItem = document.createElement('li');
        listItem.classList.add('.list-item')
        // creates a button and variable called button, and adds an event handler for the click event. handler prints name to log
        let button = document.createElement('button');
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        console.log(button.innerText);
        //gives variable button a class so it can be uniquely manipulated in css
        button.classList.add('nameButton');
        // attaches button to each li
        listItem.appendChild(button);
        // attachs the li to the ul. created elements need to be appended. 
        listElement.appendChild(listItem);
    }

  function showDetails(pokemon) {
        // this is the function called by the button click event
        loadDetails(pokemon).then( function() {

        // intrdoducing the modal to the 'click' event
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        /* add modal content: close button, title, inner text. 
        these wil be created, then appended to the modal element */
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-img')
        imageElement.src = pokemon.imageUrl;
        // append all newly created elements to the modal element
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        // append modal and its' children to modalContainer
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        function hideModal() {
          modalContainer.classList.remove('is-visible');
        }
        
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
          }
        });

        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });

        //document.querySelector('name-button')
      });
    }
  

  function loadList() {
    return fetch(apiUrl).then(function (response)
     {
        return response.json();
     }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
     }).catch(function (e) {
        console.error(e);
    })
   }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        // now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
  }

   return {
    /* the return portion of the IIFE is essential as it is what allows you to access the listed functions elsewhere in the code.  
    the below code takes this form becuase the key and value are the same in each. could be written add: add etc. */
     add,
     getAll,
     addListItem,
     loadList,
     loadDetails
  };
})();

// adding pokemon to test add(pokemon) - success
// pokemonRepository.add({});

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
    /*without this call below, list does not display. this forEach() is what runs through all the array objects and executes all of 
    the addListItem() on each object of the array - gives them a button, adds event, etc */
    pokemonRepository.addListItem(pokemon);
 });
});
