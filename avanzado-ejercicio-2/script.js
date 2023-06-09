// desc: "Una concesionaria de automóviles registra en una planilla los datos de las personas que vienen a preguntar por algún plan o para la compra de algún automóvil. Los vehículos los tiene divididos en cuatro categorías que están numeradas del 1 al 4, a saber: 1-sedan, 2-pickups, 3-standard, 4-superiores. Los datos que se le piden a los interesados son: Nombre y apellido, edad, género, estado civil, cantidad de hijos, categoría del vehículo que le interesa, importe que está dispuesto a pagar por un auto. El programa que la concesionaria necesita debe permitir cargar los datos necesarios para obtener los siguientes resultados: cantidad de personas que consultan y se interesan por un vehículo de un monto superior a los $1.000.000, cantidad de personas que optaron por cada categoría, porcentaje de hombres que hicieron consultas respecto al total.",

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

const MOCK_CLIENT = {
  fullname: "Guido Cardarelli",
  age: "21",
  gender: "masculino",
  maritalState: "soltero",
  children: 0,
  vehicleCategory: "sedan",
  amount: "1000004",
};

//mock clients
const clients = Array(3).fill(MOCK_CLIENT);

// const clients = [];

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const clientListEl = document.querySelector(".clients-list");
const overMillionEl = document.querySelector(".overMillion-count");
const categoriesListEl = document.querySelector(".categories-list");
const percentagesEl = document.querySelector(".malePercentage");

const themeToggleBtn = document.querySelector("#theme-toggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const client = Object.fromEntries(formData);

  if (!client.amount) {
    return alert("Campo importe vacio");
  }

  clients.push(client);
  renderClients();
  renderAnalytics();
  form.reset();
}

//Calcula un porcentage en base a un valor parcial y un total o acumulador.
const getPercentage = (partialValue, total) =>
  Math.round((partialValue * 100) / total) || 0;

function getAnalytics() {
  // Cantidad de pesonas que consultan y se interesan en un vehiculo superior a 1.000.000
  let overMillionCount = 0;
  // Cantidad de personas interesadas por cada categoria
  const categoriesCount = {
    sedan: 0,
    pickups: 0,
    standard: 0,
    superior: 0,
  };
  // Cantidad de hombres que hicieron consultas respecto al total
  let maleCount = 0;

  for (const client of clients) {
    //Contar cuantos consultan por un vehiculo superor al millon
    if (client.amount > 1_000_000) {
      overMillionCount += 1;
    }

    //Contar cuantos consultan por cada categoria
    categoriesCount[client.vehicleCategory] += 1;

    //Contar cuantos son masculinos
    if (client.gender === "masculino") maleCount++;
  }

  // Calcular porcentajes por genero
  // Posicion 0: Masculino | Posiion 1: femenino
  let genderPercentages = [0, 0];

  if (clients.length) {
    genderPercentages[0] = getPercentage(maleCount, clients.length);

    if (genderPercentages[0] > 0) {
      genderPercentages[1] = 100 - genderPercentages[0];
    } else {
      genderPercentages[1] = 100;
    }
  }

  return {
    overMillionCount,
    categoriesCount,
    genderPercentages,
  };
}

//Renderiza el grafico de barra de generos
function renderBarGraph(values) {
  const barsEl = document.querySelectorAll(".bar"); // Selecciono las barras
  const percentagesEl = document.querySelectorAll(".percentage"); // Selecciono los textos

  //Itero el los valores recibidos y actualizo los elementos del dom
  values.forEach((value, idx) => {
    barsEl[idx].firstElementChild.style.width = `${value}%`;
    percentagesEl[idx].textContent = `${value}%`;
  });
}

function renderClients() {
  //Si ya hay clientes renderizados, limpio y renderizo nuevamente
  if (clientListEl.hasChildNodes()) {
    clientListEl.innerHTML = "";
  }

  //Si no hay clientes registrados muestro el estado vacio
  if (!clients.length) {
    const li = document.createElement("li");
    li.textContent = "Aun no se han registrado posibles clientes";
    li.classList.add("empty-state");

    //Anexo el cliente a la lista de clientes
    clientListEl.appendChild(li);
  }

  //Genero un Li por cada cliente y lo voy mostrando en pantalla
  clients.forEach((client) => {
    const li = document.createElement("li");

    const { gender, vehicleCategory, amount } = client;

    li.innerHTML = `
      <p>${gender}</p>
      <p class="amount">$${amount}</p>
      <span class="category-label ${vehicleCategory}">${vehicleCategory}</span>
    `;

    li.classList.add("client-list-item");
    clientListEl.appendChild(li);
  });
}

function renderAnalytics() {
  const { overMillionCount, categoriesCount, genderPercentages } =
    getAnalytics();

  // Si la lista de categorias tiene contenido lo limpio
  if (categoriesListEl.hasChildNodes()) {
    categoriesListEl.innerHTML = "";
  }

  for (const category in categoriesCount) {
    //Creo el list item
    const li = document.createElement("li");

    //Creo los componentes del li
    const h3 = document.createElement("h3");
    const span = document.createElement("span");

    //Agrego clases y contenido a c/componente del li
    h3.textContent = category;
    h3.classList.add("category-title");
    span.textContent = categoriesCount[category];
    span.classList.add("category-count");

    //Populo el li
    li.append(h3, span);
    //Añexo el li a la lista
    categoriesListEl.appendChild(li);
  }

  overMillionEl.textContent = overMillionCount;
  // malePercentageEl.textContent = `%${malePercentage}`;
  renderBarGraph(genderPercentages);
}

renderClients();
renderAnalytics();
