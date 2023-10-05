// Cada carton contiene 15 numeros
// Cuenta con 9 filas y 3 columnas
// Solo 5 numeros por fila
// 1,2 o 3 numeros por columas. No puede quedar ninguna vacia

// Distribuidos en tres líneas horizontales de cinco números cada una y en nueve columnas verticales,

// En las columnas puede haber tres, dos o un número, pero sin que nunca haya una columna sin número.

//Elementos del DOM para renderizar el contenido
const $container = document.querySelector(".container");
const $randomNumberSpan = document.querySelector(".RandomNumber-value");
const $pickedNumbersUL = document.querySelector(".PickedNumbers-list");
const $randomNumberBtn = document.querySelector(".RandomNumber-btn");

//Limites de juego en el bingo
const LOWER_LIMIT = 1;
const UPPER_LIMIT = 90;
const NUMBERS_PER_CARD = 15;

//Obtengo un entero aleatorio en el rango propuesto
//Si no recibo parametros entre 1 y 90 por defecto
function getRandomIntInRange(min = LOWER_LIMIT, max = UPPER_LIMIT) {
  return Math.round(Math.random() * (max - min) + min);
}

//Obtengo un entero aleatorio en el rango propuesto, excluyendo los numeros dados
function getRandomIntInRangeWithExclusions(min, max, exclusions) {
  const number = getRandomIntInRange(min, max);
  if (exclusions.includes(number)) {
    return getRandomIntInRangeWithExclusions(min, max, exclusions);
  }
  return number;
}

//obtener un numero unico en un rango dado
function getUniqueRandomIntInRange(min, max, uniqueNumbers) {
  let number = getRandomIntInRange(min, max);
  while (uniqueNumbers.has(number)) {
    number = getRandomIntInRange(min, max);
  }
  uniqueNumbers.add(number);
  return number;
}

//Genera un carton vacio ( matriz de 3 filas x 9 columnas de nulos )
function createCard() {
  return Array.from({ length: 3 }, () => Array(9).fill(null));
}

// La primera columna contiene números del 1 al 9, la segunda del 10 al 19, la tercera, del 20 al 29, la cuarta del 30 al 39, la quinta del 40 al 49, la sexta del 50 al 59, la séptima del 60 al 69, la octava del 70 al 79 y por última la novena del 80 al 90.
const LIMITS = [
  [1, 9],
  [10, 19],
  [20, 29],
  [30, 39],
  [40, 49],
  [50, 59],
  [60, 69],
  [70, 79],
  [80, 90],
];

// Cargar carton vacio
function getNewCard() {
  const card = createCard();

  //Set para controlar si un numero esta en el carton.
  const numbersAlreadyInCard = new Set();

  // variable para iterar las columnas
  // < 9 de forma secuencial
  // >= 9 de forma aleatoria
  let currentCol = 0;

  while (numbersAlreadyInCard.size < NUMBERS_PER_CARD) {
    const [start, end] = LIMITS[currentCol];
    // console.log(start, end);

    // Obtener numero aleatorio entre limite inf y sup de la columna
    const randomNumber = getRandomIntInRange(start, end);

    // console.log({ randomNumber, currentCol, start, end });
    //Validar si no esta en el carton
    if (!numbersAlreadyInCard.has(randomNumber)) {
      //Agregamos el numero a nuestro Set de control.
      numbersAlreadyInCard.add(randomNumber);

      //Genero el un objeto que contendra el numero y el estado ( '' o 'match' )
      const cellData = {
        value: randomNumber,
        state: "",
      };

      //Obtengo un indice de fila aleatorio
      let randomRow = getRandomIntInRange(0, 2);

      if (numbersAlreadyInCard.size > 9) {
        //Obtengo un indice de columna aleatorio
        currentCol = getRandomIntInRange(0, 8);

        //Mientras que la celda este ocupada, generamos otros indices
        while (card[randomRow][currentCol] !== null) {
          currentCol = getRandomIntInRange(0, 8);
          randomRow = getRandomIntInRange(0, 2);
        }
        //Si la celda esta libre agregamos el numero
        card[randomRow][currentCol] = cellData;
      } else {
        card[randomRow][currentCol] = cellData;

        currentCol === 8
          ? (currentCol = getRandomIntInRange(0, 8))
          : currentCol++;
      }
    }
  }

  return card;
}

function isCardFull(card) {
  return card.flat().filter(Boolean).length === NUMBERS_PER_CARD;
}

