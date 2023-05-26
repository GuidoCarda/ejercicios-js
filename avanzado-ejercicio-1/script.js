// Una empresa de cable necesita un programa en Javascript que permita la carga y la estadística de la facturación mensual. Emite una factura por mes para cada cliente. Para ello cuenta con los siguientes datos por cada factura que emite: fecha de la factura, número de cliente (un número que puede ser de 1 a 1278), monto de la factura, concepto de facturación. El programa debe permitir la carga de todas las facturas del mes y obtener un informe que incluya: cantidad total facturada, promedio de facturación por cliente, cantidad de clientes cuya facturación es superior a mil pesos.",

const form = document.querySelector("form");
const tableBodyElem = document.querySelector("tbody");
const statisticsCardsElems = document.querySelectorAll(".statistics-card");
const notificationElem = document.querySelector(".notification");

const bills = [
  // {
  //   date: "2023-05-10",
  //   clientNumber: "1",
  //   amount: "2",
  //   concept: "servicio",
  // },
  // {
  //   date: "2023-05-10",
  //   clientNumber: "2",
  //   amount: "2",
  //   concept: "servicio",
  // },
  // {
  //   date: "2023-05-10",
  //   clientNumber: "3",
  //   amount: "2",
  //   concept: "servicio",
  // },
  // {
  //   date: "2023-05-10",
  //   clientNumber: "4",
  //   amount: "2",
  //   concept: "servicio",
  // },
  // {
  //   date: "2023-05-10",
  //   clientNumber: "5",
  //   amount: "2123",
  //   concept: "servicio",
  // },
];

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formEntries = Object.fromEntries(formData);

  if (!validateEntries(formEntries)) return;

  const client = bills.find(
    (bill) => bill.clientNumber === formEntries.clientNumber
  );

  if (client && client.clientNumber) {
    if (isAlreadyBilled(formEntries.clientNumber, formEntries.date)) {
      return renderNotification({
        message: "Ya se facturo a este cliente el mes ingresado",
        type: "error",
      });
    }
  }

  bills.push(formEntries);
  renderNotification({
    message: "Cliente facturado satisfactoriamente",
    type: "success",
  });
  renderRows();
  renderStatistics();
}

function isAlreadyBilled(clientNumber, billingDate) {
  const newBillingDate = new Date(billingDate);
  return bills.some((bill) => {
    const existingBillingDate = new Date(bill.date);

    return (
      bill.clientNumber === clientNumber &&
      existingBillingDate.getFullYear() === newBillingDate.getFullYear() &&
      existingBillingDate.getMonth() === newBillingDate.getMonth()
    );
  });
}

function validateEntries(formEntries) {
  if (!formEntries.clientNumber || !formEntries.date || !formEntries.amount) {
    renderNotification({ message: "campos vacios", type: "error" });
    return false;
  }

  if (!isCurrentMonth(formEntries.date)) {
    renderNotification({
      message: "El mes de facturacion ingresado no es el actual",
      type: "error",
    });
    return false;
  }

  if (
    isNaN(formEntries.clientNumber) ||
    formEntries.clientNumber < 0 ||
    formEntries.clientNumber > 1278
  ) {
    renderNotification({ message: "Nro de cliente invalido", type: "error" });
    return false;
  }

  return true;
}

function renderRows() {
  //Limpiamos contenido existente para evitar duplicacion
  tableBodyElem.innerHTML = "";

  //Si no hay facturas registradas
  if (!bills.length) {
    return (tableBodyElem.innerHTML = `
      <tr>
        <td class='empty-state' colspan="4">
          No hay facturas cargadas
        </td>
      </tr>
    `);
  }

  bills.forEach((bill) => {
    const { clientNumber, date, amount, concept } = bill;
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
    <td>${clientNumber}</td>
    <td>${date}</td>
    <td>${amount}</td>
    <td>${concept || "-"}</td>
    `;

    tableBodyElem.appendChild(tableRow);
  });
}

function isCurrentMonth(date) {
  //Asegurar que las fechas a comparar son un objeto date
  const dateToCompare = new Date(date);
  const today = new Date();

  return (
    today.getFullYear() === dateToCompare.getFullYear() &&
    today.getMonth() === dateToCompare.getMonth()
  );
}

function renderStatistics() {
  const statistics = getStatistics();
  statistics.forEach((statistic, idx) => {
    statisticsCardsElems[idx].firstElementChild.textContent = statistic;
  });
}

function getStatistics() {
  //Total facturado
  let totalBilled = 0;
  //Promedio facturado por cliente
  let averageBilled = 0;
  //Nro de clientes cuya facturacion > 1000
  let clientsOverThousand = 0;

  bills.forEach((bill) => {
    totalBilled += Number(bill.amount);
    if (bill.amount > 1000) {
      clientsOverThousand++;
    }
  });

  if (bills.length) {
    averageBilled = totalBilled / 1278;
  }

  return [totalBilled, averageBilled.toFixed(2), clientsOverThousand];
}

function renderNotification(content, delay = 2000) {
  //Si ya hay una notificacion en pantalla retorno
  if (notificationElem.classList.contains("visible")) {
    return;
  }

  //Extraigo el contenido de la notificacion
  const { message, type } = content;

  //Populo la notificacion con los datos recibidos
  notificationElem.textContent = message;
  notificationElem.classList.add(`${type}`, "visible");

  //Limpio la notificacion luego de un delay en milisegundos
  //(2000ms por defecto)
  setTimeout(
    () => notificationElem.classList.remove(`${type}`, "visible"),
    delay
  );
}

//Renderizo las facturas existentes
renderRows();
renderStatistics();
