let playBtn = document.querySelector("#menus1");
let resetBtn = document.querySelector("#menus2");
let helpBtn = document.querySelector("#menus3");
const boxes = document.querySelectorAll(".box");
let board = document.querySelector('.board');
let helpBox = document.querySelector('.help')
let helpClose = document.querySelector('.help-close');
helpClose.addEventListener('click',()=>{
  helpBox.style.display = "none";
})
const match_details = document.querySelector(".match-details");
gameStart = true;
let gridArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winCheck;
const player = {
  1: "player 0", //because the turn gets changed as soon as the grid is clicked
  0: "player X",
};
let congratBox = document.querySelector(".congrats");
let turn = 0;
const writeOnNotice = (msg) =>{
  match_details.textContent = `${msg}`;
}
const help = () =>{
  document.querySelector('.help').style.display = "grid";
}
const start = () => {
  writeOnNotice("Game has started!")
  gameStart = true;
  eventsForBox();
  playBtn.classList.add("playFocus");
  winCheck = setInterval(win, 20);
  turn = 0;
};
writeOnNotice('Press P to start');
const congrats = () => {
  writeOnNotice("Press R/r to restart");
  board.style.cursor = "help";
  congratBox.style.display = "grid";
  congratBox.textContent = `🥳${player[turn]} has won🧨`;
  board.classList.add('darken');
  clearInterval(winCheck);
};
const reset = () => {
  if(board.classList.contains('darken')){
    board.classList.remove('darken')
  }
  turn = 0;
  boxes.forEach((elem) => {
    document.querySelector(`#${elem.id}-p`).textContent = "";
  });
  congratBox.style.display = "none";
  gridArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  congratBox.textContent = null;
  start();
};
const eventsForBox = () => {
  boxes.forEach((elem) => {
    elem.addEventListener(
      "click",
      () => {
        let currBox = document.querySelector(`#${elem.id}-p`);
        let boxNum = currBox.getAttribute("data-box-number");

        writeOnNotice(`Next turn ${player[turn]}`);
        console.log(turn, new Date());
        if (turn === 0) {
          turn = 1;
          currBox.textContent = "O";
          gridArr[boxNum - 1] = "O";
        } else if (turn === 1) {
          turn = 0;
          currBox.textContent = "X";
          gridArr[boxNum - 1] = "X";
        }
        console.log(turn, new Date());
      },
      { once: true }
    );
  });
};
function win() {
  if (gameStart) {
    if (gridArr[0] === gridArr[4] && gridArr[4] === gridArr[8]) {
      congrats();
    } else if (gridArr[2] === gridArr[4] && gridArr[4] === gridArr[6]) {
      congrats();
    } else {
      for (let i = 0; i <= 2; i++) {
        /*012 345 678 */
        /* 036 147 258*/
        if (
          gridArr[i] === gridArr[i + 3] &&
          gridArr[i + 3] === gridArr[i + 6]
        ) {
          congrats();
        }
      }
      for (let i = 0; i <= 6; i += 3) {
        if (
          gridArr[i] === gridArr[i + 1] &&
          gridArr[i + 1] === gridArr[i + 2]
        ) {
          congrats();
        }
      }
    }
  }
}
document.querySelector("body").addEventListener("keypress", function (e) {
  if (e.key === "p" || e.key === "P") {
    start();
  } else if (e.key === "r" || e.key ==="R") {
    reset();
  }
});
