//IIFE employed. protects variables
let playerListRepository = (function () {
  let playerList = [
    { name: 'Patrick Mahomes', salary: 9500, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Josh Allen', salary: 9800, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Jonathan Taylor', salary: 10000, position: ['Offense', 'RB', 'FLX', 'SFLX']},
    { name: 'New Orleans Saints', salary: 3500, position: ['Defense', 'DST']}
];
  
  function add(player) {
    //adds a new player to the list when executed. must pass name, salary, and positions as arguments
        playerList.push(player);
    }
  function getAll() {
    // returns the list of players and their details
        return playerList;
    }
    function addListItem(player) {
        // .player-list is the class of the ul
        let listElement = document.querySelector('.player-list');
        //console.log(listElement);
        // creates li for the ul
        let listItem = document.createElement('li');
        // creates a button and variable called button, and adds an event handler for the click event. handler prints name to log
        let button = document.createElement('button');
        button.addEventListener('click', function() {
            showDetails(player);
        });
        button.innerText = player.name;
        console.log(button.innerText);
        //gives variable button a class so it can be uniquely manipulated in css
        button.classList.add('nameButton');
        // attaches button to each li
        listItem.appendChild(button);
        // attachs the li to the ul. created elements need to be appended. 
        listElement.appendChild(listItem);
    }
    function showDetails(player) {
        // this is the function called by the button click event on lines 25-26
        console.log(player);
    }
   return {
    // the below code takes this form becuase the key and value are the same in each. could be written add: add etc. 
     add,
     getAll,
     addListItem
  };
})();
// adding player to test add(player) - success
playerListRepository.add({name: 'Justin Jefferson', salary: 8800, position: ['Offense', 'WR', 'FLX', 'SFLX' ]});

playerListRepository.getAll().forEach(function(player) {
    /*without this call below, list does not display. this forEach() is what runs through all the array objects and executes all of 
    the addListItem() on each object of the array - gives them a button, adds event, etc */
    playerListRepository.addListItem(player);
});
//console.log(playerListRepository.getAll());