function getNewCard2() {
  const card = createCard();

  //Set para controlar si un numero esta en el carton.
  const numbersAlreadyInCard = new Set();

  // numbersAlreadyInCard.size < NUMBERS_PER_CARD;
  while (!isCardFull(card)) {
    let colIndex = numbersAlreadyInCard.size; // Columna secuencial hasta size 8, luego aleatoria
    let rowIndex = getRandomIntInRange(0, 2); // Fila aleatoria
    let number = null; // Numero a generar

    //Si ya cada columna tiene al menos un valor
    if (numbersAlreadyInCard.size > 8) {
      colIndex = getRandomIntInRange(0, 8); // Columna aleatoria

      while (
        card[rowIndex][colIndex] !== null ||
        isColumnFull(card, colIndex) ||
        isRowFull(card[rowIndex])
      ) {
        if (isColumnFull(card, colIndex)) {
          colIndex = getRandomIntInRangeWithExclusions(0, 8, [colIndex]);
        } else if (isRowFull(card[rowIndex])) {
          rowIndex = getRandomIntInRangeWithExclusions(0, 2, [rowIndex]);
        } else {
          rowIndex = getRandomIntInRangeWithExclusions(0, 2, [rowIndex]);
          colIndex = getRandomIntInRangeWithExclusions(0, 8, [colIndex]);
        }
      }

      //Obtengo los valores en el indice de columna obtenido.
      //Ejemplo: [null,55,null] colIndex = 6
      const valuesInColumn = card.map((row) => row[colIndex]?.value ?? null);

      // Invierto los valores de la columna.
      const reversedValuesInColumn = valuesInColumn.slice().reverse();

      //Obtengo el primer indice de la columna que no sea null
      const firstIndexOfMatch = valuesInColumn.findIndex(
        (value) => value !== null
      );

      //Obtengo el ultimo indice de la columna que no sea null
      const lastIndexOfMatch = reversedValuesInColumn.findIndex(
        (value) => value !== null
      );

      let rowStartLimit = LIMITS[colIndex][0];
      let rowEndLimit = LIMITS[colIndex][1];

      //Si el indice de fila es 1 (centro)
      if (rowIndex === 1) {
        if (valuesInColumn[0] !== null && valuesInColumn[2] !== null) {
          // Si la diferencia entre el primer valor y el ultimo es -1, no hay mas numeros disponibles en la columna, entonces se descarta el numero generado aleatoriamente.
          if (valuesInColumn[0] - valuesInColumn[2] === -1) {
            continue;
          }

          rowStartLimit = valuesInColumn[0] + 1;
          rowEndLimit = valuesInColumn[2] - 1;
        } else if (valuesInColumn[0] !== null) {
          //Si el primer valor de la columna es el limite inferior de la columna, no hay mas numeros disponibles en la columna, entonces se descarta el numero generado aleatoriamente.
          if (valuesInColumn[0] === rowEndLimit) {
            continue;
          }

          rowStartLimit = valuesInColumn[0] + 1;
        } else {
          //Si el ultimo valor de la columna es el limite superior de la columna no hay mas numeros disponibles en la columna y se descarta el numero generado aleatoriamente.
          if (valuesInColumn[2] === rowStartLimit) {
            continue;
          }
          rowEndLimit = valuesInColumn[2] - 1;
        }
      }

      //Si el indice de fila es 0 (arriba)
      if (rowIndex === 0) {
        //Si el primer valor encontrado en la columna es el limite inferior de la columna, no hay mas numeros disponibles en la columna, entonces se descarta el numero generado aleatoriamente.
        if (valuesInColumn[firstIndexOfMatch] === rowStartLimit) {
          continue;
        }
        rowEndLimit = valuesInColumn[firstIndexOfMatch] - 1;
      }

      // Si el indice de fila es 2 (abajo)
      if (rowIndex === 2) {
        //Si el ultimo valor de la columna es el limite superior de la columna no hay mas numeros disponibles en la columna y se descarta el numero generado aleatoriamente.
        if (reversedValuesInColumn[lastIndexOfMatch] === rowEndLimit) {
          continue;
        }
        rowStartLimit = reversedValuesInColumn[lastIndexOfMatch] + 1;
      }

      //Obtengo un numero aleatorio en el rango de la columna
      number = getUniqueRandomIntInRange(
        rowStartLimit,
        rowEndLimit,
        numbersAlreadyInCard
      );
    } else {
      number = getUniqueRandomIntInRange(
        LIMITS[colIndex][0],
        LIMITS[colIndex][1],
        numbersAlreadyInCard
      );
    }

    //Agregamos el numero a nuestro Set de control.
    numbersAlreadyInCard.add(number);
    //Agrego el numero al carton en la posicion correspondiente (fila, columna) y con el estado correspondiente
    card[rowIndex][colIndex] = {
      value: number,
      state: "",
    };
  }

  return card;
}

//obtener espacio libre en la columna dada si hay
// function getFreeRowInColumn(card, col) {
//   return card.findIndex((row) => row[col] === null);
// }

