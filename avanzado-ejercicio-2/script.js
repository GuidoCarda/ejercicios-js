// desc: "Una concesionaria de automóviles registra en una planilla los datos de las personas que vienen a preguntar por algún plan o para la compra de algún automóvil. Los vehículos los tiene divididos en cuatro categorías que están numeradas del 1 al 4, a saber: 1-sedan, 2-pickups, 3-standard, 4-superiores. Los datos que se le piden a los interesados son: Nombre y apellido, edad, género, estado civil, cantidad de hijos, categoría del vehículo que le interesa, importe que está dispuesto a pagar por un auto. El programa que la concesionaria necesita debe permitir cargar los datos necesarios para obtener los siguientes resultados: cantidad de personas que consultan y se interesan por un vehículo de un monto superior a los $1.000.000, cantidad de personas que optaron por cada categoría, porcentaje de hombres que hicieron consultas respecto al total.",
console.log("hello word");

// Categorias
// - 1 sedan
// - 2 pickups
// - 3 standard
// - 4 superiores

// Datos interesados
// nombre y apellido,
// edad,
// genero,
// estado civil
// cantidad de hijos
// cat de auto que les interesa
// importe dispuesto a pagar

// Analiticas:
// Cantidad de pesonas que consultan y se interesan en un vehiculo superior a 1.000.000
// Cantidad de personas por cada categoria
// Porcentaje de hombres que hicieron consultas respecto al total

const clients = [];

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const clientListEl = document.querySelector(".clients-list");
const overMillionEl = document.querySelector(".overMillion-count");
const categoriesListEl = document.querySelector(".categoriesCount-list");
const malePercentageEl = document.querySelector(".malePercentage");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const client = Object.fromEntries(formData);

  if (Object.entries(client).every((entry) => entry[1].length)) {
    console.log("entro");
    clients.push(client);
    renderClients();
    renderAnalytics();
  } else {
    alert("algo salio mal :/");
  }
}

function getAnalytics() {
  // Cantidad de pesonas que consultan y se interesan en un vehiculo superior a 1.000.000
  // Cantidad de personas por cada categoria
  // Porcentaje de hombres que hicieron consultas respecto al total

  let overMillionCount = 0;
  const categoriesCount = {
    sedan: 0,
    pickups: 0,
    standard: 0,
    superior: 0,
  };
  let maleCount = 0;

  for (const client of clients) {
    //Calcular cuantos consultan por un vehiculo superor al millon
    if (client.amount > 1_000_000) {
      overMillionCount += 1;
    }

    //Calcular cuantos consultan por cada categoria
    categoriesCount[client.vehicleCategory] += 1;

    if (client.gender === "masculino") maleCount++;
  }

  //Calcular porcentaje masculino
  const malePercentage = Math.round((maleCount * 100) / clients.length) || 0;

  console.log(malePercentage);

  return { overMillionCount, categoriesCount, malePercentage };
}

function renderClients() {
  if (clientListEl.hasChildNodes()) {
    clientListEl.innerHTML = "";
  }

  clients.forEach((client) => {
    const li = document.createElement("li");

    const { fullname, age, maritalState, children, vehicleCategory } = client;

    li.innerHTML = `
      <span>${fullname}</span>
      <span>${age}</span>
      <span>${maritalState}</span>
      <span>${children}</span>
      <span>${vehicleCategory}</span>
    `;

    clientListEl.appendChild(li);
  });
}

function renderAnalytics() {
  const { overMillionCount, categoriesCount, malePercentage } = getAnalytics();

  // Si la lista de categorias tiene contenido lo limpio
  if (categoriesListEl.hasChildNodes()) {
    categoriesListEl.innerHTML = "";
  }

  for (const category in categoriesCount) {
    //Creo el list item
    const li = document.createElement("li");
    //Populo su contenido
    li.textContent = `${category}: ${categoriesCount[category]}`;
    //Añexo el list item a la lista
    categoriesListEl.appendChild(li);
  }

  overMillionEl.textContent = overMillionCount;
  malePercentageEl.textContent = `%${malePercentage}`;
}

renderClients();
renderAnalytics();
