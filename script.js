var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('Rock') });
pickPaper.addEventListener('click', function() { playerPick('Paper') });
pickScissors.addEventListener('click', function() { playerPick('Scissors') });

var gameState = 'Notstarted',  //started // ended
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
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); // This function has not been created yet
  }

}

function playerPick(playerPick) {
    console.log(playerPick);
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
    computerPickElem.innerHTML = computerPick;
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
        playerPointsElem.innerHTML = player.score;
    } else if (winnerIs == 'Computer') {
        computerResultElem.innerHTML = "WIN!";
        computer.score++;
        computerPointsElem.innerHTML = computer.score;
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    endGame();
}

 function setGamePoints() {
     playerPointsElem.innerHTML = player.score;
 }

function endGame() {
    if (player.score == 10) {
        playerResultElem.innerHTML = "Gracz wygrywa!";
        alert('Gratulacje! Wygrałeś!');
        gameState = 'ended';
        setGameElements();

    } else if (computer.score == 10) {
        computerResultElem.innerHTML = "Komputer wygrywa!";
        alert('Przegrałeś :(');
        gameState = 'ended';
        setGameElements();
    }
}