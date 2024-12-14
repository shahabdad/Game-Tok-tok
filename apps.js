let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = "";
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.classList.remove("winner-animation");
    box.disabled = false;
  });
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turn0) {
        box.innerText = "O";
        box.style.color = "green";
        turn0 = false;
      } else {
        box.innerText = "X";
        box.style.color = "red";
        turn0 = true;
      }
      box.disabled = true;
      checkWinner();
    }
  });
});
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};
const enableBoxes = () => {
  boxes.forEach((box) => (box.disabled = false));
};
const showWinner = (winner, winningPattern) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  // Add animation
  winningPattern.forEach((index) => {
    boxes[index].classList.add("winner-animation");
  });
  disableBoxes();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1, pattern);
      return;
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

