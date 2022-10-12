'use strict';
const playerContainer = document.querySelector('.player-container');
const playerIcons = document.querySelectorAll('.player-icon');
const computerIcons = document.querySelectorAll('.computer-icon');
const playerChoice = document.querySelector('.player-choice');
const computerChoice = document.querySelector('.computer-choice');
const playerScoreEl = document.querySelector('.player-score');
const computerScoreEl = document.querySelector('.computer-score');
const resultContainerEL = document.querySelector('.result-container');
const resetBtn = document.querySelector('.reset-btn');

const choices = {
  rock: {name: 'Rock', defeats: ['scissors', 'lizard']},
  paper: {name: 'Paper', defeats: ['rock', 'spock']},
  scissors: {name: 'Scissors', defeats: ['paper', 'lizard']},
  lizard: {name: 'Lizard', defeats: ['paper', 'spock']},
  spock: {name: 'Spock', defeats: ['scissors', 'rock']},
};

let playerScore = 0;
let computerScore = 0;

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkResult = function (playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  const choicePlayer = choices[playerSelection];
  const choiceComputer = choices[computerSelection];

  if (choicePlayer.defeats.find(el => el === computerSelection)) {
    playerScore++;
    playerScoreEl.textContent = `${playerScore}`;
    resultContainerEL.textContent = 'You Won!';
  }

  if (playerSelection === computerSelection) {
    resultContainerEL.textContent = 'It\'s a tie!';
  }

  if (choiceComputer.defeats.find(el => el === playerSelection)) {
    computerScore++;
    computerScoreEl.textContent = `${computerScore}`;
    resultContainerEL.textContent = 'You Lost!';
  }
};

playerContainer.addEventListener('click', function (e) {
  // player selection
  const clickedSelection = e.target.closest('.player-icon');

  if (!clickedSelection) return;

  // setting color and name for player selection
  playerIcons.forEach((icon) => icon.classList.remove('color-black'));
  clickedSelection.classList.add('color-black');
  playerChoice.textContent = ` --- ${clickedSelection.dataset.choice}`;

  // computer selection
  const randomInt = getRandomInt(0, 4);
  const computerSelection = computerIcons[randomInt];

  // setting color and name for computer selection
  computerIcons.forEach((icon) => icon.classList.remove('color-black'));
  computerSelection.classList.add('color-black');
  computerChoice.textContent = ` --- ${computerSelection.dataset.choice}`;

  checkResult(clickedSelection.dataset.choice, computerSelection.dataset.choice);
});

resetBtn.addEventListener('click', function () {
  playerScore = 0;
  computerScore = 0;
  playerChoice.textContent = '';
  computerChoice.textContent = '';
  playerIcons.forEach((icon) => icon.classList.remove('color-black'));
  computerIcons.forEach((icon) => icon.classList.remove('color-black'));
  playerScoreEl.textContent = `${playerScore}`;
  computerScoreEl.textContent = `${computerScore}`;
  resultContainerEL.textContent = 'Let\'s Play!';
});
