const cards = document.querySelectorAll(".card");
const count = document.getElementById("click");
const score = document.getElementById("score");
const time = document.getElementById("time");
const c = document.getElementById("c");
const input = document.getElementById("nameInput");
const firstWindow = document.getElementById("fWindow");
const gameWindow = document.getElementById("game-window");
const winWindow = document.getElementById("winWindow");
const timeUpwindow = document.getElementById("timeUpwindow");
const userName2 = document.getElementById("userName2");
const userName = document.getElementById("userName");
const winScore = document.querySelector(".win-score");
const timeUpScore = document.querySelector(".timeUp-score");
const start = document.querySelector(".start-button");
let value = "";
var starScore = 0;
let clickedCard = null;
let dontClick = false;
let matchFound = 0;
let click = 0;
var timeScore = 0;
var youWin = false;
var timeUp = false;
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
  "purple",
  "teal",
  "yellow",
  "teal",
  "yellow",
  "pink",
  "pink",
];
/*--------------------------------------------------shuffle Function-------------------------------------------------- */
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
/* ----------------------------------------------------------------------------------------------------------------------- */

start.addEventListener("mouseover", () => {
  if (value.length <= 5) {
    if (start.className.includes("move-left")) {
      start.classList.add("move-right");
      start.classList.remove("move-left");
    } else {
      start.classList.add("move-left");
      start.classList.remove("move-right");
    }
  }
});
/* ------------------------------------------------------When a user enter his name and press enter------------------------------------------------------------------------- */
function getUserName() {
  value = document.querySelector("input").value;
  if (value.length <= 5 && value.length) {
    document.querySelector("input").style.outlineColor = "red";
  } else {
    document.querySelector("input").style.outlineColor = "blue";
  }
}

var inputValue = sanitize(input.value);
startGame = () => {
  firstWindow.style.display = "none";
  gameWindow.style.display = "block";
  userName.innerText = inputValue;

  /* -----------------------------------------------Creating elements using suffle function------------------------------------------- */
  shuffle(COLORS).forEach((color, i) => {
    var newDiv = document.createElement("div");
    newDiv.style.backgroundColor = color;
    newDiv.setAttribute("data-color", color);
    newDiv.className = "card color-hidden";
    setTimeout(() => {
      newDiv.classList.add("animate");
    }, i * 100);
    c.appendChild(newDiv);
    newDiv.addEventListener("click", ONCLICK);
  });
  /* -------------------------------------------------------Creating countdown of 90 sec----------------------------------------------------------------- */
  var timeleft = 90;
  var Timer = setInterval(function () {
    /* If time up or user win , Store the time left in time score for total score calcultion */
    if (timeleft <= 0 || youWin || timeUp) {
      clearInterval(Timer);
      timeScore = timeleft;
    }
    document.getElementById("time").innerText = timeleft;
    timeleft -= 1;
    /* if time up hide game window and display timeup window with calculated score*/
    if (timeleft < 0) {
      timeUp = true;
      gameWindow.style.display = "none";
      timeUpwindow.style.display = "block";
      userName2.innerText = inputValue;
      timeUpScore.innerText = calculateScore(matchFound, timeScore, click);
      starScore = parseInt(timeUpScore.innerText);
      /* If the score is above 100 and time up then give 1 star else no stars */
      if (starScore > 100) {
        document.querySelector(".four").classList.add("checked");
      }
      return;
    }
  }, 1000);

  /*-------------------------------------------------------------------------------------------------------------------------------------------  */
};

/* ------------------------------------------------------Whne user click on card ONCLICK function will fire__________________________________________ */
function ONCLICK(e) {
  if (
    dontClick ||
    e.target === clickedCard ||
    e.target.className.includes("done")
  ) {
    return;
  }
  c.style.backgroundColor = e.target.style.backgroundColor;
  e.target.classList.add("done");
  e.target.classList.remove("color-hidden");
  click++;
  count.innerText = click;

  if (!clickedCard) {
    clickedCard = e.target;
  } else if (clickedCard) {
    if (
      clickedCard.getAttribute("data-color") !==
      e.target.getAttribute("data-color")
    ) {
      dontClick = true;
      setTimeout(() => {
        clickedCard.classList.remove("done");
        clickedCard.classList.add("color-hidden");
        e.target.classList.remove("done");
        e.target.classList.add("color-hidden");
        clickedCard = null;
        dontClick = false;
      }, 500);
    } else {
      matchFound++;
      score.innerText = matchFound;
      clickedCard = null;
      if (matchFound === 8 || timeUp) {
        youWin = true;
        setTimeout(() => {
          gameWindow.style.display = "none";
          winWindow.style.display = "block";
          winScore.innerText = calculateScore(matchFound, timeScore, click);
          starScore = parseInt(winScore.innerText);
          /* If the score is above 600 then give 3 stars else two (this is only when user win) */
          if (starScore > 600) {
            document.querySelector(".one").classList.add("checked");
            document.querySelector(".two").classList.add("checked");
            document.querySelector(".three").classList.add("checked");
          } else {
            document.querySelector(".one").classList.add("checked");
            document.querySelector(".two").classList.add("checked");
          }
        }, 1500);
      }
    }
  }
}
/* this function fire when user click on replay button */
function fun() {
  location.reload();
}
/* ------------------------------------------------------- */
/* This function is for calculating the score */
function calculateScore(m, t, c) {
  //m= Pair of matched card
  // t= Timeleft befor user win (extra time)
  // c= no of clicks, (c-m)= no of clicks when card doesnt match
  return m * 50 + t * 5 - (c / 2 - m) * 5;
}
/*-------------------------------------- Function that Sanitize the input--------------------------- */
function sanitize(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}
