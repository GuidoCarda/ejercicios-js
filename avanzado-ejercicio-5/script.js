const form = document.querySelector("form"); // formulario de carga
const mainEl = document.querySelector("main");

form.addEventListener("submit", handleSubmit);

// Set para almacenar el dni de los titulares
// Usar un Set me permite asegurar que no van a existir valores duplicados.
// Pudiendo checkear facilmente la existencia de un titular con el metodo .has()
const accountHolders = new Set();
// Variable para almacenar el mayor consumo
let highestConsumtion = 0;
// Arreglo para almacenar la cantidad de habitantes cuyo consumo es superior a 100KWH
const familyPopulationOver100KWH = [];
// Contador por finalizacion de dni del titular
const idsEndingCount = Array(10).fill(0);

// Esta constante global indica el numero de entradas necesarias para mostrar los resultados
const ENTRIES_LIMIT = 3;

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target); //obtengo la informacion del formulario
  //Extraer valores del formulario
  const { consumtion, holderId, cohabitants } = Object.fromEntries(formData);
  /*
    consumtion: consumo del mes
    holderId: dni del titular 
    cohabitants: nro de habitantes del grupo familiar  
  */

  //Validar por vacio
  if (!consumtion || !holderId) {
    return alert("campos consumo y dni requeridos");
  }

  //Validar que sean numeros
  if (isNaN(consumtion) || isNaN(holderId)) {
    return alert("El consumo y el dni deben ser numeros");
  }

  //Validar por valores negativos
  if (consumtion < 0) {
    return alert("el consumo no puede ser negativo");
  }

  //Validar existencia del titular
  if (accountHolders.has(holderId)) {
    return alert(`el titular ${holderId} ya fue cargado al sistema`);
  }

  //Validar dni
  if (!isHolderIdValid(holderId)) {
    return alert("numero de dni invalido");
  }

  //Checkear si el consumo ingresado es superior al maximo registrado, guardarlo si es el caso
  if (consumtion > highestConsumtion) highestConsumtion = consumtion;
  //Si el consumo es superior a 100kwh, almacenar la cantidad de habitantes del hogar
  if (consumtion > 100) familyPopulationOver100KWH.push(cohabitants);
  //Incrementar el contador correspondiente en base a la finalizacion del dni
  idsEndingCount[holderId.at(-1)]++;
  //Almacenar el dni del titular para evitar duplicacion de entradas
  accountHolders.add(holderId);

  form.reset(); // reinicio el formulario para cargar datos

  //Si es el ultimo a cargar cambio el mensaje del boton
  if (accountHolders.size === ENTRIES_LIMIT - 1) {
    document.querySelector(".submit-btn").textContent =
      "cargar y mostrar resultados";
  }

  if (accountHolders.size === ENTRIES_LIMIT) {
    const results = {
      highestConsumtion,
      familyPopulationOver100KWH,
      idsEndingCount,
    };

    printResults(results);
  }
}

// muestra los resultados en pantalla.
function printResults(results) {
  const { highestConsumtion, familyPopulationOver100KWH, idsEndingCount } =
    results;

  //Creo titulo y contenido de mayor consumo registrado
  const highestConsumtionEl = document.createElement("h2");
  highestConsumtionEl.textContent = `El mayor consumo fue de ${highestConsumtion} KMH`;

  //Creo titulo y contenido del listado de habitantes de familias cuyo consumo fue superior a 100kwm
  const familyPopulationTitle = document.createElement("h2");
  familyPopulationTitle.textContent =
    "Cantidas de habitantes en hogares con un consumo mayor a 100kwh";

  //Creo la lista que contendra los habitantes de las familias cuyo consumo fue mayor a 100mwh
  const familyPopulationList = document.createElement("ul");
  familyPopulationList.classList.add("familyPopulation-list");
  // Si no se registro un consumo superior a 100kwh muestro el mensaje correspondiente
  if (!familyPopulationOver100KWH.length) {
    familyPopulationList.innerHTML = `<li>No hubo ninguna familia con un consumo mayor a 100KWH</li>`;
  } else {
    //Si hay entradas, genero los list items correspondientes
    familyPopulationOver100KWH.forEach((population) => {
      const li = document.createElement("li"); // crea un li por cada familia cuyo consumo fue superior a 100kwh
      //Opciones disponibles: 1,2,3,4 y mas de 4 (opcion 5) integrantes
      li.textContent =
        population === "5"
          ? "mas de 4 integrantes"
          : `${population} ${
              population === "1" ? "integrante" : "integrantes"
            }`;
      familyPopulationList.appendChild(li); // Anexa el li a la lista
    });
  }

  //Genero titulo y contenido de la lista de contador de titulares por finalizacion de dni
  const idsEndingCountTitle = document.createElement("h2");
  idsEndingCountTitle.textContent = "Titulares por finalizacion de DNI";
  const idsEndingCountList = document.createElement("ul");
  idsEndingCount.forEach((count, idx) => {
    const li = document.createElement("li");
    li.textContent = `Finalizacion ${idx} = ${count} titulares`;
    idsEndingCountList.appendChild(li);
  });

  //Creo un boton para reiniciar la pagina y cargar nuevos datos
  const button = document.createElement("button");
  button.onclick = () => window.location.reload();
  button.classList.add("reset-btn");
  button.textContent = "cargar nuevos datos";

  mainEl.innerHTML = ""; // Vacio la etiqueta main para solo mostrar los resultados

  mainEl.classList.add("result"); //agrego la clase result para estilar los resultados

  //Anexo los nodos generados al contenedor previamente seleccionado y limpiado
  mainEl.append(
    highestConsumtionEl,
    familyPopulationTitle,
    familyPopulationList,
    idsEndingCountTitle,
    idsEndingCountList,
    button
  );
}

// Valida que el valor ingresado sea un dni.
function isHolderIdValid(holderId) {
  //Expresion regular que permite solo 8 digitos
  const validIdRegex = /^\d{8}$/;
  //Retorna un booleano dependiendo si el string satisface a la expresion regular definida anteriormente
  return validIdRegex.test(holderId);
}