//obtener espacio libre en la columna dada de forma aleatoria
function getFreeRowInColumnRandom(card, col) {
  const row = getRandomIntInRange(0, 2);
  if (card[row][col] === null) {
    return row;
  }
  return getFreeRowInColumnRandom(card, col);
}

//Retorna true si una columna ya tiene 3 numeros.
function isColumnFull(card, col) {
  return card.every((row) => row[col] !== null);
}

// Retorna true si una fila ya tiene 5 numeros.
function isRowFull(row) {
  return row.filter((cell) => cell !== null).length === 5;
}

//Recibe el carton a renderizar y el nodo en el que lo agregara.
function renderCard(card, node) {
  card.forEach((row) => {
    const tableRow = document.createElement("tr");

    row.forEach((cell) => {
      const tableCell = document.createElement("td");
      if (cell === null) {
        tableCell.classList.add("empty");
      } else {
        tableCell.innerHTML = cell.value;
        tableCell.dataset.number = cell.value;
        if (cell.state === "match") {
          tableCell.classList.add("match");
        }
      }
      tableRow.appendChild(tableCell);
    });
    node.appendChild(tableRow);
  });
}

//Imprimir cartones generados
function renderCards(cards) {
  cards.forEach(({ id, card }) => {
    const cardId = id;

    //Creo el titulo del carton
    const cardH2 = document.createElement("h2");
    cardH2.innerHTML = `Carton ${cardId}`;

    //Creo la tabla contenedora
    const table = document.createElement("table");
    table.id = cardId;

    //Renderizo el carton correspondiente
    renderCard(card, table);

    //Anexo los elementos al dom
    $container.appendChild(cardH2);
    $container.appendChild(table);
  });
}

//Obtener un numero unico
function getNewNumber(uniqueNumbers) {
  let number = getRandomIntInRange();
  while (uniqueNumbers.has(number)) {
    number = getRandomIntInRange();
  }
  uniqueNumbers.add(number);
  return number;
}

function checkBingo(card) {
  return card
    .flat()
    .filter(Boolean)
    .every((cell) => cell.state === "match");
}

function checkLine(row) {
  return row.filter(Boolean).every((cell) => cell.state === "match");
}

$randomNumberBtn.addEventListener("click", () => {
  // Limite de numeros alcanzado
  if (pickedNumbers.size >= 90) return;

  //Obtengo un nuevo numero aleatorio (unico)
  const newNumber = getNewNumber(pickedNumbers);

  $randomNumberSpan.textContent = newNumber;

  const pickedNumberLi = document.createElement("li");
  pickedNumberLi.textContent = newNumber;
  pickedNumberLi.className = "PickedNumbers-item";
  $pickedNumbersUL.appendChild(pickedNumberLi);

  for (const { id, card, lines } of cards) {
    //Obtengo el indice si hay coincidencia con el nuevo valor
    const indexOfMatch = card
      .flat()
      .findIndex((cell) => cell?.value === newNumber);

    if (indexOfMatch > -1) {
      // Marcar carton
      document
        .getElementById(id)
        .querySelector(`[data-number="${newNumber}"]`)
        .classList.add("match");

      //Obtengo la fila y la columna
      const row = Math.floor(indexOfMatch / 9);
      const col = Math.round(indexOfMatch % 9);

      //Actualizo el estado correspondiente
      card[row][col] = { ...card[row][col], state: "match" };

      console.log(lines);
      if (checkLine(card[row])) {
        lines[row] = true;
        card[row][col] = { ...card[row][col], lines };
        alert(`El carton ${id} tiene linea en la fila ${row + 1}}`);
      }
    }

    // console.log(id, checkBingo(card));
    // console.log(id, checkLine(card));
    if (checkBingo(card)) {
      $container.innerHTML = `
      <div class='Result'>
        <h1>BINGO!</h1>
        <p>El ganador fue el carton ${id}</p>
      <div>
      `;

      const $resultDiv = document.querySelector(".Result");
      const table = document.createElement("table");

      renderCard(card, table);
      $resultDiv.appendChild(table);
    }
  }

  if (pickedNumbers.size === 90) button.disabled = true;
});

const pickedNumbers = new Set();
const cards = [];

// Numero de cartones a generar
const NUM_CARDS = 50;

//Genero 10 cartones
for (let i = 0; i < NUM_CARDS; i++) {
  const card = getNewCard();
  let cardV2 = getNewCard2();

  //Si el carton es invalido lo descarto
  while (
    cardV2.map((row) => row.filter(Boolean).length).some((value) => value !== 5)
  ) {
    cardV2 = getNewCard2();
  }
  cards.push({ id: i + 1, card: cardV2, lines: [false, false, false] });
  // cards.push({ id: i + 1, card });
}

//Renderizo los cartones
renderCards(cards);
