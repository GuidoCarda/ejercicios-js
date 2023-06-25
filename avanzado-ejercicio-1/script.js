// Una empresa de cable necesita un programa en Javascript que permita la carga y la estadística de la facturación mensual. Emite una factura por mes para cada cliente. Para ello cuenta con los siguientes datos por cada factura que emite: fecha de la factura, número de cliente (un número que puede ser de 1 a 1278), monto de la factura, concepto de facturación. El programa debe permitir la carga de todas las facturas del mes y obtener un informe que incluya: cantidad total facturada, promedio de facturación por cliente, cantidad de clientes cuya facturación es superior a mil pesos.",

const form = document.querySelector("form"); // Formulario de carga de datos de facturas
const tableBodyElem = document.querySelector("tbody"); // Tabla que lista las facturas cargadas
const statisticsCardsElems = document.querySelectorAll(".statistics-card"); // tarjetas para los datos procesados
const notificationElem = document.querySelector(".notification"); // Notificacion de error/exito

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
  const formEntries = Object.fromEntries(formData); // estraigo los datos el formulario

  //Si hay datos invalidos muestro el error y finalizo la ejecucion
  if (!validateEntries(formEntries)) return;

  //busco si el cliente tiene alguna factura a su nombre
  const client = bills.find(
    (bill) => bill.clientNumber === formEntries.clientNumber
  );

  //Si el cliente tiene una factura a su nombre
  if (client && client.clientNumber) {
    //Valido que ya no se le haya facturado este mes.
    if (isAlreadyBilled(formEntries.clientNumber, formEntries.date)) {
      return renderNotification({
        message: "Ya se facturo a este cliente el mes ingresado",
        type: "error",
      }); //renderizo la notificacion de error
    }
  }

  bills.push(formEntries); // Agrego los datos a la lista de facturas

  renderNotification({
    message: "Cliente facturado satisfactoriamente",
    type: "success",
  }); // muestro una notificacion de exito

  renderRows(); //renderizo filas con los datos de las facturas
  renderStatistics(); // actualizo las tarjetas con las estadisticas solicitadas
  form.reset(); // reinicio el formulario para continuar cargando
}

//Valida si el cliente ya tiene una factura a su nombre
//Recibe el nro de cliente y la fecha de facturacion actual
function isAlreadyBilled(clientNumber, billingDate) {
  const newBillingDate = new Date(billingDate); // Me aseguro estar trabajando con un objeto DATE

  //recorro las facturas (some retorna true si ALGUN elemento cumple la condicion)
  return bills.some((bill) => {
    //por c/factura genero un objeto date con su fecha de facturacion para comparar
    const existingBillingDate = new Date(bill.date);

    // si coincide el nro de cliente, el anio y el mes quiere decir que el cliente ya fue facturado
    return (
      bill.clientNumber === clientNumber &&
      existingBillingDate.getFullYear() === newBillingDate.getFullYear() &&
      existingBillingDate.getMonth() === newBillingDate.getMonth()
    );
  });
}

//Recibe los datos del formulario y retonrna un boleano dependiendo si encontro errores o no
//Tambien, si encuentra un error lo muestra por pantalla
function validateEntries(formEntries) {
  //Validacion por vacio
  if (!formEntries.clientNumber || !formEntries.date || !formEntries.amount) {
    renderNotification({ message: "campos vacios", type: "error" });
    return false;
  }

  //Validacion por fecha
  if (!isCurrentMonth(formEntries.date)) {
    renderNotification({
      message: "El mes de facturacion ingresado no es el actual",
      type: "error",
    });
    return false;
  }

  // Valido nro cliente, que se un numero y que este en el rango valido
  if (
    isNaN(formEntries.clientNumber) ||
    formEntries.clientNumber < 0 ||
    formEntries.clientNumber > 1278
  ) {
    renderNotification({ message: "Nro de cliente invalido", type: "error" });
    return false;
  }

  //Si no encontro ningun un error
  return true;
}

//Renderiza las filas de la tabla con los datos de las facturas cargadas
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

  //Por cada factura cargada
  bills.forEach((bill) => {
    //Extaigo los datos recopilados
    const { clientNumber, date, amount, concept } = bill;
    const tableRow = document.createElement("tr"); //creo la fila

    //Populo la fila con el contenido correspondiente
    tableRow.innerHTML = `
    <td>${clientNumber}</td>
    <td>${date}</td>
    <td>${amount}</td>
    <td>${concept || "-"}</td>
    `;

    tableBodyElem.appendChild(tableRow); //anexo la fila a la tabla
  });
}

// Retorna un booleno
function isCurrentMonth(date) {
  //Asegurar que las fechas a comparar son un objeto date
  const dateToCompare = new Date(date);
  const today = new Date();

  return (
    today.getFullYear() === dateToCompare.getFullYear() &&
    today.getMonth() === dateToCompare.getMonth()
  );
}

//Actualiza el contenido de las tarjetas con las estadisticas computadas
function renderStatistics() {
  const statistics = getStatistics(); // calcula las estadisticas en base a las facturas cargadas

  statistics.forEach((statistic, idx) => {
    statisticsCardsElems[idx].firstElementChild.textContent = statistic;
  });
}

//Retorna las estadisticas solicitadas en el enunciado
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
    averageBilled = totalBilled / 1278; // Calculo el promedio sobre total de clientes
  }

  return [totalBilled, averageBilled.toFixed(2), clientsOverThousand];
}

//Renderiza una notificacion en base con un mensaje y una clase de error o exito para los estilos
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
