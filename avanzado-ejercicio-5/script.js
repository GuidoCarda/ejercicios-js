const form = document.querySelector("form");
const resultSection = document.querySelector(".result");

form.addEventListener("submit", handleSubmit);

const accountHolders = new Set();
let highestConsumtion = 0;
const familyPopulationOver100KWH = [];
const idsEndingCount = Array(10).fill(0);

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  //Extraer valores del formulario
  const { consumtion, holderId, cohabitants } = Object.fromEntries(formData);

  //Validar por vacio
  if (!consumtion || !holderId) {
    return alert("campos consumo y dni requeridos");
  }

  //Validar que sean numeros
  if (isNaN(consumtion) || isNaN(holderId)) {
    return alert("El consumo y el dni deben ser numeros");
  }

  //Validar valores negativos
  if (consumtion < 0) {
    return alert("el consumo no puede ser negativo");
  }

  //Validar existencia
  if (accountHolders.has(holderId)) {
    return alert(`el titular ${holderId} ya fue cargado al sistema`);
  }

  //Validar dni
  if (holderId.length !== 8) {
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

  //Si la seccion de resultados tiene contenido lo limpiamos para su posterior actualizacion
  if (resultSection.hasChildNodes()) {
    resultSection.innerHTML = "";
  }

  //Creo titulo y contenido de mayor consumo registrado
  const highestConsumtionEl = document.createElement("h2");
  highestConsumtionEl.textContent = `El mayor consumo fue de ${highestConsumtion} KMH`;

  //Creo titulo y contenido del listado de habitantes de familias cuyo consumo fue superior a 100kwm
  const familyPopulationTitle = document.createElement("h2");
  familyPopulationTitle.textContent =
    "Cantidas de habitantes en hogares con un consumo mayor a 100kwh";
  const familyPopulationList = document.createElement("ul");

  // Si no se registro un consumo superior a 100kwh muestro el mensaje correspondiente
  if (!familyPopulationOver100KWH.length) {
    familyPopulationList.innerHTML = `<li>No hubo ninguna familia con un consumo mayor a 100KWH</li>`;
  } else {
    //Si hay entradas, genero los list items correspondientes
    familyPopulationOver100KWH.forEach((population) => {
      const li = document.createElement("li");
      //Opciones disponibles: 1,2,3,4 y mas de 4 (opcion 5)
      li.textContent =
        population === "5"
          ? "mas de 4 integrantes"
          : `${population} integrantes`;
      familyPopulationList.appendChild(li);
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

  //Anexo los nodos generados al contenedor previamente seleccionado y limpiado
  resultSection.append(
    highestConsumtionEl,
    familyPopulationTitle,
    familyPopulationList,
    idsEndingCountList
  );
}
