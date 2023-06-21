// "Ingresar dos números. Si ambos son positivos, sumarlos y mostrar la suma. Caso contrario y si, además, ninguno es cero, mostrar la diferencia entre ambos."

// Selecciono el formulario del dom con la clase .numbers-form
const form = document.querySelector(".numbers-form");
form.addEventListener("submit", handleSubmit); //Agrego la escucha del evento submit

// Selecciono la seccion del dom con la clase .result
const resultEl = document.querySelector(".result");

function handleSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const { firstNumber, secondNumber } = Object.fromEntries(formData);
  console.log({ firstNumber, secondNumber });

  //valido por vacio
  if (!firstNumber || !secondNumber) {
    return console.log("campos vacios");
  }

  if (resultEl.hasChildNodes()) resultEl.innerHTML = "";

  //calculo el resultado solicitado en el enunciado
  const result = compute(parseFloat(firstNumber), parseFloat(secondNumber));

  //creo el h2 que contendra el resultado
  const h2 = document.createElement("h2");

  //actualizo el contenido del h2 dependiendo de lo retornado por la fn compute.
  if (result === null) {
    h2.textContent = "Uno o ambos numeros es 0, no hay resultados disponibles";
  } else {
    const [value, operator] = result; //desestructuro los valores retornados de compute
    h2.textContent = `${firstNumber} ${operator} ${secondNumber} = ${value}`;
  }

  //anexo el resultado al elemento del dom previamente seleccionado
  resultEl.append(h2);
  form.reset(""); // reinicio el formulario permitiendo al usuario cargar un nuevo par de numeros
  evt.target.elements.firstNumber.focus(); //Doy el foco al primer campo del formulario
}
// fn que recibe 2 numeros como parametros
function compute(firstNumber, secondNumber) {
  //Si ambos son positivos retorna su suma
  if (firstNumber > 0 && secondNumber > 0) {
    return [firstNumber + secondNumber, "+"];
  }
  if (firstNumber !== 0 && secondNumber !== 0) {
    //Si ninguno es 0 retora su diferencia
    return [firstNumber - secondNumber, "-"];
  }
  return null;
}
