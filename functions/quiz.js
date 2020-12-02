const body = document.querySelector("body");
const player = document.getElementById("player");
const name = document.querySelector(".name");
const id = document.querySelector(".id");
const sign = document.querySelector(".sign");
const game = document.getElementById("game");
const start = document.querySelector(".start");
const time = document.querySelector(".min");
const score = document.querySelector(".number");
const question = document.querySelector(".question");
const answer = document.querySelector(".input");
const submit = document.querySelector(".submit");
const skip = document.querySelector(".skip");
const tik = document.querySelector(".tik");
const cross = document.querySelector(".cross");
const details = document.getElementById("details");
const rank = document.getElementById("rank");
const dname = document.querySelector(".show_name");
const did = document.querySelector(".show_id");
const dscore = document.querySelector(".show_score");

var player_name = [],
  player_id = [],
  player_score = Array(10).fill(0),
  i = 0,
  sig = ["+", "-", "*", "/", "%"],
  j,
  k,
  s;

var store = () => {
  player_name[i] = name.value;
  player_id[i] = id.value;
  // console.log(player_name[i] + "    " + player_id[i]);
  i++;
  name.value = "";
  id.value = "";
};

var changeDisplay = () => {
  game.style.display = "inherit";
  player.style.display = "none";
};

var genQuestion = () => {
  j = Math.floor(Math.random() * 21);
  k = Math.floor(Math.random() * 21);
  s = Math.floor(Math.random() * 5);
  // console.log(j, k, s);
  switch (sig[s]) {
    case "+":
      // console.log("plus");
      ans = parseInt(j + k);
      changeText(j, k, sig[s]);
      break;
    case "-":
      // console.log("minus");
      ans = parseInt(j - k);
      changeText(j, k, sig[s]);
      break;
    case "*":
      // console.log("mul");
      ans = parseInt(j * k);
      changeText(j, k, sig[s]);
      break;
    case "/":
      // console.log("div");
      ans = parseInt(j / k);
      changeText(j, k, sig[s]);
      break;
    case "%":
      // console.log("mod");
      ans = parseInt(j % k);
      changeText(j, k, sig[s]);
      break;
  }
};

var changeText = (n1, n2, si) => {
  question.textContent = `${n1} ${si} ${n2} = ?`;
};

var endGame = () => {
  // console.log("timeout");
  submit.setAttribute("disabled", "true");
  skip.setAttribute("disabled", "true");
};

var displayScore = () => {
  game.style.display = "none";
  details.style.display = "inherit";
  dname.textContent = `Player name : ${player_name[i - 1]}`;
  did.textContent = `Player ID : ${player_id[i - 1]}`;
  dscore.textContent = `Player score : ${player_score[i - 1]}`;
};

var init = () => {
  start.removeAttribute("disabled");
  // submit.removeAttribute('disabled')
};

var checkAns = () => {
  if (parseInt(answer.value) === ans) {
    player_score[i - 1] += 1;
    // console.log(player_score);
    tik.style.display = "inherit";
    setTimeout(() => {
      tik.style.display = "none";
    }, 500);
  } else {
    cross.style.display = "inherit";
    setTimeout(() => {
      cross.style.display = "none";
    }, 500);
  }
};

var clearInput = () => {
  answer.value = "";
};

body.addEventListener("click", (e) => {
  if (e.target.closest(".sign")) {
    if (name.value != "" && id.value != "") {
      store();
      changeDisplay();
    }
  }
  if (e.target.closest(".start")) {
    // console.log("start");
    start.setAttribute("disabled", "true");
    submit.removeAttribute("disabled");
    skip.removeAttribute("disabled");
    genQuestion();
    setTimeout(() => {
      endGame();
      displayScore();
      clearInput();
      init();
    }, 10000);
    answer.focus();
  }
  if (e.target.closest(".submit")) {
    if (answer.value != "") {
      checkAns();
      setTimeout(() => {
        genQuestion();
      }, 500);
      clearInput();
    }
  }
  if (e.target.closest(".skip")) {
    genQuestion();
  }
  if (e.target.closest(".continue")) {
    details.style.display = "none";
    player.style.display = "inherit";
    question.textContent = ``;
  }
  if (e.target.closest(".end")) {
    details.style.display = "none";
    rank.style.display = "inherit";
  }
});

body.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.closest(".name")) {
      if (name.value != "") {
        id.focus();
      }
    } else if (e.target.closest(".id")) {
      if (id.value != "") {
        store();
        changeDisplay();
      }
    } else if (e.target.closest(".input")) {
      if (answer.value != "") {
        checkAns();
        setTimeout(() => {
          genQuestion();
        }, 500);
        clearInput();
      }
    }
  }
});
