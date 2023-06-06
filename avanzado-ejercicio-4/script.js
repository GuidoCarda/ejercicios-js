// El personal de alumnado tiene una planilla con el legajo de cada alumno (un número de 1 a 999), la cantidad de materias rendidas, el promedio del alumno (un número entero de uno a diez).

// Necesitamos conocer, a través de un programa, la cantidad de alumnos cuyo promedio supera los seis puntos, cantidad de alumnos que hay con cada promedio, legajos de los alumnos a los que el promedio les da 10.

// Alumno 1-999
// cantRendidas n
// promedio     k ( entero de 1 - 10 )

// se necesita:
// cantAlumnos => prom > 6
// cantAlumnos por prom
// legajos => alumnos prom = 10

const CANT_MATERIAS = 10;

const form = document.querySelector("form");
const fileNumberInput = document.querySelector("#nroLegajo");
const standardBearersEl = document.querySelector(".standard-bearers-list");
const averagesEls = document.querySelectorAll(".average");
const avgGreaterThanSixEl = document.querySelector(".average-count");

form.addEventListener("submit", handleSubmit);
fileNumberInput.addEventListener("blur", handleBlur);

function handleBlur(e) {
  const fileNumber = e.target.value;

  //Chekear si ya se cargo el legajo del alumno
  if (alumnos.has(fileNumber)) {
    fileNumberInput.classList.add("error");
  } else {
    fileNumberInput.classList.remove("error");
  }
}

const alumnos = new Map();

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

cargarAlumnos(alumnos);
const analiticas = obtenerAnaliticas(alumnos);
mostrarAnaliticas(analiticas);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const alumno = Object.fromEntries(formData);

  if (!alumno.nroLegajo || !alumno.materiasRendidas || !alumno.promedio) {
    return alert("campos vacios");
  }

  if (alumno.nroLegajo < 0 || alumno.nroLegajo > 999) {
    return alert("el legajo debe ser un valor entre 0 y 999");
  }

  if (alumnos.has(alumno.nroLegajo)) {
    return alert(`el legajo ${alumno.nroLegajo} ya fue cargado`);
  }

  if (alumno.materiasRendidas < 0 || alumno.materiasRendidas > CANT_MATERIAS) {
    return alert(`cant de materias fuera de rango (1-${CANT_MATERIAS})`);
  }

  if (alumno.promedio < 0 || alumno.promedio > 10) {
    return alert(`promedio fuera de rango (1-10)`);
  }

  alumnos.set(alumno.nroLegajo, [alumno.materiasRendidas, alumno.promedio]);

  const analiticas = obtenerAnaliticas(alumnos);
  mostrarAnaliticas(analiticas);
}

function mostrarAlumnos(alumnos) {
  const listaAlumnos = document.createElement("ul");

  for (const alumno of alumnos.entries()) {
    const [legajo, [materiasRendidas, promedio]] = alumno;
    const li = document.createElement("li");
    li.textContent = `alumno ${legajo}: ${materiasRendidas} materias rendidas con un promedio de ${promedio}`;
    listaAlumnos.appendChild(li);
  }

  resultEl.append(listaAlumnos);
}

function mostrarAnaliticas({
  promMayorQueSeis = 0,
  promedios = [],
  abanderados = [],
}) {
  avgGreaterThanSixEl.textContent = `${promMayorQueSeis}`;

  if (standardBearersEl.hasChildNodes()) {
    console.log("entro");
    standardBearersEl.innerHTML = "";
  }

  console.log(abanderados);

  abanderados.forEach((nroLegajo) => {
    const li = document.createElement("li");
    li.textContent = `Alumno ${nroLegajo}`;
    li.classList.add("standard-bearer");
    standardBearersEl.appendChild(li);
  });

  promedios.forEach((cant, idx) => {
    averagesEls[idx].textContent = cant;
  });
}

function cargarAlumnos(alumnos, cant = 20) {
  Array(cant)
    .fill(0)
    .forEach((_, i) => {
      alumnos.set(String(i + 1), [
        getRandomNumber(1, 5),
        getRandomNumber(1, 10),
      ]);
    });
}

function obtenerAnaliticas(alumnos) {
  //Cant alumnos con prom > 6
  let promMayorQueSeis = 0;
  //Cant alumnos por prom
  const promedios = Array(10).fill(0);
  //legajos de alumnos cuyo prom = 10
  const abanderados = [];

  for (const alumno of alumnos.entries()) {
    const [nroLegajo, [cant, prom]] = alumno;

    if (prom > 6) promMayorQueSeis++;

    promedios[prom - 1]++;

    if (Number(prom) === 10) {
      abanderados.push(nroLegajo);
    }
  }

  const cantAlumnos = alumnos.size;

  promedios.forEach((prom) => {
    console.log(Math.round((prom * 100) / cantAlumnos) || 0);
  });

  return { promMayorQueSeis, promedios, abanderados };
}
