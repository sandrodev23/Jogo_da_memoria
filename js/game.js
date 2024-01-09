//pega o grid
const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const playVenceu = document.querySelector(".area-vitoria");
const confirma = document.querySelector(".confirma");
const reiniciar = document.querySelector(".voltar");

const level = () => {
  window.location = "../pages/game2.html";
};
confirma.addEventListener("submit", level);
// array das imagens
const characters = [
  "Capitao America",
  "Doutor Estranho",
  "Falcon",

  "Homem Arranha",
  "Homem de Ferro",
  "Hulk",
  "Pantera negra",

  "Thor",
  "Thanos",
  "Visao",
];
// cria os elemtentos
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};
const playerVencedor = () => {
  playVenceu.style.display = "flex";
};
let firstCard = "";
let secondCard = "";
// verefica se todas as cartas ja foram viradas
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  if (disabledCards.length == 20) {
    clearInterval(this.loop);
    playerVencedor();
    level();
  }
};
// chega se as cartas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");
  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};
//chega se as cartas estão vazias
const revelCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }
  if (firstCard == "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard == "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};
// cria as divs com as classes
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../img/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revelCard);
  card.setAttribute("data-character", character);
  return card;
};
// função que carrega o jogo
const loadGame = () => {
  const duplicateCharacter = [...characters, ...characters];

  const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML;
    timer.innerHTML = currentTimer + 1;
  }, 1000);
};

window.onload = () => {
  const playerName = localStorage.getItem("play");
  spanPlayer.innerHTML = playerName;
  startTimer();
  loadGame();
};
