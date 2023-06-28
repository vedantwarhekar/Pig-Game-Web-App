'use strict';

// selecting element
const player0El = document.querySelector('.player--0');
const palyer1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current0E2 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// satrting condition
const init = function () {
  scores = [0, 0];
  // current score for at starting
  currentScore = 0;
  // currently active palyer value
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current0E2.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  palyer1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  palyer1El.classList.remove('player--active');
};
init();

// funtion for swithing palyer
const switchPlayer = function () {
  // switch to next Player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // if it is available then it will remove and if not availbale then it will be added because of toggle method
  player0El.classList.toggle('player--active');
  palyer1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. genrating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.cheack for rolled
    if (dice !== 1) {
      // Add dice to Current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1 .add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //cheak if palyer's score is >=100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    // switch to next Player
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
