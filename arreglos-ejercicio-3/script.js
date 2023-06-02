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
  const listItems = [];

  values.forEach((value) => {
    const li = `
      <li>
        ${value}
      </li>
    `;
    listItems.push(li);
  });

  // console.log(listItems.join(""));
  list.innerHTML = listItems.join("");
}

function printCalculations(calculations) {
  calculationsEls.forEach((node, i) => {
    node.textContent = calculations[i];
  });
}

function main() {
  const uniqueNumbers = getRandomUniqueNumbers(50, -500, 500);
  const [sum, negativesCount, positivesCount, negatives] =
    calculations(uniqueNumbers);

  printListValues(numbersListEl, uniqueNumbers);
  printCalculations([sum, negativesCount, positivesCount]);

  let negativesContent = "";

  if (negativesCount) {
    negativesContent = `
      <h2>Numeros negativos encontrados: </h2>
      <span>
        ${negatives.join(" | ")}
      </span>
    `;
  } else {
    negativesContent = "<h2>No se encontraron numeros negativos</h2>";
  }

  negativesContainerEl.innerHTML = negativesContent;
}

main();
