const COTIZACIONES = {
  dolar: 469,
  real: 46.76,
  euro: 514,
  libra: 288.98,
  "peso-mx": 13.22,
  yuan: 33.18,
};

const form = document.querySelector("form");
const inputField = document.querySelector("input");
const resultsSection = document.querySelector("section");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const amount = inputField.value;

  clearResults();

  if (!amount.length) {
    return alert("campo vacio");
  }

  if (amount <= 0) {
    return alert("El valor ingresado debe ser mayor a 0");
  }

  for (const cotizacion in COTIZACIONES) {
    const result = amount / COTIZACIONES[cotizacion];

    if (result) {
      resultsSection.innerHTML += `
        <div>
            <h2>${cotizacion}</h2>
            <span class="convertion">${result.toFixed(2)}</span>
            <span class="change-rate">1 ${cotizacion} = ${
        COTIZACIONES[cotizacion]
      } ars
          </span>
        </div>
        `;
    } else {
      alert("algo salio mal");
    }
  }
}

function clearResults() {
  resultsSection.innerHTML = "";
}
