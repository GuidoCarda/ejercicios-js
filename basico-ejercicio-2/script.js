const CONVERTION_FORMULAS = {
  "celcius-farenheit": (celcius) => celcius * (9 / 5) + 32,
  "farenheit-celcius": (farenheit) => (farenheit - 32) * (5 / 9),
  "farenheit-kelvin": (farenheit) => (farenheit + 459.67) * (5 / 9),
  "kelvin-farenheit": (kelvin) => kelvin * (9 / 5) - 459.67,
  "celcius-kelvin": (celcius) => celcius + 273.15,
  "kelvin-celcius": (kelvin) => kelvin - 273.15,
  "romer-celcius": (romer) => (romer - 7.5) * (40 / 21),
  "celcius-romer": (celcius) => celcius * (21 / 40) + 7.5,
  "romer-farenheit": (romer) => (romer - 7.5) * (24 / 7) + 32,
  "farenheit-romer": (farenheit) => (farenheit - 32) * (7 / 24) + 7.5,
  "romer-kelvin": (romer) => (romer - 7.5) * (40 / 21) + 273.15,
  "kelvin-romer": (kelvin) => (kelvin - 273.15) * (21 / 40) + 7.5,
};

const temperatureInput = document.querySelector("#current-temperature");
const currentScale = document.querySelector("#current-scale-select");
const desiredScale = document.querySelector("#desired-scale-select");
const button = document.querySelector("button");
const currentValueElem = document.querySelector(".result-current-value");
const desiredValueElem = document.querySelector(".result-desired-value");

button.addEventListener("click", handleConvertion);

function handleConvertion() {
  if (!temperatureInput.value.length) {
    return alert("campo vacio");
  } else if (isNaN(temperatureInput.value)) {
    return alert("el valor ingresado no es un numero");
  } else if (currentScale.value === desiredScale.value) {
    return alert("Conversion invalida");
  }

  const temperature = parseInt(temperatureInput.value);

  const desiredConvertion = currentScale.value.concat("-", desiredScale.value);

  const convertionResult = CONVERTION_FORMULAS[desiredConvertion](temperature);

  currentValueElem.innerHTML =
    temperatureInput.value + currentScale.value.charAt(0);
  desiredValueElem.innerHTML =
    convertionResult.toFixed(2) + desiredScale.value.charAt(0);
}
