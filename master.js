const cards = document.querySelectorAll(".card");
const startGame = document.querySelector(".gameon");
let timer = 1;
let opend = 0;
let time = 500;
let right = 1;
let wrong = 1;
// enter name and remove overlay
startGame.addEventListener("click", () => {
  runOverlay();
  theTimer();
});
document.querySelector(".overlay-name input").focus();
window.addEventListener("keydown", () => {
  if (event.key === "Enter") {
    runOverlay();
    theTimer();
  }
});

// function run overlay
function runOverlay() {
  if (document.querySelector(".overlay-name input").value.trim() == "") {
    document.querySelector(".contant-space .name span").textContent = "Unkown";
    document.querySelector(".winner h1 span").textContent = "Unkown";
  } else {
    document.querySelector(".contant-space .name span").textContent = document.querySelector(".overlay-name input").value;
    document.querySelector(".winner h1 span").textContent = document.querySelector(".overlay-name input").value;
    document.querySelector(".contant-space .name span").classList.add("capitalize");
  }
  document.querySelector(".overlay-name").classList.add("removeme");
  setTimeout(() => {
    document.querySelector(".overlay-name").remove();
  }, 800);
}

function theTimer() {
  runTimer = setInterval(() => {
    // console.log(timer);
    let m = Math.floor(timer / 60);
    let s = timer % 60;
    timer++;
    if (timer < 60) {
      document.querySelector(".time span").innerHTML = `${s}s`;
    } else {
      document.querySelector(".time span").innerHTML = `${m}m ${s++}s `;
    }
  }, 1000);
}
//Make random array and random card with order
// make array of numbers
let range = [...Array(cards.length).keys()];
randomIt(range);
function randomIt(array) {
  // make vars
  var current = array.length,
    box,
    random;

  while (current > 0) {
    current--;
    random = Math.floor(Math.random() * current);
    // put current into box
    box = range[current];
    // range[curren] = random number
    range[current] = range[random];
    // box = range[current]
    range[random] = box;
  }
  return array;
}

let openOnes = [];
cards.forEach((card, index) => {
  finshing(card);
  card.style.order = range[index];
  // clicked card
  card.addEventListener("click", () => {
    finshing();
    card.classList.add("show");
    openOnes.push(card);

    if (openOnes.length === 2) {
      // if match
      document.querySelector(".container-cards").classList.add("diable");
      setTimeout(() => {
        document.querySelector(".container-cards").classList.remove("diable");
      }, time);

      if (openOnes[0].dataset.icon === openOnes[1].dataset.icon) {
        document.querySelector(".right span").innerHTML = right++;

        // -- wrong
        //   add match class on matched ones
        openOnes.forEach((open) => {
          open.classList.add("same");
        });
        openOnes = [];
        // if there are not matching
      } else {
        // -- wrong
        document.querySelector(".wrong span").innerHTML = wrong++;
        openOnes = [];
        setTimeout(() => {
          cards.forEach((card) => {
            card.classList.remove("show");
          });
        }, time);
      }
    }
  });
});

function finshing() {
  if (right === 10) {
    setTimeout(() => {
      if (wrong < 20) {
        document.querySelector(".winner h2").innerHTML = "Good";
        document.querySelector(".trophy i").className = "fa-solid fa-trophy";
      } else if (wrong < 26) {
        document.querySelector(".winner h2").innerHTML = "Okay";
        document.querySelector(".trophy i").className = "fa-solid fa-award";
      } else {
        document.querySelector(".winner h2").innerHTML = "Bad";
        document.querySelector(".trophy i").className = "fa-solid fa-medal";
      }
      document.querySelector(".winner").classList.add("finshed");
    }, 2000);
    setTimeout(() => {
      document.querySelector(".mright").innerHTML = right - 1;
      document.querySelector(".mwrong").innerHTML = wrong - 1;
    }, 1000);
  }
}

// reald

document.querySelector(".realad").addEventListener("click", () => {
  location.reload();
});
