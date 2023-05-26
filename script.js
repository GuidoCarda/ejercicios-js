const EXERCISES = [
  {
    title: "Ejercicio 1",
    desc: "Ingresando un año del último siglo, averiguar si es o no bisiesto. (divisible por cuatro, pero no por 100 aunque sí por 400).",
    done: true,
    category: "basico",
  },
  {
    title: "Ejercicio 2",
    desc: "Ingresando una temperatura, convertirla a las otras tres escalas. Las escalas conocidas son: Roemer (°R), Farenheit (°F), Celsius (°C), Kelvin (°K). Hacer una interfaz ingeniosa con varios controles.",
    done: true,
    category: "basico",
  },
  {
    title: "Ejercicio 3",
    desc: "Ingresando dos números enteros por teclado decir si son pares y la cantidad de enteros que hay entre ambos. (validar que los datos ingresados sean numéricos y enteros).",
    done: true,
    category: "basico",
  },
  {
    title: "Ejercicio 4",
    desc: "Ingresar dos números. Si son iguales, mostrar el cuadrado del primero. Si el segundo es mayor que el primero, mostrar el cuadrado del segundo dividido el primero. Si el segundo es menor que el primero, mostrar el cubo del segundo menos el primero.",
    done: true,

    category: "basico",
  },
  {
    title: "Ejercicio 5",
    desc: "Una empresa se dedica a la fabricación de tanques cilíndricos con tapa de distintos materiales. Necesita un programa que le permita ingresar el radio de la base, la altura y el costo del metro cuadrado de material y le calcule el costo con el 25% de ganancia.",
    done: false,
    category: "basico",
  },
  {
    title: "Ejercicio 6",
    desc: "Ingresando por teclado la cantidad de horas trabajadas en un mes por un trabajador, calcular el total a percibir por el mismo, sabiendo que las horas que superen de 170 se pagan como extras al 100%. El valor hora también se debe ingresar por teclado. Si el neto a percibir supera los $20.000 se le debe descontar el 5% en concepto de retenciones.",
    done: false,
    category: "basico",
  },
  {
    title: "Ejercicio 7",
    desc: "Ingresando la edad de tres personas, calcular el promedio de las dos más viejas y decir cuántas son mayores de 18 años.",
    done: true,

    category: "basico",
  },
  {
    title: "Ejercicio 8",
    desc: "Hacer un programa que permita convertir pesos a dólares y a reales. Para ello, el programador ya conoce la cotización de ambas monedas.",
    done: true,

    category: "basico",
  },
  {
    title: "Ejercicio 9",
    desc: "Se requiere un programa que posibilite el ingreso por teclado de tres números reales. Si están en orden mostrar la suma de los tres, si no están ordenados al ingresarlos, mostrar el producto entre los tres.",
    done: false,
    category: "basico",
  },
  {
    title: "Ejercicio 10",
    desc: "Ingresar dos números. Si ambos son positivos, sumarlos y mostrar la suma. Caso contrario y si, además, ninguno es cero, mostrar la diferencia entre ambos.",
    done: false,
    category: "basico",
  },
  {
    title: "Ejercicio 11",
    desc: "Ingresar la altura y la base de un triángulo. Calcular y mostrar la superficie si es posible. Caso contrario mostrar un cartel indicando la imposibilidad de mostrarlos.",
    done: true,

    category: "basico",
  },
  {
    title: "Ejercicio 12",
    desc: "Solicitando que se ingrese un número entero de 1 a 10 por teclado (validarlo), calcular y mostrar la tabla de dicho número. Debe contener un enlace para que se pueda volver a ejecutar la página para otro número.",
    done: false,
    category: "basico",
  },
  {
    title: "Ejercicio 13",
    desc: "Calcular el factorial de un número que se ingresa por teclado. Validar el número para que sea entero.",
    done: true,

    category: "basico",
  },
  {
    title: "Ejercicio 14",
    desc: "Mostrar la secuencia de la serie de Fibonacci para los n primeros términos siendo n un número natural que se ingresa por teclado. Validar que sea natural.",
    done: false,
    category: "basico",
  },
  {
    title: "Ejercicio 1",
    desc: "Una empresa de cable necesita un programa en Javascript que permita la carga y la estadística de la facturación mensual. Emite una factura por mes para cada cliente. Para ello cuenta con los siguientes datos por cada factura que emite: fecha de la factura, número de cliente (un número que puede ser de 1 a 1278), monto de la factura, concepto de facturación. El programa debe permitir la carga de todas las facturas del mes y obtener un informe que incluya: cantidad total facturada, promedio de facturación por cliente, cantidad de clientes cuya facturación es superior a mil pesos.",
    done: true,
    category: "avanzado",
  },
  {
    title: "Ejercicio 2",
    desc: "Una concesionaria de automóviles registra en una planilla los datos de las personas que vienen a preguntar por algún plan o para la compra de algún automóvil. Los vehículos los tiene divididos en cuatro categorías que están numeradas del 1 al 4, a saber: 1-sedan, 2-pickups, 3-standard, 4-superiores. Los datos que se le piden a los interesados son: Nombre y apellido, edad, género, estado civil, cantidad de hijos, categoría del vehículo que le interesa, importe que está dispuesto a pagar por un auto. El programa que la concesionaria necesita debe permitir cargar los datos necesarios para obtener los siguientes resultados: cantidad de personas que consultan y se interesan por un vehículo de un monto superior a los $1.000.000, cantidad de personas que optaron por cada categoría, porcentaje de hombres que hicieron consultas respecto al total.",
    done: false,
    category: "avanzado",
  },
  {
    title: "Ejercicio 3",
    desc: "Salimos a la calle a hacer una encuesta. En la misma preguntábamos: Edad, género, día de la semana que más le gusta, mes del año que más le gusta. A partir del volcado de esos datos a un programa, obtener: cantidad de encuestas realizadas, día de la semana que más prefiere la gente, cantidad de personas que prefieren meses pares, cantidad de personas que prefieren cada mes del año, porcentaje de hombres que no prefieren el domingo respecto al total de hombres.",
    done: false,
    category: "avanzado",
  },
  {
    title: "Ejercicio 4",
    desc: "El personal de alumnado tiene una planilla con el legajo de cada alumno (un número de 1 a 999), la cantidad de materias rendidas, el promedio del alumno (un número entero de uno a diez). Necesitamos conocer, a través de un programa, la cantidad de alumnos cuyo promedio supera los seis puntos, cantidad de alumnos que hay con cada promedio, legajos de los alumnos a los que el promedio les da 10.",
    done: false,
    category: "avanzado",
  },
  {
    title: "Ejercicio 5",
    desc: "Desarrollar la siguiente interfaz. Después de que se hayan cargado 100 datos, obtener: KWH consumidos por quien más consumió, cantidad de habitantes de cada grupo que consumió más de 100 KWH, cantidad de personas con cada terminación de documento.",
    done: false,
    category: "avanzado",
  },
  {
    title: "Ejercicio 1",
    desc: "Deberá cargar un vector de 100 elementos por medio de un programa en Javascript, con números aleatorios entre -100 y 100. Realizar una función para mostrar los máximos relativos. Un máximo relativo es aquel término que es mayor que sus dos adyacentes.",
    done: false,
    category: "arreglos",
  },
  {
    title: "Ejercicio 2",
    desc: "Escribir un programa en Javascript que cargue en un array las notas de 30 alumnos de un curso (hacerlo con números al azar entre 0 y 10). Luego deberá armar una función llamada Abanderado que devolverá la nota de los 3 mejores alumnos. Fuera de la función, deberá imprimir las 3 notas y la ubicación de cada una dentro del array.",
    done: false,
    category: "arreglos",
  },
  {
    title: "Ejercicio 3",
    desc: "Escribir un programa en Javascript que cargue un array de 50 elementos con números al azar entre -500 y 500, y que no se repitan. Luego deberá armar una función llamada Calculos que devolverá la suma de todos los elementos del array, la cantidad de números positivos y la cantidad de números negativos que se encuentren en el array. Fuera de la función, deberá imprimir esos tres valores. Por último, deberá armar un nuevo array sólo con los números negativos encontrados en el anterior. Deberá imprimirlo por pantalla, y en caso de que no se haya encontrado ningún número negativo, informar por pantalla de esta situación.",
    done: false,
    category: "arreglos",
  },
];

const exercisesListElems = document.querySelectorAll(".exercises-list");

EXERCISES.forEach((exercise) => {
  //Extraigo el titulo y la descripcion del ejercicio
  const { title, desc, done, category: category } = exercise;

  //Creo el listItem
  const listItem = document.createElement("li");

  //Relleno el li con la estructura desesada
  listItem.innerHTML = `
  <a href="${done ? getPagePath(title, category) : "#"}" class="exercise-card ${
    !done ? "pending" : ""
  }">
    <h2 class="exercise-card--title">${title}</h2>
    <p class="exercise-card--desc">
      ${desc}
    </p>
  </a>
  `;

  //Añado el li al ul
  if (category === "basico") {
    exercisesListElems[0].appendChild(listItem);
  } else if (category === "avanzado") {
    exercisesListElems[1].appendChild(listItem);
  } else if (category === "arreglos") {
    exercisesListElems[2].appendChild(listItem);
  }
});

//Obtengo el path relativo de cada pagina
function getPagePath(title, category) {
  const exerciseFolder = title.split(" ").join("-").toLowerCase();
  return `./${category}-${exerciseFolder}/index.html`;
}
