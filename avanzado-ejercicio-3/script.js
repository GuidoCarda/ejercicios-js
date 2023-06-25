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

const dayPrefCount = Array(7).fill(0); // [0,0,0,0,0,0,0] // contador de dia preferidos
const monthPrefCount = Array(12).fill(0); // contador de mes preferido
let evenMonthPrefCount = 0; // contador de personas que prefieren meses par
let maleCount = 0; // contador de hombres
let nonSundayPrefMaleCount = 0; // contador de hombres que NO prefieren el domingo

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const [gender, day, month] = Object.values(Object.fromEntries(formData)); // extraigo los datos del form

  dayPrefCount[day]++; // incremento el dia preferido
  monthPrefCount[month]++; // incremento el mes preferido

  if (gender === "male") maleCount++; // si es hombre, incremento el contador
  if (gender === "male" && day !== "6") nonSundayPrefMaleCount++; // si es hombre y no prefiere el domingo incremento el contador
  if ((Number(month) + 1) % 2 === 0) evenMonthPrefCount++; // si prefiere mes par incremento el contador

  //Calculo el porcentaje de Hombres que no prefieren los domingos
  const nonSundayPrefMalePercentage =
    Math.round((nonSundayPrefMaleCount * 100) / maleCount) || 0;

  //Calculo el total de respuestas usando el contador de dia preferidos | podria haber usado una variable como contador tambien
  const responsesCount = dayPrefCount.reduce((acum, curr) => (acum += curr), 0);

  const preferedDay = dayPrefCount
    .map((count, day) => [day, count]) // mapeo el arreglo retornando por cada contador un arreglo [dia, contador]
    .sort((a, b) => b[1] - a[1]) // ordeno el arreglo de mayor a menor
    .at(0)[0]; // me quedo con el primer elemento (el mayor ya que previamente lo ordene)

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
