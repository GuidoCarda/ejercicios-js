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
const surveyCountEl = document.querySelector(".survey-count");
const preferedDayEl = document.querySelector(".prefered-day");
const malePercentageEl = document.querySelector(".male-percentage");
const preferedEvenMountCountEl = document.querySelector(
  ".prefered-even-month-count"
);

form.addEventListener("submit", handleSubmit);

const dayPreferenceCount = Array(7).fill(0); // [0,0,0,0,0,0,0]
const monthPreferenceCount = Array(12).fill(0);
let evenMonthPreferenceCount = 0;
let maleCount = 0;
let nonSundayPreferringMaleCount = 0;

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const [gender, day, month] = Object.values(Object.fromEntries(formData));

  dayPreferenceCount[day]++;
  monthPreferenceCount[month]++;
  if (gender === "male") maleCount++;
  if (gender === "male" && day !== "6") nonSundayPreferringMaleCount++;
  if ((Number(month) + 1) % 2 === 0) evenMonthPreferenceCount++;

  const nonSundayPreferringMalePercentage = Math.round(
    (nonSundayPreferringMaleCount * 100) / maleCount
  );

  const responsesCount = dayPreferenceCount.reduce(
    (acum, curr) => (acum += curr),
    0
  );

  const preferedDay = dayPreferenceCount
    .map((count, day) => [day, count])
    .sort((a, b) => b[1] - a[1])
    .at(0)[0];

  malePercentageEl.textContent = `${nonSundayPreferringMalePercentage}%`;
  preferedDayEl.textContent = DAYS[preferedDay];
  preferedEvenMountCountEl.textContent = evenMonthPreferenceCount;
  surveyCountEl.textContent = responsesCount;
  monthPreferenceCount.forEach((monthCount, monthIndex) => {
    monthCountEls[monthIndex].textContent = monthCount;
  });
}
