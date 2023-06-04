const numbersListEl = document.querySelector(".numbers-list");
const calculationsEls = document.querySelectorAll(".calculations-list span");
const negativesContainerEl = document.querySelector(".negatives");
const buttonEl = document.querySelector("button");

buttonEl.addEventListener("click", main);

function getRandomNumberInRange(min = 0, max = 10) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomUniqueNumbers(count, min, max) {
  const numbers = new Set();

  while (numbers.size < count) {
    numbers.add(getRandomNumberInRange(min, max));
  }

  return Array.from(numbers);
}

function getRandomUniqueNumbers2(count, min, max) {
  const numbers = [];

  while (numbers.length < count) {
    const number = getRandomNumberInRange(min, max);
    if (numbers.indexOf(number) !== 0) {
      numbers.push(number);
    }
    // if (!numbers.includes(number)) {
    //   numbers.push(number);
    // }
  }

  return numbers;
}

function calculations(values) {
  let sum = 0;
  let negativesCount = 0;
  let positivesCount = 0;
  const negatives = [];

  for (const value of values) {
    if (value > 0) positivesCount++;
    if (value < 0) {
      negativesCount++;
      negatives.push(value);
    }
    sum = sum + value;
  }

  return [sum, negativesCount, positivesCount, negatives];
}

function printListValues(list, values) {
  const listItems = values.map((value) => `<li>${value}<li/>`);
  list.innerHTML = listItems.join("");
}

function printCalculations(calculations) {
  calculationsEls.forEach((node, i) => {
    node.textContent = calculations[i];
  });
}

function printNegatives(negatives) {
  const negativesContent = negatives.length
    ? `<h2>Numeros negativos encontrados:</h2>
       <span>${negatives.join(" | ")}</span>`
    : "<h2>No se encontraron numeros negativos</h2>";

  negativesContainerEl.innerHTML = negativesContent;
}

function main() {
  const uniqueNumbers = getRandomUniqueNumbers(50, -500, 500);
  const [sum, negativesCount, positivesCount, negatives] =
    calculations(uniqueNumbers);

  printListValues(numbersListEl, uniqueNumbers);
  printCalculations([sum, negativesCount, positivesCount]);
  printNegatives(negatives);
}

main();
