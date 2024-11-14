let displayValue = "";
let currentOperation = null;
let previousValue = "";

const display = document.getElementById("display");
const operationDisplay = document.getElementById("operation-display");

// Sons
let backgroundMusic = new Audio("https://lucaslins18.github.io/CalculadoraDaDelicia/audio/musica%20fundo.mp3"); // Música de fundo em loop
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1; // Som baixo

let operationSound = new Audio("https://lucaslins18.github.io/CalculadoraDaDelicia/audio/bot%C3%A3o.mp3"); // Som para operações (+ - * /)
let equalsSound = new Audio("https://lucaslins18.github.io/CalculadoraDaDelicia/audio/=.mp3"); // Som para "="

backgroundMusic.play(); // Iniciar música de fundo

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
  playOperationSound(); // Toca o som da operação
  displayValue = displayValue.toString().slice(0, -1);
  updateDisplay();
}

// Função para tocar o som da operação (+ - * /)
function playOperationSound() {
  operationSound.play();
}

// Função para tocar o som de "="
function playEqualsSound() {
  equalsSound.play();
}
