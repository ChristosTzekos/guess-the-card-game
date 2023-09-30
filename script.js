'use strict;';

const delay = (millis) =>
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });

//Selecting Elements
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');

const player0El = document.querySelector('.name0');
const player1El = document.querySelector('.name1');

const todo0 = document.querySelector('.todo0');
const todo1 = document.querySelector('.todo1');

const matchNote = document.querySelector('.match-note');

const btnStart = document.querySelector('.btn-start');
const btnNewGame = document.querySelector('.btn-new-game');

const card0El = document.getElementById('card-0');
const card1El = document.getElementById('card-1');
const cardEl = document.querySelector('.card');

let cardSound = document.querySelector('#card-sound');
let winSound = document.querySelector('#win-sound');

//Starting conditions
const init = function () {
  score = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  score0El.classList.remove('score-winner');
  score1El.classList.remove('score-winner');

  matchNote.classList.add('hidden');
  cardEl.classList.add('hidden');

  btnStart.classList.remove('hidden');
  btnNewGame.classList.add('hidden');

  const arr = Array.from({ length: 52 }, (_, i) => i + 1);
};
init();
/*
  This is a 10 rounds game.
  The "score" array keeps track of the current score.
*/
/*
  Generates a random number from 1 to 52.
  Each number represends a specific card e.g.:
  1-> ace of clubs, 2-> ace of diamonds
  3-> ace of hearts, 4-> ace of spades
  5-> 2 of clubs, 6-> 2 of diamonds etc.
  Every time that a card is generated it is removed from the cards array called arr.
  The while loop in the cardGenerator function is checking if the generated
  number still exists in the array arr.
  The cardGenerator function displays the generated card image on screen
*/
function cardGenerator() {
  let card = Math.trunc(Math.random() * 52) + 1;

  while (!arr.includes(card)) {
    card = Math.trunc(Math.random() * 52) + 1;
  }

  cardEl.src = `cards/${card}.png`;
  cardSound.play();

  return card;
}

/*
  Every time that the button "Start" is clicked
  the arr is refreshed in order to contain every card.
  When the button is clicked and the players have chose different cards
  this function calls the cardGenerator function until the generated number
  matches one of the guesses.
  When the generated card matches one of the guesses, the playerWin function is called.

*/
btnStart.addEventListener('click', async function () {
  guess0 = card0El.value;
  guess1 = card1El.value;
  matchNote.classList.add('hidden');
  if (guess0 == guess1) {
    //Players need to pick different cards.
    cardEl.classList.add('hidden');
    matchNote.classList.remove('hidden');
    matchNote.textContent = 'Pick different cards!';
  } else {
    btnStart.classList.add('hidden');
    cardEl.classList.remove('hidden');
    score0El.classList.remove('score-winner');
    score1El.classList.remove('score-winner');
    guessedNumber = 53;
    actualNumber = 0;

    arr = Array.from({ length: 52 }, (_, i) => i + 1);

    //card generating until a player win

    while (actualNumber != guess0 && actualNumber != guess1) {
      guessedNumber = cardGenerator();
      await delay(1000);
      actualNumber = Math.ceil(guessedNumber / 4);

      let index = arr.indexOf(guessedNumber);
      arr.splice(index, 1);
    }

    playerWin(actualNumber == guess0 ? 0 : 1);
  }
});

/*
  When a player wins a round his score is increased by 1 in the "score" array.
  playerWin function checks if any of the players have achieved the score of 10
  when the game ends and the matchWon function is called
*/
function playerWin(winner) {
  btnStart.classList.remove('hidden');
  scoreWinnerEl = document.getElementById(`score-${winner}`);
  scoreWinnerEl.classList.add('score-winner');
  scoreWinnerEl.textContent = score[winner];
  winSound.play();

  score[winner] = Number(score[winner]) + 1;

  if (score[winner] == 10) {
    matchWon(winner);
  }
}

/*
  matchWon function displays the winner
  and reveals the "New Game" button.
*/
function matchWon(winner) {
  btnStart.classList.add('hidden');
  cardEl.classList.add('hidden');
  btnNewGame.classList.remove('hidden');
  matchNote.classList.remove('hidden');
  matchNote.textContent = `Player${winner + 1} wins the Game!`;
}

/*
  The "New Game" button reestablish the starting conditions 
  by calling the init function.
*/
btnNewGame.addEventListener('click', function () {
  init();
});
