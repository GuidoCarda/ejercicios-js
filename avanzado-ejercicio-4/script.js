// El personal de alumnado tiene una planilla con el legajo de cada alumno (un número de 1 a 999), la cantidad de materias rendidas, el promedio del alumno (un número entero de uno a diez).

// Necesitamos conocer, a través de un programa, la cantidad de alumnos cuyo promedio supera los seis puntos, cantidad de alumnos que hay con cada promedio, legajos de los alumnos a los que el promedio les da 10.

// Alumno 1-999
// cantRendidas n
// promedio     k ( entero de 1 - 10 )

// se necesita:
// cantAlumnos => prom > 6
// cantAlumnos por prom
// legajos => alumnos prom = 10

const TOTAL_SUBJECTS = 10;

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("button");

const topScoringStudentsEl = document.querySelector(".topScoringStudents-list");
const averagesEls = document.querySelectorAll(".average");
const studentsAboveSixCountEl = document.querySelector(
  ".studentsAboveSix-count"
);

form.addEventListener("submit", handleSubmit);
inputs.forEach((input) => input.addEventListener("blur", handleBlur));

const students = new Map();

loadStudents(students, 100);
const analytics = getAnalytics(students);
renderAnalytics(analytics);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const student = Object.fromEntries(formData);

  const hasErrors = [...inputs].some(
    (input) => input.classList.contains("error") || !input.value
  );

  if (hasErrors) return alert("Valores invalidos");

  students.set(student.fileNumber, [
    student.completedSubjects,
    student.gradesAverage,
  ]);

  form.reset();
  const analytics = getAnalytics(students);
  renderAnalytics(analytics);
}

function handleBlur(e) {
  const { id, value } = e.target;
  const errorElement = document.getElementById(`${id}-error`);
  const error = validateInput(id, value);

  if (error) {
    errorElement.textContent = error;
    // submitBtn.disabled = true;
    e.target.classList.add("error");
  } else {
    e.target.classList.remove("error");
    errorElement.textContent = "";
  }
}

function validateInput(id, value) {
  if (!value) {
    return `Campo requerido`;
  }

  if (id === "fileNumber") {
    if (value < 0 || value > 999) {
      return alert("El legajo debe ser un valor entre 0 y 999");
    }
    if (students.has(value)) {
      return `El legajo ${value} ya existe`;
    }
  }

  if (id === "completedSubjects" && (value < 1 || value > TOTAL_SUBJECTS)) {
    return `Valor fuera de rango (1-${TOTAL_SUBJECTS})`;
  }

  if (id === "gradesAverage" && (value < 1 || value > 10)) {
    return `Valor fuera de rango (1-10)`;
  }
}

function renderAnalytics({
  studentsAboveSixCount = 0,
  averageCountByGrade = [],
  topScoringStudents = [],
}) {
  studentsAboveSixCountEl.textContent = `${studentsAboveSixCount} alumnos`;

  averageCountByGrade.forEach((count, idx) => {
    averagesEls[idx].textContent = count;
  });

  if (topScoringStudentsEl.hasChildNodes()) {
    topScoringStudentsEl.innerHTML = "";
  }

  if (!topScoringStudents.length) {
    topScoringStudentsEl.innerHTML =
      '<li class="empty-state">No hay alumnos con promedio de 10</li>';
  }

  topScoringStudents.forEach((nroLegajo) => {
    const li = document.createElement("li");
    li.textContent = `Alumno ${nroLegajo}`;
    li.classList.add("student");
    topScoringStudentsEl.appendChild(li);
  });
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

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
  //Cant alumnos con prom > 6
  let studentsAboveSixCount = 0;
  //Cant alumnos por prom
  const averageCountByGrade = Array(10).fill(0);
  //legajos de alumnos cuyo prom = 10
  const topScoringStudents = [];

  for (const student of students.entries()) {
    const [fileNumber, [_, gradesAverage]] = student;

    if (gradesAverage > 6) studentsAboveSixCount++;

    averageCountByGrade[gradesAverage - 1]++;

    if (Number(gradesAverage) === 10) {
      topScoringStudents.push(fileNumber);
    }
  }

  return {
    studentsAboveSixCount,
    averageCountByGrade,
    topScoringStudents,
  };
}
