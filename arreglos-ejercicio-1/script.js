const numerosEl = document.querySelector("#numeros");
const maximosRelativosEl = document.querySelector("#maximos-relativos");
const buttonEl = document.querySelector("#btn-get-numbers");

const numeroAleatorio = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
// const numeros = Array.from({ length: 10 }, (_) => numeroAleatorio(-100, 100));

buttonEl.addEventListener("click", () => {
  const numeros = generarNumerosAleatorios(undefined, -100, 100);

  renderizarLista(numerosEl, numeros);
  renderizarLista(maximosRelativosEl, obtenerMaximosRelativos(numeros));
});

function generarNumerosAleatorios(cant = 10, min = 0, max = 10) {
  console.log(cant, min, max);
  return Array(cant)
    .fill(0)
    .map((_) => numeroAleatorio(min, max));
}

function obtenerMaximosRelativos(numeros) {
  const maximosRelativos = [];
  for (let i = 1; i < numeros.length - 1; i++) {
    if (numeros[i] > numeros[i - 1] && numeros[i] > numeros[i + 1]) {
      maximosRelativos.push(numeros[i]);
    }
  }
  return maximosRelativos;
}

function renderizarLista(lista, valores) {
  const listItems = [];

  //agrego en cada iteracion el valor al arary
  valores.forEach((valor) => {
    const li = `
      <li>
        ${valor}
      <li>
    `;

    listItems.push(li);
  });

  //Una vez iterados los valores y generado los li, actualizo el DOM
  lista.innerHTML = listItems.join("");
}

const numeros = generarNumerosAleatorios(undefined, -100, 100);

renderizarLista(numerosEl, numeros);
renderizarLista(maximosRelativosEl, obtenerMaximosRelativos(numeros));
