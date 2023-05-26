const errorContainer = document.querySelector(".error-msg");
const form = document.querySelector("#age-form");
const averageSpan = document.querySelector("#oldest-average");
const adultsCountSpan = document.querySelector("#adults-count");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  console.log("submitted");
  e.preventDefault();

  //Instancio un nuevo objeto FormData con la informacion del formulario
  const formData = new FormData(e.target);
  //Extraigo los valores del objeto formData
  //Object.fromEntries devuelve un objeto llave/valor
  //Object.values devuelve un array con los valores
  const formValues = Object.values(Object.fromEntries(formData));

  if (areInputsValid(formValues)) {
    const adultsCount = countAdults(formValues);
    const oldestAvg =
      formValues
        .sort((a, b) => b - a)
        .slice(0, -1)
        .reduce((acc, val) => Number(acc) + Number(val), 0) / 2;

    updateScreen(adultsCount, oldestAvg);
  } else {
    clearResult();
    throwErrorMsg("Valores invalidos", 2000);
  }
}

function areInputsValid(inputs) {
  return inputs.every((input) => input.length && !isNaN(input) && input > 0);
}

function countAdults(values) {
  let adultsCount = 0;
  for (const value of values) {
    value >= 18 && adultsCount++;
  }
  return adultsCount;
}

function updateScreen(adultsCount, oldestAvg) {
  averageSpan.textContent = oldestAvg;
  adultsCountSpan.textContent = adultsCount;
}

function throwErrorMsg(errorMsg, clearDelay = 1000) {
  //Si ya hay un error en pantalla no muestro un nuevo error
  if (errorContainer.textContent) return;

  errorContainer.textContent = errorMsg;
  errorContainer.classList.add("visible");
  //Limpio el error despues del delay definido
  setTimeout(clearErrors, clearDelay);
}

function clearResult() {
  averageSpan.textContent = "-";
  adultsCountSpan.textContent = "-";
}

function clearErrors() {
  errorContainer.classList.remove("visible");
  setTimeout(() => (errorContainer.textContent = ""), 500);
}
