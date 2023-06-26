// "Se requiere un programa que posibilite el ingreso por teclado de tres números reales. Si están en orden mostrar la suma de los tres, si no están ordenados al ingresarlos, mostrar el producto entre los tres.",

const num1 = prompt("ingrese un numero");
const num2 = prompt("ingrese un numero");
const num3 = prompt("ingrese un numero");

if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
  alert("un valor ingresado no es un numero");
} else {
  if (num1 < num2 && num2 < num3) {
    console.log(`suma: ${Number(num1) + Number(num2) + Number(num3)}`);
  } else {
    console.log(`producto: ${num1 * num2 * num3}`);
  }
}
