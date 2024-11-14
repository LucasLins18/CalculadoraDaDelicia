let displayValue = "";
let currentOperation = null;
let previousValue = "";

const display = document.getElementById("display");
const operationDisplay = document.getElementById("operation-display");

// Sons
let backgroundMusic = new Audio("https://lucaslins18.github.io/CalculadoraDaDelicia/audio/musica%20fundo.mp3"); // Música de fundo em loop
backgroundMusic.loop = true; // Repetir música
backgroundMusic.volume = 0.1; // Som baixo

let operationSound = new Audio("audio/botão.mp3"); // Som para operações (+ - * /)
let equalsSound = new Audio("audio/=.mp3"); // Som para "="

let musicStarted = false; // Flag para garantir que a música é tocada após a interação

// Função para iniciar a música
function playBackgroundMusic() {
  if (!musicStarted) {
    backgroundMusic.play().catch((error) => {
      console.error("Erro ao tentar tocar a música:", error);
    });
    musicStarted = true;
  }
}

// Esperar interação do usuário
window.addEventListener('click', () => {
  playBackgroundMusic(); // Começar a música após interação do usuário
}, { once: true }); // Ouvinte dispara uma vez e depois é removido

// Função para atualizar o display
function updateDisplay() {
  display.value = displayValue;
  operationDisplay.textContent =
    previousValue && currentOperation
      ? `${previousValue} ${currentOperation}`
      : "";
}

// Função para adicionar números ao display
function appendNumber(number) {
  if (displayValue === "0" && number !== ".") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

// Função para definir a operação matemática
function setOperation(operation) {
  playOperationSound(); // Toca o som da operação
  if (displayValue === "" && operation === "-") {
    displayValue = "-";
    updateDisplay();
    return;
  }
  if (previousValue && currentOperation) {
    calculate();
  }
  currentOperation = operation;
  previousValue = displayValue;
  displayValue = "";
  updateDisplay();
}

// Função para realizar o cálculo
function calculate() {
  playEqualsSound(); // Toca o som do "="
  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(displayValue);

  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Erro" : prev / current;
      break;
    default:
      return;
  }

  displayValue = result.toString();
  currentOperation = null;
  previousValue = "";
  updateDisplay();
}

// Função para limpar o display
function clearDisplay() {
  playOperationSound(); // Toca o som da operação
  displayValue = "";
  previousValue = "";
  currentOperation = null;
  updateDisplay();
}

// Função para apagar o último caractere
function deleteLast() {
  playOperationSound()
