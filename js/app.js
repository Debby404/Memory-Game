

let deck = document.querySelector(".deck");
let allCards = deck.querySelectorAll("li.card")
let tareMoves = 0;
let clockOff = true;


//shuffeling cards - input
function shuffleDeck(){
  let cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  let shuffledCards = shuffle(cardsToShuffle);
  for (cards of shuffledCards){
    deck.appendChild(cards);
  }
}
shuffleDeck();

//adds event listener when clicked
allCards.forEach(function(card){
  card.addEventListener("click", function(){
    if (clockOff) {
      startClock();
      clockOff = false;
    }
      if (!card.classList.contains("match") && openCards.length < 2 && !openCards.includes(card)) {
        toggle(card);
        storeCards(card);
          if (openCards.length === 2) {
            match(card);
            addMoves();
            checkMoves();
          }
      }
  })
})

//adds classes "open" and "show" when clicked
function toggle(card){
  card.classList.toggle("open");
  card.classList.toggle("show");
}

let openCards = [];

function storeCards(card){
  openCards.push(card);
}

//matching cards
function match(card){
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.toggle("match");
    openCards[1].classList.toggle("match");
    openCards = [];
  }else {
    setTimeout(function(){
      toggle(openCards[0]);
      toggle(openCards[1]);
      openCards = [];
    }, 1000);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//add Moves
//if two cards are clicked - add one move
//when two cards are clickd, matching or not it counts as one move - moves++


function addMoves(){
  tareMoves++;
  let countMoves = document.querySelector(".moves");
  countMoves.innerHTML = tareMoves;
}

//check Moves
function checkMoves(){
  if (tareMoves === 16 || tareMoves === 24) {
    stars();
  }
}


//remove one star after a certain number of clicks
function stars(){
  let starList = document.querySelectorAll(".stars li");
  for (star of starList){
    if (star.style.display != "none"){
        star.style.display = "none";
        break;
    }
 }}

//clock
let hours = 0;
let minutes = 0;
let seconds = 0;
let clock = document.querySelector(".clock");
let clockId;

function startClock(){
  clockId = setInterval(function(){
    clock.innerHTML = minutes + ":" + seconds + "";
    seconds++;
    if (seconds < 10) {
      clock.innerHTML = minutes + ":" + "0" + seconds;
    }
    else {
      clock.innerHTML = minutes + ":" + seconds;
    }
    if(seconds === 60){
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }

  }, 1000);
}

//stop clock
function stopClock(){
  clearInterval(clockId);
}




/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
