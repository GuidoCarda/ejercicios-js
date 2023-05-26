const resultContainerElem = document.querySelector(".result");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isValidInput(input) {
  return input.length && !isNaN(input) && input > 2000 && input < 2100;
}

const input = prompt("Ingrese un año del siglo actual");

const resultTitle = document.createElement("h2");

if (isValidInput(input)) {
  const alertMessage = isLeapYear(input)
    ? " es año bisiesto"
    : " no es año bisiesto";

  resultTitle.textContent = input + alertMessage;
  resultTitle.classList.add(isLeapYear(input) ? "success" : "error");
} else {
  resultTitle.textContent = "El input ingresado no es valido";
  resultTitle.classList.add("error");
}

const button = document.createElement("button");
button.textContent = "Ingresar otro año";
button.onclick = () => window.location.reload();

resultContainerElem.append(resultTitle);
resultContainerElem.append(button);
