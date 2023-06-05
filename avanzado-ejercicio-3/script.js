// cantidad de encuestas realizadas
// día de la semana que más prefiere la gente
// cantidad de personas que prefieren meses pares
// cantidad de personas que prefieren cada mes del año
// porcentaje de hombres que no prefieren el domingo respecto al total de hombres.

const DAYS = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

const form = document.querySelector("form");
const monthCountEls = document.querySelectorAll(".month-count");
const resultCardsEls = document.querySelectorAll(".card");
const surveyCountEl = document.querySelector(".survey-count");
const preferedDayEl = document.querySelector(".prefered-day");
const malePercentageEl = document.querySelector(".male-percentage");
const evenMonthPrefCountEl = document.querySelector(
  ".prefered-even-month-count"
);

form.addEventListener("submit", handleSubmit);

const dayPrefCount = Array(7).fill(0); // [0,0,0,0,0,0,0]
const monthPrefCount = Array(12).fill(0);
let evenMonthPrefCount = 0;
let maleCount = 0;
let nonSundayPrefMaleCount = 0;

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const [gender, day, month] = Object.values(Object.fromEntries(formData));

  dayPrefCount[day]++;
  monthPrefCount[month]++;
  if (gender === "male") maleCount++;
  if (gender === "male" && day !== "6") nonSundayPrefMaleCount++;
  if ((Number(month) + 1) % 2 === 0) evenMonthPrefCount++;

  const nonSundayPrefMalePercentage =
    Math.round((nonSundayPrefMaleCount * 100) / maleCount) || 0;

  const responsesCount = dayPrefCount.reduce((acum, curr) => (acum += curr), 0);

  const preferedDay = dayPrefCount
    .map((count, day) => [day, count])
    .sort((a, b) => b[1] - a[1])
    .at(0)[0];

  //Total encuestados
  surveyCountEl.textContent = responsesCount;
  //Porcenta masculino que no prefiere los domingos
  malePercentageEl.textContent = `${nonSundayPrefMalePercentage}%`;
  //Dia preferido
  preferedDayEl.textContent = DAYS[preferedDay];
  //Total que prefiere meses pares
  evenMonthPrefCountEl.textContent = evenMonthPrefCount;

  //Total por mes
  monthPrefCount.forEach((count, index) => {
    monthCountEls[index].textContent = count;
  });
}
