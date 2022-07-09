let playerListRepository = (function () {
  let playerList = [
    { name: 'Patrick Mahomes', salary: 9500, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Josh Allen', salary: 9800, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Jonathan Taylor', salary: 10000, position: ['Offense', 'RB', 'FLX', 'SFLX']},
    { name: 'New Orleans Saints', salary: 3500, position: ['Defense', 'DST']}
];
  
  function add(player) {
        playerList.push(player);
    }
  function getAll() {
        return playerList;
    }
    function addListItem(player) {
        let listElement = document.querySelector('.player-list');
        //console.log(listElement);
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.addEventListener('click', function() {
            showDetails(player);
        });
        button.innerText = player.name;
        console.log(button.innerText);
        button.classList.add('nameButton');
        listItem.appendChild(button);
        listElement.appendChild(listItem);
    }
    function showDetails(player) {
        console.log(player);
    }
  return {
    // the below code takes this form becuase the key and value are the same in each. add: add etc.
     add,
     getAll,
     addListItem
  };
})();

playerListRepository.add({name: 'Justin Jefferson', salary: 8800, position: ['Offense', 'WR', 'FLX', 'SFLX' ]});
playerListRepository.getAll().forEach(function(list) {
    //without this call below, list does not display
    playerListRepository.addListItem(list);
});
console.log(playerListRepository.getAll());