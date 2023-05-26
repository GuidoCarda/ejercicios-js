// 3) Ingresando dos números enteros por teclado decir si son pares y la cantidad de
// enteros que hay entre ambos. (validar que los datos ingresados sean numéricos y
// enteros).
const isEven = (number) => number % 2 === 0;

const firstInput = document.querySelector("#first-number");
const secondInput = document.querySelector("#second-number");
const resultSection = document.querySelector("#result");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  const firstValue = firstInput.value.trim();
  const secondValue = secondInput.value.trim();

  if (!firstValue.length || !secondValue.length) {
    return alert("hay campos vacios");
  }

  if (isNaN(firstValue) || isNaN(secondValue)) {
    return alert("un valor ingresado no es un numero");
  }

  if (Number.isInteger(firstValue) || Number.isInteger(secondValue)) {
    return alert("un valor ingresado no es un entero");
  }

  const numberDiference =
    firstValue === secondValue ? 0 : Math.abs(firstValue - secondValue);

  const containerDiv = document.createElement("div");
  const firstResultElem = document.createElement("span");
  const secondResultElem = document.createElement("span");
  const diferenceResultElem = document.createElement("span");

  firstResultElem.innerHTML = `${firstValue} ${
    isEven(firstValue) ? "es par" : "no es par"
  }`;

  !isEven(firstValue) && firstResultElem.classList.add("notEven");

  secondResultElem.innerHTML = `${secondValue} ${
    isEven(secondValue) ? "es par" : "no es par"
  }`;

  !isEven(secondValue) && secondResultElem.classList.add("notEven");

  containerDiv.append(firstResultElem, secondResultElem);

  diferenceResultElem.innerHTML = `La cantidad de enteros entre ambos es de ${numberDiference}`;

  if (!resultSection.hasChildNodes()) {
    resultSection.append(containerDiv, diferenceResultElem);
  } else {
    resultSection.replaceChildren(containerDiv, diferenceResultElem);
  }
});
