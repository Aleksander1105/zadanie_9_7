var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('Rock') });
pickPaper.addEventListener('click', function() { playerPick('Paper') });
pickScissors.addEventListener('click', function() { playerPick('Scissors') });

var gameState = 'notstarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

 var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');


function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints(); // This function has not been created yet
  } 
  if (!player.name) {
  	alert('Wrong data');
  	newGame();
  }

}

function getComputerPick() {
    var possiblePicks = ['Rock', 'Paper', 'Scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'Player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
        playerResultElem.innerHTML = "Draw!";
        computerResultElem.innerHTML = "Draw!";
    } else if (
        (computerPick == 'Rock' &&  playerPick == 'Scissors') ||
        (computerPick == 'Scissors' &&  playerPick == 'Paper') ||
        (computerPick == 'Paper' &&  playerPick == 'Rock')) {

        winnerIs = 'Computer';
    }

    if (winnerIs == 'Player') {
        playerResultElem.innerHTML = "WIN!";
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'Computer') {
        computerResultElem.innerHTML = "WIN!";
        computer.score++;
        setGamePoints();
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    checkRoundWinner(playerPick, computerPick);
    endGame();
}

 function setGamePoints() {
     playerPointsElem.innerHTML = player.score;
     computerPointsElem.innerHTML = computer.score;
 }

function endGame() {
    if (player.score === 10) {
        playerResultElem.innerHTML = "Gracz wygrywa!";
        alert('Gratulacje! Wygrałeś!');
        setTimeout(function(){
        	gameState = 'ended';
        	setGameElements();
        }, 0);

    } else if (computer.score === 10) {
        computerResultElem.innerHTML = "Komputer wygrywa!";
        alert('Przegrałeś :(');
        setTimeout(function(){
        	gameState = 'ended';
        	setGameElements();
        }, 0);
    }
}