let displayValue = "";
let currentOperation = null;
let previousValue = "";

const display = document.getElementById("display");
const operationDisplay = document.getElementById("operation-display");

// Sons
let backgroundMusic = new Audio("audio/musica_fundo.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1; // Som baixo
backgroundMusic.play(); // Iniciar música de fundo

let operationSound = new Audio("audio/botao.mp3"); // Som para operações (+ - * /)
let equalsSound = new Audio("audio/igual.mp3"); // Som para "="

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

// Função para limpar o visor
function clearDisplay() {
  displayValue = "";
  currentOperation = null;
  previousValue = "";
  updateDisplay();
}

// Função para apagar o último número
function deleteLast() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

// Funções para tocar os sons
function playOperationSound() {
  operationSound.play();
}

function playEqualsSound() {
  equalsSound.play();
}
