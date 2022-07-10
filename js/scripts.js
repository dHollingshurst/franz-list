/*IIFE employed. protects variables. to access pokemonList[], add(), getAll(), or addListItem(), pokemonListRepository
must first be envoked - see the add() and getAll().forEach() calls below  . see js functions pt 2 exercise 1.5 of full stack emersion.*/
let pokemonListRepository = (function () {
  let pokemonList = [
    { name: 'Patrick Mahomes', salary: 9500, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Josh Allen', salary: 9800, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Jonathan Taylor', salary: 10000, position: ['Offense', 'RB', 'FLX', 'SFLX']},
    { name: 'New Orleans Saints', salary: 3500, position: ['Defense', 'DST']}
   ];
  
  function add(pokemon) {
    //adds a new pokemon to the list when executed. must pass name, salary, and positions as arguments
        pokemonList.push(pokemon);
    }

  function getAll() {
    // returns the list of pokemon and their details
        return pokemonList;
    }

  function addListItem(pokemon) {
        // .pokemon-list is the class of the ul
        let listElement = document.querySelector('.pokemon-list');
        //console.log(listElement);
        // creates li for the ul
        let listItem = document.createElement('li');
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
        console.log(pokemon);
    }
   return {
    /* the return portion of the IIFE is essential as it is what allows you to access the listed functions elsewhere in the code.  
    the below code takes this form becuase the key and value are the same in each. could be written add: add etc. */
     add,
     getAll,
     addListItem
  };
})();

// adding pokemon to test add(pokemon) - success
pokemonListRepository.add({name: 'Justin Jefferson', salary: 8800, position: ['Offense', 'WR', 'FLX', 'SFLX' ]});

pokemonListRepository.getAll().forEach(function(pokemon) {
    /*without this call below, list does not display. this forEach() is what runs through all the array objects and executes all of 
    the addListItem() on each object of the array - gives them a button, adds event, etc */
    pokemonListRepository.addListItem(pokemon);
});

//console.log(pokemonListRepository.getAll());