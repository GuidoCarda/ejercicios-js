// El personal de alumnado tiene una planilla con el legajo de cada alumno (un número de 1 a 999), la cantidad de materias rendidas, el promedio del alumno (un número entero de uno a diez).

// Necesitamos conocer, a través de un programa, la cantidad de alumnos cuyo promedio supera los seis puntos, cantidad de alumnos que hay con cada promedio, legajos de los alumnos a los que el promedio les da 10.

// Alumno 1-999
// cantRendidas n
// promedio     k ( entero de 1 - 10 )

// se necesita:
// cantAlumnos => prom > 6
// cantAlumnos por prom
// legajos => alumnos prom = 10

// Constante que indica el total de materias
const TOTAL_SUBJECTS = 10;

const form = document.querySelector("form"); // Formulario de carga de datos
const inputs = document.querySelectorAll("input"); // Todos los inputs del documento
const submitBtn = document.querySelector("button"); // El boton de submit del formulario

const topScoringStudentsEl = document.querySelector(".topScoringStudents-list"); // Listado de resultados
const studentsAboveSixCountEl = document.querySelector(
  ".studentsAboveSix-count"
); // h2 que muestra el contador de promedios mayor a 6

//Popula el listado de contador de promedios por nota dinamicamente
printAveragesList(); // luego solo actualizo el contador

// NodeList que contendra todos los spans para los contadores de promedios
const averagesEls = document.querySelectorAll(".average");

form.addEventListener("submit", handleSubmit);

//En este caso decidi implementar una validacion en el evento blur.
//Lo hice agregando una clase error a los inputs cuyo valor es invalido y asi luego en el evento submit
//prevenir el mismo si existen errores.
inputs.forEach((input) => input.addEventListener("blur", handleBlur));

const students = new Map(); // Map vacio que contendra los alumnos

loadStudents(students, 25); // Carga aleatoriamente 25 alumnos para tener algunos datos
const analytics = getAnalytics(students); // Calcula las analiticas
renderAnalytics(analytics); // Muestra las analiticas en pantalla

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const student = Object.fromEntries(formData); // Retorna un objeto con los valores del formulario

  const hasErrors = [...inputs].some(
    (input) => input.classList.contains("error") || !input.value
  ); // retorna true si alguno de los imputs tiene la clase error o si alguno esta vacio

  if (hasErrors) return alert("Valores invalidos"); // si se encontraror errores retorno una alerta

  //Cargo el estudiante.
  // key: el numero de legajo
  // value: un arreglo que contiene [materias completadas, promedio]
  students.set(student.fileNumber, [
    student.completedSubjects,
    student.gradesAverage,
  ]);

  form.reset(); // reinicio el formulario
  const analytics = getAnalytics(students); //Calculo las analiticas
  renderAnalytics(analytics); // Renderizo las analiticas previamente calculadas
}

function handleBlur(e) {
  const { id, value } = e.target; // extraigo el id y el valor del input en el evento blur
  const errorElement = document.getElementById(`${id}-error`); //Selecciono el span de error del campo correspondiente
  const error = validateInput(id, value); // Valido el input

  if (error) {
    errorElement.textContent = error; // muestro el error
    e.target.classList.add("error"); // agrego la clase error para hacer visible el mismo
  } else {
    e.target.classList.remove("error"); // elimino la clase error para ocultar el mismo
    errorElement.textContent = ""; // limpio el mensaje de error
  }
}

// recibe el id del input y su valor, retorna un string que contiene el error o undefined si no hay error
function validateInput(id, value) {
  //Validacion por vacio
  if (!value) {
    return `Campo requerido`;
  }

  if (id === "fileNumber") {
    //Validacion por rango valido del numero de legajo
    if (value < 0 || value > 999) {
      return "El legajo debe ser un valor entre 0 y 999";
    }
    //Validacion por existencia
    if (students.has(value)) {
      return `El legajo ${value} ya existe`;
    }
  }

  //Validacion de materias por rango de 1 al total de materias
  if (id === "completedSubjects" && (value < 1 || value > TOTAL_SUBJECTS)) {
    return `Valor fuera de rango (1-${TOTAL_SUBJECTS})`;
  }

  //Validacion de promedio por rango valido de 1 a 10
  if (id === "gradesAverage" && (value < 1 || value > 10)) {
    return `Valor fuera de rango (1-10)`;
  }
}

//Renderiza las analiticas que recibe como argumento
function renderAnalytics({
  studentsAboveSixCount = 0,
  averageCountByGrade = [],
  topScoringStudents = [],
}) {
  //Muestra el total de alumnos con promedio > 6
  studentsAboveSixCountEl.textContent = `${studentsAboveSixCount} alumnos`;

  //muestra la cantidad de promedios por cada nota [1-10]
  averageCountByGrade.forEach((count, idx) => {
    averagesEls[idx].textContent = count;
  });

  //Limpia el listado de los alumnos con promedio 10 si ya tiene valores, para evitar duplicacion
  if (topScoringStudentsEl.hasChildNodes()) {
    topScoringStudentsEl.innerHTML = "";
  }

  //Si no hay alumnos con promedio 10 muestra el mensaje correspondiente
  if (!topScoringStudents.length) {
    topScoringStudentsEl.innerHTML =
      '<li class="empty-state">No hay alumnos con promedio de 10</li>';
  }

  // Si hay alumnos con promedio 10, recorre el arreglo que los contiene y lo muestra en pantalla.
  topScoringStudents.forEach((nroLegajo) => {
    const li = document.createElement("li");
    li.textContent = `Alumno ${nroLegajo}`;
    li.classList.add("student");
    topScoringStudentsEl.appendChild(li);
  });
}

//Retorna un entero aleatorio en un rango dado por un valor minimo y un maximo
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Carga n alumnos aleatoriamente para tener datos de muestra
//Por defecto si no recibe como argumento la cantidad genera 20 alumnos
function loadStudents(students, size = 20) {
  Array(size)
    .fill(0)
    .forEach((_, i) => {
      students.set(String(i + 1), [
        getRandomNumber(1, 5),
        getRandomNumber(1, 10),
      ]);
    });
}

function getAnalytics(students) {
  //Contador de alumnos con prom > 6
  let studentsAboveSixCount = 0;
  //Contador de alumnos por promedio
  const averageCountByGrade = Array(10).fill(0);
  //Para almacenar los legajos de alumnos cuyo prom = 10
  const topScoringStudents = [];

  //itero los registros cargados de los alumnos
  for (const student of students.entries()) {
    const [fileNumber, [_, gradesAverage]] = student; // extraigo los datos necesarios.

    //si el promedio es mayor a 6 incremento el contador
    if (gradesAverage > 6) studentsAboveSixCount++;

    //Ingremento el contador en base al promedio del alumno
    averageCountByGrade[gradesAverage - 1]++;

    //Si su promedio es igual a 10, agrego el elemento al array de alumnos con promedio 10
    if (Number(gradesAverage) === 10) {
      topScoringStudents.push(fileNumber);
    }
  }

  //Retorno las analiticas generadas en base a los alumnos registrados
  return {
    studentsAboveSixCount,
    averageCountByGrade,
    topScoringStudents,
  };
}

//Popula el contenido del dom dinamicamente
function printAveragesList() {
  //Selecciono la lista
  const averagesListEl = document.querySelector(".averages-list");

  //agrego los list items que contendran los contadores de promedios por nota
  for (let i = 0; i <= 10; i++) {
    averagesListEl.innerHTML += `
    <li>
      Promedio ${i + 1}
      <span class="average">0</span>
    </li>`;
  }
}
