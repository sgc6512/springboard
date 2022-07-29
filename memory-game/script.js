const gameContainer = document.getElementById("game");
const newGameBtn = document.querySelector("#newGame");
const resetBtn = document.querySelector("#reset");
const scoreKeeper = document.querySelector("#score");
let score;
const hiScore = document.querySelector("#highScore");
//If no high score exists create one at 20.
if(!localStorage.highScore) {
  localStorage.setItem("highScore", 20);
}
//Display hiscore
hiScore.innerText = "High Score: " + localStorage.highScore;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // Add new data attribute to see which cards have been matched
    newDiv.setAttribute("data-unmatched", "true");
    // Add new data attribute to tell cards from main div
    newDiv.setAttribute("data-card", "true");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
// Variable to keep track of the visible cards
let visibleCards = 0;
// Variable to keep track of the color of the cards on screen
let cardArray = [];
// Variable to keep track of previous card clicked
let previousCard;
// Variable to stop rapid clicking while waiting
let wait = false;

function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  let currentCard = event.target;

  //Should only be able to change at most two cards at a time.
  if(visibleCards < 2 && (previousCard != currentCard)) {

    //Change background color to be the color of the class
    event.target.style.backgroundColor = currentCard.className;

    //Store className in an array to see if they match
    cardArray[visibleCards] = currentCard.className;

    visibleCards++;
  }
  
  // Check to see if two cards have been clicked
  if(visibleCards == 2 && !wait) {
    wait = true;
    score++;
    scoreKeeper.innerText = "Score: " + score;

    // If the cards do not match, keep them visible for 1 second then reset.
    if(cardArray[0] != cardArray[1]) {
      // Loop over all unmatched cards and set their background color to blank, after 1 second
      setTimeout(function() {
        let cards = document.querySelectorAll('[data-unmatched="true"]');
        for(let card of cards) {
          card.style.backgroundColor = "";
        }
        // Set variables back to zero, inside here so we can't click more cards during the 1 second timer
        // I think that by putting the wait variable in these if statements and setting it to true as soon as the parent if goes off
        // it will force it to be able to go through this code block only 1 time until either the setTimeout time goes past
        // or in the case of a match it will be instant that we can click stuff again
        visibleCards = 0;
        cardArray = [];
        previousCard = '';
        wait = false;
      }, 1000)
    }
    else if (cardArray[0] === cardArray[1]){ //If the cards do match keep them visible and disable the event handlers on them
      // Also need to set unmatched to false
      currentCard.dataset.unmatched = false;
      previousCard.dataset.unmatched = false;
      
      // reset visibleCards here so that we avoid the timer bug
      visibleCards = 0;

      // Call to another function to remove the listeners because I don't know what removing them while they are in the function will do.
      removeListener(previousCard, currentCard);

      // reset card array
      cardArray = [];
      previousCard = '';
      wait = false;
    }
  }

  if(visibleCards == 1) {
    //Only store the previous card if we have already clicked a card once. Do not overwrite everytime we click, that causes problems
    previousCard = currentCard;
  }

  //If game is over log the scores
  let gameOver = true;
  let cards = document.querySelectorAll('[data-card="true"]');
  for(let card of cards) {
    if(card.dataset.unmatched === 'true') {
      gameOver = false;
    }
  }
  if(gameOver) {
    logScores();
  }
}

function removeListener(card1, card2) {
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
}

// when the DOM loads
// create new listener for new game button
newGameBtn.addEventListener("click", newGame);

function newGame() {
  // Clear old divs
  let cards = document.querySelectorAll('[data-card="true"]');
  for(let card of cards) {
    card.remove();
  }
  // Reshuffle
  shuffledColors = shuffle(COLORS)
  //Create new divs
  createDivsForColors(shuffledColors)
  //Set score to 0
  score = 0;
  scoreKeeper.innerText = "Score: " + score;
}

resetBtn.addEventListener("click", reset);

function reset() {
  let gameOver = true;
  let cards = document.querySelectorAll('[data-card="true"]');
  for(let card of cards) {
    if(card.dataset.unmatched === 'true') {
      gameOver = false;
    }
  }
  if(gameOver) {
    newGame();
  }
}

function logScores() {
  if(parseInt(localStorage.getItem("highScore")) > score) {
    localStorage.setItem("highScore", score);
  }
  hiScore.innerText = "High Score: " + localStorage.getItem("highScore");
}

/* */