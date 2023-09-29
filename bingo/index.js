// Cada carton contiene 15 numeros
// Cuenta con 9 filas y 3 columnas
// Solo 5 numeros por fila
// 1,2 o 3 numeros por columas. No puede quedar ninguna vacia

// Distribuidos en tres líneas horizontales de cinco números cada una y en nueve columnas verticales,

// En las columnas puede haber tres, dos o un número, pero sin que nunca haya una columna sin número.

//Limites de juego en el bingo
const lowerLimit = 1;
const higherLimit = 90;

const numbersLimitPerCard = 15;

//Obtengo un entero aleatorio en el rango propuesto
//Si no recibo parametros entre 1 y 90 por defecto
function getRandomIntInRange(min = 1, max = 90) {
  return Math.round(Math.random() * (max - min) + min);
}

// Generar Carton
function generateCard() {
  const card = []; // max length 3
  // Cantidad restante de numeros por generar para el carton.
  let remainingNumbers = 15;

  //Set que contiene los valores ya agregados al carton.
  //La estructura set no permite valores repetidos.
  const numbersAlreadyInCard = new Set();

  for (let row = 0; row < 3; row++) {
    const cardRow = []; // max length 9.

    //itero las columnas y agrego un numero aleatorio
    for (let col = 0; col < 9; col++) {
      //Checkeo que queden espacios libres ( Maximo 15 )

      let randomNumber = getRandomIntInRange();
      console.log(randomNumber); // Numero generado

      while (numbersAlreadyInCard.has(randomNumber)) {
        console.log(
          `${randomNumber} ya existe en el carton, generando uno nuevo`
        ); // Log cuando se repite un numero en el carton
        // Sigo generando numeros hasta que se genere uno que no este.
        randomNumber = getRandomIntInRange();
      }

      //Agrego el numero generado al set con los numeros del carton
      console.log(`Agregando ${randomNumber} al carton`);

      if (numbersAlreadyInCard.size === numbersLimitPerCard) {
        continue;
      }

      numbersAlreadyInCard.add(randomNumber);
      cardRow.push(randomNumber);
    }

    //agrego la fila populada al carton.
    card.push(cardRow);
  }

  //Genero un numero aleatorio en rango
  // let randomNumber = getRandomIntInRange();
  //Si el numero generado ya esta en la targeta
  // while (numbersAlreadyInCard.has(randomNumber)) {
  // Sigo generando numeros hasta que se genere uno que no este.
  // randomNumber = getRandomIntInRange();
  // }
  //Agrego el numero generado al set con los numeros del carton
  // numbersAlreadyInCard.add(randomNumber);

  //Retorno el carton ya cargado
  return card;
}

// Cada columna debe tener al menos 1 numero
// Por columna puede haber 1,2 o 3 numeros
// En total debe haber 15 numeros
// Deben ser unicos

//Imprimir carton generado
function renderCard() {}

function generateEmptyCard() {
  const card = []; // max length 3 (numero de filas)
  for (let row = 0; row < 3; row++) {
    const cardRow = []; // max length 9. (numero de columnas)
    //itero las columnas y agrego null a cada la columna
    for (let col = 0; col < 9; col++) {
      cardRow.push(null);
    }
    //agrego la fila a la tarjeta
    card.push(cardRow);
  }

  //Retorno el carton ya cargado
  return card;
}

function fillCard(emptyCard) {
  const card = emptyCard.slice();
  const numbersAlreadyInCard = new Set();
  let currentCol = 0;
  while (numbersAlreadyInCard.size < 15) {
    // Obtener numero aleatorio entre 1 y 90
    let randomNumber = getRandomIntInRange();
    //validar si ya esta en el carton
    while (numbersAlreadyInCard.has(randomNumber)) {
      //si está generamos un nuevo numero
      randomNumber = getRandomIntInRange();
    }
    //agregamos el numero no repetido al carton
    numbersAlreadyInCard.add(randomNumber);

    // obtenemos una fila aleatoria en el carton;
    let randomRow = getRandomIntInRange(0, 2);

    //genero una posicion aleatoria
    if (numbersAlreadyInCard.size > 9) {
      // console.log("entro al if");
      // console.log(numbersAlreadyInCard);
      currentCol = getRandomIntInRange(0, 8);
      while (card[randomRow][currentCol] !== null) {
        currentCol = getRandomIntInRange(0, 8);
        randomRow = getRandomIntInRange(0, 2);
      }
      card[randomRow][currentCol] = randomNumber;
    } else {
      card[randomRow][currentCol] = randomNumber;
      currentCol++;
    }
  }
  return card;
}

function getNewCard() {
  const emptyCard = generateEmptyCard();
  const filledCard = fillCard(emptyCard);
  return filledCard;
}

// const emptyCard = generateEmptyCard();
// const filledCard = fillCard(emptyCard);

const body = document.querySelector("body");

const cards = [];

for (let i = 0; i < 10; i++) {
  const card = getNewCard();
  cards.push(card);
}

cards.forEach((card) => {
  const numbersInCardCount = card
    .map((row) => row.filter(Boolean).length)
    .reduce((acum, val) => (acum += val), 0);
  // console.log(numbersCount);
  const numbersInCardH2 = document.createElement("h2");
  numbersInCardH2.textContent = numbersInCardCount;
  const table = document.createElement("table");

  card.forEach((row) => {
    const tableRow = document.createElement("tr");
    row.forEach((number) => {
      const tableCell = document.createElement("td");
      tableCell.innerHTML = number;
      tableRow.appendChild(tableCell);
    });
    table.appendChild(tableRow);
  });
  body.appendChild(numbersInCardH2);
  body.appendChild(table);
});
