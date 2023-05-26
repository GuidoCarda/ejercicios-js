// 4) Ingresar dos números. Si son iguales, mostrar el cuadrado del primero. Si el segundo
// es mayor que el primero, mostrar el cuadrado del segundo dividido el primero. Si el
// segundo es menor que el primero, mostrar el cubo del segundo menos el primero.  -->

const form = document.querySelector("form");
const firstInput = form.querySelector("#first-number");
const secondInput = form.querySelector("#second-number");

const resultSection = document.querySelector("section");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Si hay errores de un previo submit los limpio antes de re-validar
  clearErrors([firstInput, secondInput]);

  //Valido los imputs, almaceno el error si existe
  const errors = {
    firstInputError: validateInput(firstInput.value.trim()),
    secondInputError: validateInput(secondInput.value.trim()),
  };

  //Si existe un error, lo muestro en el campo correspondiente
  if (errors.firstInputError || errors.secondInputError) {
    resultSection.innerHTML = "";
    if (errors.firstInputError) {
      displayError(firstInput, errors.firstInputError);
    }
    if (errors.secondInputError) {
      displayError(secondInput, errors.secondInputError);
    }
    //Retorno para evitar calcular con datos invalidos
    return;
  } else {
    //Si no queda ningun error restante, limpio los errores en pantalla
    clearErrors([firstInput, secondInput]);
  }

  //Calculo el resultado y lo muestro en pantalla
  resultSection.innerHTML = getResult(
    firstInput.value.trim(),
    secondInput.value.trim()
  ).toFixed(2);
});

//Validar los valores ingresados. No nulos y numericos
function validateInput(input) {
  if (!input.length) {
    return "campo vacio";
  }
  if (isNaN(input)) {
    return "debe ser un numero";
  }
  return "";
}

//Calcular resultado, basado en enunciado del ejercicio
function getResult(firstValue, secondValue) {
  if (firstValue === secondValue) {
    return Math.pow(firstValue, 2);
  } else if (firstValue < secondValue) {
    return Math.pow(secondValue, 2) / firstValue;
  } else {
    return Math.pow(secondValue, 3) - firstValue;
  }
}

//Mostrar un error en pantalla
function displayError(input, errorMessage) {
  input.nextElementSibling.textContent = errorMessage;
  input.classList.add("error");
}

//Limpiar errores de los inputs
function clearErrors(inputs = []) {
  inputs.forEach((input) => {
    input.classList.remove("error");
    input.nextElementSibling.innerHTML = "";
  });
}
