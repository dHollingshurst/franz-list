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
        // .pokemon-list is the id of the ul
        let listElement = $('#pokemon-list');
        // creates li for the ul
        let listItem = $('<li></li>');
        listItem.addClass("list-group-item");
        //listItem.addClass("list-group-item-action")
        // creates a button and variable called button, and adds an event handler for the click event. handler prints name to log
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokeModal");
        $(button).addClass('pokemon-button');
        $(button).addClass('btn btn-primary col');
       
        //gives variable button a class so it can be uniquely manipulated in css
        button.classList.add('nameButton');
        // attaches button to each li
        listItem.append(button);
        // attachs the li to the ul. created elements need to be appended. 
        listElement.append(listItem);
        button.addEventListener('click', function(e) {
          showDetails(pokemon);
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
        item.weight = details.weight;
    }).catch(function (e) {
        console.error(e);
    });
  }

  function showDetails(pokemon) {
    // this is the function called by the button click event
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
   });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $('<img class="pokemon-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $('<p>' +'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
   

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
   
  }

  // search bar

    let searchInput = document.getElementById("search");
  // store name elements
    let pokemonFromDOM = document.getElementsByClassName("list-group-item");
  
  // listen for user event
    searchInput.addEventListener("keyup", (event) => {
      const {value} = event.target;
      // get user input converted to lower case
      const searchQuery = value.toLowerCase();

      for (const nameElement of pokemonFromDOM) {

        // store name and convert to lower case
        let name = nameElement.textContent.toLocaleLowerCase();
        
        // compare name to input
        if (name.includes(searchQuery)) {
          // if found, then display
          nameElement.style.display = "block";
        } else {
          // if not, then don't
          nameElement.style.display = "none";
        }
      }
    });



   return {
    /* the return portion of the IIFE is essential as it is what allows you to access the listed functions elsewhere in the code.  
    the below code takes this form becuase the key and value are the same in each. could be written add: add etc. */
     add,
     getAll,
     addListItem,
     loadList,
     showDetails,
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

function goToTop() {
  document.documentElement.scrollTop = 0;
};
