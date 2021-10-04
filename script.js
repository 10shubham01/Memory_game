let clickedCard = null;
let preventClick = false;
let combosfound = 0;
let click = 0;

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
var timeScore = 0;
var youWin = false;

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

input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && input.value.length > 3) {
        firstWindow.style.display = "none";
        gameWindow.style.display = "block";
        userName.innerText = input.value;

        // __________________________________________________________________________________________________________

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

        var timeleft = 80;
        var downloadTimer = setInterval(function() {
            if (timeleft <= 0 || youWin) {
                clearInterval(downloadTimer);
                timeScore = timeleft;
            }
            document.getElementById("time").innerText = timeleft;
            timeleft -= 1;
            if (timeleft < 3) {
                gameWindow.style.display = "none";
                timeUpwindow.style.display = "block";
                userName2.innerText = input.value;
                return;
            }
        }, 1000);

        /*-------------------------------------------------------------------------------------------------------------  */
    }
});

function ONCLICK(e) {
    if (
        preventClick ||
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
            preventClick = true;
            setTimeout(() => {
                clickedCard.classList.remove("done");
                clickedCard.classList.add("color-hidden");
                e.target.classList.remove("done");
                e.target.classList.add("color-hidden");
                clickedCard = null;
                preventClick = false;
            }, 500);
        } else {
            combosfound++;
            score.innerText = combosfound;
            clickedCard = null;
            if (combosfound === 8) {
                youWin = true;
                setTimeout(() => {
                    gameWindow.style.display = "none";
                    winWindow.style.display = "block";
                    winScore.innerText = calculateScore(combosfound, timeScore, click);
                }, 1500);
            }
        }
    }
}

function fun() {
    location.reload();
}

function calculateScore(m, t, c) {
    return m * 50 + t * 5 + (c - m) * 10;
}