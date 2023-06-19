// Desarrollar una página web con HTML, CSS y Javascript que permita:
// - Cargar los siguientes datos referentes a taxis de la ciudad: dominio (patente formada
// por tres letras y tres dígitos o patente formada por dos letras, tres dígitos, y dos
// letras), recaudación del mes de mayo (en $), cantidad de viajes realizados en el
// mismo mes, color original del vehículo antes de ser pintado como taxi (se debe
// elegir de un combo con las siguientes opciones: rojo, azul, gris, blanco, otros).
//
// - Contener un botón que permita obtener, una vez cargados todos los datos, la
// siguiente estadística a partir de lo cargado en memoria: recaudación total (de todos
// los taxis), promedio de viajes realizados por vehículo en el mes de mayo, cantidad
// de autos cuyas patente o dominio finalice en numeración par, cantidad de viajes
// realizados por autos que originalmente eran de color blanco.

//Colores del auto antes de ser repintado como taxi
//Declararlo globalmente me permite luego agregar una opcion mas
//sin necesidad de modificar mucho codigo
const coloresAuto = ["rojo", "azul", "gris", "blanco"];

const selectColores = document.querySelector("#color");

coloresAuto.forEach((color) => {
  const opcion = document.createElement("option"); // Creo la opcion del select
  opcion.textContent = color; // Actualizo el contenido del option con el color del auto
  opcion.value = color; // Actualizo el valor del option con el color del auto
  selectColores.appendChild(opcion); //Anexo el elemento creado al select
});

//Listado de los dominios/patentes registradas
const dominios = new Set();
//Recaudacion total entre todos los taxis
let recaudacionTotal = 0;
//Cantidad de vehiculos cuyo dominio finaliza con numeracion par
let cantVehiculosDomPar = 0;
//Cantidad de viajes de autos originalmente blancos
let cantViajesAutosBlancos = 0;
//Total de viajes realizados, para luego poder calcular el promedio x vehiculo
let totalViajes = 0;
//Promedio de viajes por vehiculo en el mes
let promViajesPorVehiculo = 0;

const formulario = document.querySelector("#formulario-carga");

//Agrego la escucha al evento submit del formularios
formulario.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target); // instancio un objeto FormData con el formulario
  const { dominio, recaudacion, cantViajes, color } =
    Object.fromEntries(formData); // extraigo los valores necesarios del objeto generado

  if (!dominio || !recaudacion || !cantViajes) {
    return alert("campos vacios");
  }

  if (dominio.length < 6 || dominio.length > 7) {
    return alert("dominio/patente invalida [6-7 caracteres max]");
  }

  if (dominios.has(dominio)) {
    return alert("el dominio ingresado ya fue cargado");
  }

  if (esDominioValido(dominio)) {
    dominios.add(dominio);
    totalViajes += Number(cantViajes);
    recaudacionTotal += Number(recaudacion);
    if (color === "blanco") cantViajesAutosBlancos += Number(cantViajes);
    promViajesPorVehiculo = Math.round(totalViajes / dominios.size || 0);

    //Si el el dominio finaliza en numero par
    if (esPar(Number(dominio.at(-1)))) {
      cantVehiculosDomPar++;
    }

    formulario.reset();
    console.log({
      dominios,
      totalViajes,
      recaudacionTotal,
      cantViajesAutosBlancos,
      promViajesPorVehiculo,
    });
    if (dominios.size >= 5) return mostrarResultado();
  } else {
    return alert("dominio invalido");
  }
}

//vieja aaa 000 -> 6
//nueva aa 123 aa -> 7

const LETRAS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "w",
  "v",
  "x",
  "y",
  "z",
];
const NUMEROS = [...Array(10).keys()];

function esDominioValido(dominio) {
  //Si el largo de la cadena es 6 significa que es una patente 'vieja'
  if (dominio.length === 6) {
    const letras = dominio.slice(0, 3).split(""); //extraigo los primeros 3 caracteres
    const digitos = dominio.slice(3, 6).split(""); //extraigo los ultimos 3 caracteres

    //valido que los caracteres en cada fragmento sean los correspondientes a un dominio valido
    return (
      letras.every((l) => LETRAS.includes(l.toLowerCase())) &&
      digitos.every((d) => NUMEROS.includes(Number(d)))
    );
  }

  //Si el largo de la cadena es 6 significa que es una patente 'nueva'
  if (dominio.length === 7) {
    console.log("7 caracteres");
    const letras = dominio.slice(0, 2).concat(dominio.slice(5, 7)).split("");
    const digitos = dominio.slice(0, 2).split(""); // primeros 2 digitos
    console.log(letras);

    //valido que los caracteres en cada fragmento sean los correspondientes a un dominio valido
    return (
      letras.every((l) => LETRAS.includes(l.toLowerCase())) &&
      digitos.every((d) => NUMEROS.includes(Number(d)))
    );
  }
}

function esPar(numero) {
  return numero % 2 === 0;
}

function mostrarResultado() {
  const resultados = document.createElement("section");

  resultados.innerHTML = `
    <h2>recaudacion total: ${recaudacionTotal}<h2>
    <h2>promedio viajes por vehiculo: ${Math.round(
      totalViajes / dominios.size || 0
    )}<h2>
    <h2>cant patentes con finalizacion par ${cantVehiculosDomPar}<h2>
    <h2>cantidad de viajes realizados por vehiculos originalmente blancos${cantViajesAutosBlancos}<h2>
    <button onClick='window.location.reload()'>Cargar nuevos datos<button>
  `;
  document.body.innerHTML = "";
  document.body.append(resultados);
}
