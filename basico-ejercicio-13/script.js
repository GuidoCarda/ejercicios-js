const form = document.querySelector("form");
const inputField = document.querySelector("input");
const resultSection = document.querySelector(".result");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  clearResult(resultSection);

  const value = inputField.value.trim();

  const isValid = validateInput(value);

  if (!isValid) {
    inputField.value = "";
    return;
  }

  const result = factorial(value);

  const resultString = `${value}! = ${result}`;
  printResult(resultSection, resultString);
}

function printResult(node, content) {
  const h2 = document.createElement("h2");
  h2.textContent = content;
  node.appendChild(h2);
}

function validateInput(value) {
  if (!value.length) {
    alert("campo vacio");
    return false;
  }
  if (isNaN(value)) {
    alert("el valor ingresado no es un numero");
    return false;
  }
  if (!Number.isInteger(Number(value))) {
    alert("el valor ingresado no es entero");
    return false;
  }
  return true;
}

function validateInput(newFactura) {
  if (newFactura.cliente < 0 || newFactura.cliente < 1278) {
    alert("campo vacio");

    return false;
  }
  if (isNaN(value)) {
    alert("el valor ingresado no es un numero");
    return false;
  }
  if (!Number.isInteger(Number(value))) {
    alert("el valor ingresado no es entero");
    return false;
  }
  return true;
}

//Recursiva
function factorial(number) {
  if (number <= 1) return 1;
  return number * factorial(number - 1);
}

// function factorial(number) {
//   let factorial = 1;
//   for (let i = number; i > 0; i--) {
//     factorial = factorial * i;
//   }
//   return factorial;
// }

function clearResult(node) {
  if (node.hasChildNodes()) {
    node.innerHTML = "";
  }
}
