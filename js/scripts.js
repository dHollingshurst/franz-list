let playerList = [
    { name: 'Patrick Mahomes', salary: 9500, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Josh Allen', salary: 9800, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Jonathan Taylor', salary: 10000, position: ['Offense', 'RB', 'FLX', 'SFLX']},
    { name: 'New Orleans Saints', salary: 3500, position: ['Defense', 'DST']}
];

let text = "";
// the commented code below will remain for now as an example of another way to achieve the same end as the forEach()
/*let printPlayerList = (list) => {
  for (i = 0; i < list.length; i++ ) {
    if (list[i].salary > 9000) {
        document.write(`<br> ${list[i].name} ${text} (cost: ${list[i].salary}) - Whoa, that ${list[i].name} is expensive <br>`);
    }

    else {
        document.write(`<br> ${list[i].name} ${text} (cost: ${list[i].salary}) <br>`);
    }
  }
} */

function printPlayerList(list) {
    if (list.salary > 9000) {
        document.write(`<br> ${list.name} ${text} (cost: ${list.salary}) - Whoa, that ${list.name} is expensive <br>`);
    }
    else {
        document.write(`<br> ${list.name} ${text} (cost: ${list.salary}) <br>`);
    }
}
playerList.forEach(printPlayerList);
//printPlayerList(playerList);


