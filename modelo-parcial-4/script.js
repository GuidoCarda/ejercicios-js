// Enunciado a desarrollar en HTML, CSS y Javascript: Cargar 30 palabras
// mediante un formulario con caja de texto. La carga se deberá inhabilitar
// cuando se hayan ingresado las 30 palabras. En ese momento se deberá
// emitir un informe con los siguientes datos:
// - Promedio de cantidad de letras por palabra.
// - En qué orden fue cargada la palabra más larga.
// - La última palabra en sentido inverso

const WORDS_LIMIT = 5; // limite de palabras para almacenar
const words = []; //arreglo vacio para almacenar palabras
let lettersCount = 0;
let longestWordIndex = 0; // Guardar el indice de la palabra mas larga, la primera por defecto

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  // extraigo valor input, uso trim para eliminar espacios en blanco ant y post
  const word = e.currentTarget?.elements?.word?.value?.trim();

  //Valido por vacio
  if (!word) {
    return alert("campo vacio");
  }
  //Valido por presencia de numeros o signos de puntuacion/otros caracteres
  if (!isValidWord(word)) {
    return alert("Valor invalido, solo palabras, no signos ni numeros");
  }

  words.push(word); // agrego la palabra a la lista.
  lettersCount += word.length; // acumulo el total de letras

  form.reset(); // reinicio el formulario para cargar una nueva palabra

  //Si el largo de la palabra ingresada es mayor al de la registrada como mas larga
  if (word.length > words[longestWordIndex].length) {
    longestWordIndex = words.length - 1; // actualizo el indice al actual
  }

  if (words.length === WORDS_LIMIT) {
    const result = {
      words,
      lettersAverage: Math.round(lettersCount / words.length),
      longestWordIndex,
    };

    printResult(result); // muestro los resultados por pantalla.
  }
}

function printResult(result) {
  const { words, lettersAverage, longestWordIndex } = result;

  // genero un string de list items
  const wordsListContent = words
    .map((word, idx) => `<li>Palabra ${idx + 1} ${word}</li>`)
    .join("");

  // const wordsListEl = document.createElement("ul");
  // words.forEach((word, idx) => {
  //   const li = document.createElement("li");
  //   li.textContent = `Palabra ${idx + 1} ${word}`;
  //   wordsListEl.appendChild(li);
  // });
  // document.body.append(wordsListEl);

  //actualizo el contenido del documento.
  document.body.innerHTML = `
    <section class='result'>
      <h1>resultados</h1>
      <ul>
        ${wordsListContent}
      </ul>
      <h2>Promedio de letras por palabra ${lettersAverage}</h2>
      <h2>La palabra mas larga se encuentra en la posicion ${
        longestWordIndex + 1
      } con un total de ${words[longestWordIndex].length} caracteres</h2>  
      <button onclick='window.location.reload()'>cargar mas palabras</button>
    </section>
  `;
}

function isValidWord(word) {
  //Expresion regular que permite solo letras, y no signos ni numeros
  const validWordRegex = /^[a-zA-Z]+$/;
  //Retorna un booleano dependiendo si el string satisface a la expresion regular.
  return validWordRegex.test(word);
}
