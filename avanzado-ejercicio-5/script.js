const form = document.querySelector("form");
const resultSection = document.querySelector(".result");

form.addEventListener("submit", handleSubmit);

let highestConsumtion = 0;
const familyPopulationOver100KWH = [];
const idsEndingCount = Array(10).fill(0);

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { consumtion, holderId, cohabitants } = Object.fromEntries(formData);

  if (!consumtion || !holderId) {
    return alert("campos consumo y dni requeridos");
  }

  if (consumtion > highestConsumtion) highestConsumtion = consumtion;
  if (consumtion > 100) familyPopulationOver100KWH++;
  idsEndingCount[holderId.at(-1)]++;

  if (resultSection.hasChildNodes()) {
    resultSection.innerHTML = "";
  }

  const highestConsumtionEl = document.createElement("h2");
  highestConsumtionEl.textContent = `El mayor consumo fue de ${highestConsumtion} KMH`;

  const familyPopulationList = document.createElement("ul");

  if (!familyPopulationOver100KWH.length) {
    familyPopulationList.innerHTML = `<li>No hubo ninguna familia con un consumo mayor a 100KWH</li>`;
  } else {
    familyPopulationOver100KWH.forEach((population) => {
      const li = document.createElement("li");
      li.textContent = population;
      familyPopulationList.appendChild(li);
    });
  }

  const idsEndingCountEl = document.createElement("ul");
  idsEndingCount.forEach((count, idx) => {
    const li = document.createElement("li");
    li.textContent = `Finalizacion ${idx} = ${count} titulares`;
    idsEndingCountEl.appendChild(idsEndingCount);
  });

  resultSection.append(
    highestConsumtionEl,
    familyPopulationList,
    idsEndingCountEl
  );
}
