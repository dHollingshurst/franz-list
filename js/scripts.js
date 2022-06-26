let playerList = [
    { name: 'Patrick Mahomes', salary: 9500, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Josh Allen', salary: 9800, position: ['Offense', 'QB', 'SFLX']},
    { name: 'Jonathan Taylor', salary: 10000, position: ['Offense', 'RB', 'FLX', 'SFLX']},
    { name: 'New Orleans Saints', salary: 3500, position: ['Defense', 'DST']}
];
/*document.write(playerList[1].name);
if (playerList) {
    console.log('yeah');
}
if (playerList[1].salary < playerList[2].salary) {
    document.write(`${playerList[0].name} is less expensive than ${playerList[1].name}`);
}*/
let text = "";
let newLine = '/ln';
for (i = 0; i < playerList.length; i++ ) {
    if (playerList[i].salary > 9000) {
        document.write(`<br> ${playerList[i].name} ${text} (cost: ${playerList[i].salary}) - Whoa, that ${playerList[i].name} is expensive <br>`);
    }

    else {
        document.write(`<br> ${playerList[i].name} ${text} (cost: ${playerList[i].salary}) <br>`);
    }
}
