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

//Genera un carton vacio ( matriz de 3 filas x 9 columnas de nulos )
function createCard() {
  return Array.from({ length: 3 }, () => Array(9).fill(null));
}

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
    // Obtener numero aleatorio entre 1 y 90
    const randomNumber = getRandomIntInRange();
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
        currentCol++;
      }
    }
  }
  return card;
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

function checkLine(card) {
  return card.some((row) =>
    row.filter(Boolean).every((cell) => cell.state === "match")
  );
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

  for (const { id, card } of cards) {
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
      //TODO: Imprimir carton ganador (extraer renderCard de renderCards)
    }
  }

  if (pickedNumbers.size === 90) button.disabled = true;
});

const pickedNumbers = new Set();
const cards = [];

//Genero 10 cartones
for (let i = 0; i < 10; i++) {
  const card = getNewCard();
  cards.push({ id: i + 1, card });
}

//Renderizo los cartones
renderCards(cards);
