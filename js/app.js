//stopwatch by Ryan Waite


const StopWatch = function StopWatch() {
  const self = this;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let timer;
  let on = false;

  self.startTimer = function(callback) {
    if(on === true) { return; }
    on = true;
    timer = setInterval(function(){
      seconds++;
      if(seconds === 60) {
        seconds = 0;
        minutes++;
        if(minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      if(callback && callback.constructor === Function) {
        callback();
      }
    }, 1000);
    console.log('timer started');
  }

  self.stopTimer = function() {
    clearInterval(timer);
    on = false;
    console.log('timer ended: ', self.getTimeString());
  }

  self.resetTimer = function() {
    self.stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  self.getTimeString = function() {
    let hour = hours > 9 ? String(hours) : '0' + String(hours);
    let minute = minutes > 9 ? String(minutes) : '0' + String(minutes);
    let second = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let timeString = hour + ':' + minute + ':' + second;
    return timeString;
  }

  self.getHours = function() {
    return hours;
  }

  self.getMinutes = function() {
    return minutes;
  }

  self.getSeconds = function() {
    return seconds;
  }
}
let watch = new StopWatch();
watch.stopTimer(function() {
  console.log(watch.getTimeString());
})



let deck = document.querySelector(".deck");
let allCards = deck.querySelectorAll("li.card")


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
let tareMoves = 0;

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





//game over - win
// function winner(){
//   if(openCards.length === openCards.length){
//     alert("You won!");
//   }
// }


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
