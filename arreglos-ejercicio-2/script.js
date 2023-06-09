const CANT_ALUMNOS = 30;

//Genero un array de arrays conteniendo el nro de alumno y su nota
const alumnos = Array(CANT_ALUMNOS)
  .fill(0)
  .map((_, idx) => [idx, numeroAleatorio()]);

//Abanderados retorna un array con los 3 alumnos con mejor nota.
abanderados(alumnos).forEach(([nroAlumno, nota], i) => {
  console.log(
    `Abanderado ${i + 1}: El alumno ${nroAlumno} con la nota ${nota}`
  );
});

//Retorna un entero aleatorio en el rando dado
function numeroAleatorio(min = 0, max = 10) {
  return Math.round(Math.random() * (max - min) + min);
}

//Ordena los alumnos por nota y retorna los 3 alumnos cuya nota fue la mas alta
function abanderados(notas) {
  return notas.sort((a, b) => b[1] - a[1]).slice(0, 3);
}
