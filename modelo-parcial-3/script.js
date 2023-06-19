// Generar un número aleatorio entero entre 5 y 25. Luego solicitar que se ingresen de a una, a través de una caja de texto, tantas palabras como la cantidad que indica el número generado. Una vez finalizada la carga, para cada una de las palabras, mostrar la misma con un cartel para cada una que indica si es palíndromo o no y si tiene cantidad de letras par o impar. Al finalizar el listado mostrar el promedio de letras por palabra.

// Generar numero entre 5 y 25
// Almacenar las n palabras ingresadas por el usuario en base al n generado
// Al finalizar indicar
//   - Si es palindroma
//   - Si su cant de letras es par o impar
// Mostrar el promedio de letras por palabra

const MIN = 1; // numero minimo de palabras a generar
const MAX = 8; // numero maximo de palabras a generar
const palabras = []; // listado de palabras ingresadas por el usuario

const main = document.querySelector("main"); // nodo en el que se mostraran los resultados
const form = document.querySelector("form"); // form que captura los inputs del usuario
form.addEventListener("submit", handleSubmit);

// Numero de palabras aleatorio generado en base al MIN y MAX
const numeroPalabras = generarEnteroAleatorio(MIN, MAX);

//Mostrar cantidad de palabras a ingresar
const numeroSpan = document.createElement("span"); //Creo un span
numeroSpan.textContent = `${numeroPalabras} palabras restantes`; //Actualizo su contenido
main.append(numeroSpan); // Lo anexo a el nodo previamente seleccionado

let cantLetras = 0; // contador de letras para calcular el promedio

function handleSubmit(e) {
  e.preventDefault();
  //extraigo el valor del input, uso trim para eliminar espacios en blanco (prev y post)
  const palabra = e.target.elements.palabra.value.trim();

  //Valido por vacio
  if (!palabra) {
    return alert("campo vacio");
  }

  //Valido por numeros
  if (contieneNumeros(palabra)) {
    return alert("ingrese una palabra");
  }

  //En caso de no haber error, agrego la palabra al arreglo
  palabras.push(palabra);

  //Acumulo la cant de letras al total
  cantLetras += palabra.length;

  //Actualizo el nro de palabras restantes
  numeroSpan.textContent = `${
    numeroPalabras - palabras.length
  } palabras restantes`;
  form.reset(); // reinicio el formulario (limpia los campos)

  // Una vez se alcanza el numero aleatorio generado muestro los resultados
  if (palabras.length === numeroPalabras) {
    return mostrarResultado(palabras);
  }
}

function mostrarResultado(palabras) {
  main.innerHTML = ""; // Limpio el contenido de la pagina para mostrar los resultados

  const tituloListado = document.createElement("h2"); // genero el titulo
  tituloListado.textContent = "Palabras ingresadas:"; // actualizo el contenido del titulo

  const listadoPalabras = document.createElement("ul"); // genero la lista

  //recorro las palabras y genero un list item por cada palabra
  palabras.forEach((palabra) => {
    const li = document.createElement("li");

    li.textContent = `${palabra} ${
      esPalindromo(palabra) ? "es" : "no es"
    } palindromo, cant letras ${esPar(palabra.length) ? "par" : "impar"}`;
    listadoPalabras.appendChild(li);
  });

  //Calculo el promedio de letras por palabra
  const promLetrasPorPalabra = Math.round(cantLetras / numeroPalabras);

  //Genero el elemento
  const promEl = document.createElement("h2");
  promEl.textContent = `promedio de letras por palabra: ${promLetrasPorPalabra}`;

  //Genero el boton que recarga la pagina
  const botonReinicio = document.createElement("button");
  botonReinicio.textContent = "reiniciar";
  botonReinicio.onclick = () => window.location.reload(); // Recarga la pagina onclick
  botonReinicio.classList.add("btn-reinicio");

  //Anexo los elementos al DOM
  main.append(tituloListado, listadoPalabras, promEl, botonReinicio);
}

//Genera un entero aleatorio en rango
function generarEnteroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Retorna true si el numero es par
function esPar(numero) {
  return numero % 2 === 0;
}

//Retorna true si la cadena contiene numeros
function contieneNumeros(str) {
  return /\d/.test(str);
}

//Retorna true si la cadena es un palindromo ( se lee igual al revez )
function esPalindromo(str) {
  return str.toLowerCase() === str.split("").reverse().join("").toLowerCase();
}
