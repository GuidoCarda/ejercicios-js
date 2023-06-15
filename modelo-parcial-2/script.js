/* 

Desarrollar una página web con HTML, CSS y Javascript que permita:

- Generar un arreglo cargado con 732 objetos cuyos atributos son:
    -Edad (debe generarla como un número aleatorio entre 20 y 120).
    -Número preferido (debe generarlo como un número entero aleatorio entre 0 y 100).
    -Cantidad de libros leídos en la última década (debe generarlo como un número aleatorio entre 1 y 50).


- Al finalizar la generación del arreglo anterior, debe mostrar 
  - la cantidad de personas de cada edad 
  -el porcentaje de números pares preferidos y el porcentaje de números impares preferidos respecto al total de números.
  - la cantidad de libros leídos por la gente de cada rango etáreo siendo el rango etáreo la década (por ejemplo, la cantidad de libros leídos por las personas de 20 a 30 años, la cantidad de libros leídos por las personas de 30 a 40 años, etc).  */

const CANT_PERSONAS = 732;

const mainEl = document.querySelector("main"); //Selecciono el nodo para posteriormente popularlo con los datos requeridos

//Genero un arreglo de objetos con los datos solicitados
const personas = generarArreglo(CANT_PERSONAS);
//Itero el arreglo generado y calculo los diferentes valores necesarios, retorno un objeto con los mismos
const analiticas = obtenerAnaliticas(personas);
//Muestro por pantalla los resultados previamente computados
mostrarAnaliticas(analiticas);

function generarEnteroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generarArreglo(cantidad) {
  return Array.from({ length: cantidad }, () => ({
    edad: generarEnteroAleatorio(20, 120),
    numeroPreferido: generarEnteroAleatorio(0, 100),
    cantLeidos: generarEnteroAleatorio(1, 50), // cant libros leidos
  }));
}

function esPar(numero) {
  return numero % 2 === 0;
}

function obtenerPorcentaje(parcial, total) {
  return Math.round((parcial * 100) / total);
}

function obtenerAnaliticas(datos) {
  const cantPorEdad = Array(101).fill(0); // Genero un arreglo de 101 elementos y lo relleno con ceros
  const cantLeidosPorDecada = Array(11).fill(0);

  let ceros = 0;
  let pares = 0;
  let impares = 0;

  //Recorro el arreglo de datos
  for (const dato of datos) {
    const { edad, numeroPreferido, cantLeidos } = dato; // Desestructuro/extraigo los datos necesarios

    // Sumo 1 a la edad correspondiente
    // console.log(edad);
    cantPorEdad[edad - 20]++;

    if (edad - 20 === 100) console.log({ edad, acum: cantPorEdad[edad - 20] });

    //dependiendo si el numero preferido es 0, par o impar, lo acumulo en la variable correspondiente
    if (numeroPreferido === 0) {
      ceros++;
    } else if (esPar(numeroPreferido)) {
      pares++;
    } else {
      impares++;
    }

    let indiceDecada = Math.floor(edad / 10) - 2;
    cantLeidosPorDecada[indiceDecada] += cantLeidos;
  }

  // calculo los porcentajes de pares e impares
  let porcentajes = {
    par: obtenerPorcentaje(pares, CANT_PERSONAS - ceros) || 0,
    impar: obtenerPorcentaje(impares, CANT_PERSONAS - ceros) || 0,
  };

  console.log(cantPorEdad);

  //Retorno los valores necesarios en un objeto
  return { cantPorEdad, porcentajes, cantLeidosPorDecada };
}

function mostrarAnaliticas(analiticas) {
  const { cantPorEdad, porcentajes, cantLeidosPorDecada } = analiticas; // desestructuro el objeto analiticas

  //Genero listado edades y lo populo
  const listaEdades = document.createElement("ul");

  cantPorEdad.forEach((cant, i) => {
    if (cant !== 0) {
      const li = document.createElement("li");
      li.textContent = `${i + 20} años: ${cant}`;
      listaEdades.appendChild(li);
    }
  });

  listaEdades.classList.add("lista-edades");

  //Genero titulo nros pares
  const porcentajePares = document.createElement("h2");
  porcentajePares.textContent = `numero preferido par ${porcentajes.par}%`;
  //Genero titulo nros impares
  const porcentajeImpares = document.createElement("h2");
  porcentajeImpares.textContent = `numero preferido impar:${porcentajes.impar}%`;

  porcentajePares.classList.add("porcentajes");
  porcentajeImpares.classList.add("porcentajes");

  //Genero listado libros leidos por rango etario y lo populo
  const listaLibrosLeidosPorDecada = document.createElement("ul");

  cantLeidosPorDecada.forEach((cant, i) => {
    const li = document.createElement("li");
    li.textContent = `${(i + 2) * 10}: ${cant} libros leidos`;
    listaLibrosLeidosPorDecada.appendChild(li);
  });

  listaLibrosLeidosPorDecada.classList.add("lista-decadas");

  const botonReinicio = document.createElement("button");
  botonReinicio.classList.add("randomizar-btn");
  botonReinicio.textContent = "randomizar";
  botonReinicio.onclick = () => window.location.reload();

  //Anexo los nodos creados previamente al cuerpo del documento
  mainEl.append(
    listaEdades,
    porcentajePares,
    porcentajeImpares,
    listaLibrosLeidosPorDecada,
    botonReinicio
  );
}
