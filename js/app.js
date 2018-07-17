

let deck = document.querySelector(".deck");
let allCards = deck.querySelectorAll("li.card")
let tareMoves = 0;
let clockOff = true;
let matchedCards = 0;
const maxCardPairs = 8;


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
    matchedCards++;
    if (matchedCards === maxCardPairs) {
      gameOver();
    }
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

//toggle modal
function toggleModal() {
  let modal = document.querySelector(".modal_background");
  modal.classList.toggle("hide");
}
 //toggleModal();

//write results
function showModalResults(){
  let timeResult = document.querySelector(".modal_time");
  let clockTime = document.querySelector(".clock").innerHTML;
  let movesResults = document.querySelector(".modal_moves");
  let allMoves = document.querySelector(".moves").innerHTML;
  let starResult = document.querySelector(".modal_stars");
  let starNumber = getStars();

  timeResult.innerHTML = `Time = ${clockTime}`;
  movesResults.innerHTML = `Moves = ${allMoves}`;
  starResult.innerHTML = `Stars = ${starNumber}`;
}

//counting stars for modal
function getStars() {
  starNumber = document.querySelectorAll(".stars li");
  starCount = 0;
  for(star of starNumber){
    if (star.style.display != "none"){
      starCount++;
    }
  }
  return starCount;
}

//adding funtion to buttons
//cancel
document.querySelector(".modal_cancel").addEventListener("click", toggleModal);
//replay
document.querySelector(".modal_replay").addEventListener("click", replayGame);
//reset
document.querySelector(".restart").addEventListener("click", resetGame);


//reset game
function resetGame(){
  resetTime();
  resetMoves();
  resetStars();
  shuffleDeck();
  resetCards();
}

function resetTime() {
  stopClock();
  clockOff = true;
  clock.innerHTML = "0:00";
}

function resetMoves() {
  tareMoves = 0;
  document.querySelector(".moves").innerHTML = tareMoves;
}

function resetStars(){
  starCount = 0;
  let starList = document.querySelectorAll(".stars li");
  for (star of starList) {
    star.style.display = "inline";
  }
}

function replayGame(){
  resetGame();
  toggleModal();
}

//GAME OVER
function gameOver(){
  stopClock();
  showModalResults();
  toggleModal();
}

//resetCards
function resetCards() {
  let karten = document.querySelectorAll(".deck li");
  for (let karte of karten){
    karte.className = "card";
  }
}

//Big thanks to the great tutorial of Matthew Cranford - I drew lots of inspiration and mentorship from his blog! Lots of credit to him!!
