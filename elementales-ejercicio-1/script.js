const cadena = "teclado";
const vocales = ["a", "e", "i", "o", "u"];

function contarCaracteres(cadena) {
  return cadena.trim().split(" ").join("").length;
}

function contarVocales(cadena) {
  let cant = 0;
  for (const char of cadena.trim().toLowerCase()) {
    if (vocales.includes(char)) cant++;
  }
  return cant;
}
