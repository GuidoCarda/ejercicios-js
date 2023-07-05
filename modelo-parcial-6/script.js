// generar numero de 16 caracteres en base pares del 01 al 26
// luego generar una palabra 01 = 'a', 02 = 'b'
// orderar las letras alfabeticamente y mostrar

const CHARACTERS_LIMIT = 16;
const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const getRandomNumberPair = (min = 1, max = 26) => {
  const number = Math.round(Math.random() * (max - min) + min);
  return number < 10 ? "0" + number : String(number);
};

const getLetter = (id) => LETTERS[Number(id) - 1];

const getWord = (letters) => {
  return lettersIds.map(getLetter).join("");
};

const getSortedWord = (word) => {
  return word
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
};

const lettersIds = Array.from({ length: CHARACTERS_LIMIT }, () =>
  getRandomNumberPair()
);
const word = getWord(lettersIds);
const sortedWord = getSortedWord(word);

console.log({ word, sortedWord });
