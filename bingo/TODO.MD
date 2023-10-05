# ENUNCIADO:

Se requiere una aplicación que permita cargar todos los cartones
vendidos de cada una de las jugadas de un bingo.
Cuando la carga finaliza, se tiene que inhabilitar el botón de carga y tiene que mostrar una cuadrícula de 90 números en pantalla con un botón que disparará la generación del próximo número.
Diseñar la interface.
La aplicación deberá informar cuando se haya completado línea o
bingo en alguno de los cartones. También deberá informar los datos del
cartón ganador para que lo vea en pantalla toda la sala.
Deberá hacerlo estéticamente atractivo e incluir el logo y los datos
de la entidad en la pantalla donde se van mostrando los números que van
siendo favorecidos.

# Analisis.

Cada carton contiene 15 numeros
Cuenta con 9 filas y 3 columnas
Solo 5 numeros por fila
1,2 o 3 numeros por columas. No puede quedar ninguna vacia

Distribuidos en tres líneas horizontales de cinco números cada una y en nueve columnas verticales,

En las columnas puede haber tres, dos o un número, pero sin que nunca haya una columna sin número.

El bingo de 90 bolas, se juega con cartones de 3 filas con 9 casillas cada una, es decir, una cuadrícula 3 x 9. Dentro de cada fila solo 5 casillas contienen números y el resto permanecen vacías, por tanto cada cartón tiene 15 números del bingo. Los números presentes en los cartones van del 1 al 90, tal como el mismo nombre del juego lo sugiere. La primera columna contiene números del 1 al 9, la segunda del 10 al 19, la tercera, del 20 al 29, la cuarta del 30 al 39, la quinta del 40 al 49, la sexta del 50 al 59, la séptima del 60 al 69, la octava del 70 al 79 y por última la novena del 80 al 90.

### Como se juega al bingo

En el bingo se extraen al azar un a una hasta 90 bolas numeradas del 1 al 90.

Puede haber un número ilimitado de jugadores, cada uno con al menos un cartón.

Cada cartón contiene 15 números de los 90 posibles.

Conforme se van extrayendo las bolas al azar, los jugadores deben tachar los números coincidentes de su cartón.

Dos tipos de ganadores en cada jugada

1. Gana la persona o personas que antes tachen una fila completa (Llamado línea). Se da un premio menor y el juego continúa.
2. Gana la persona o personas que antes tachen el cartón completo (Llamado bingo). Se da un premio mayor y el juego termina.

### Cartón de juego

El cartón o tarjeta que compra el jugador cuenta con 15 números distintos y distribuidos en tres líneas horizontales de cinco números cada una y en nueve columnas verticales, distribuidos sobre una base de 90 números consecutivos.

- [x] Generar carton vacio
- [x] Cargar carton
  - [x] Cumplir restricciones carton (nros por fila, nros total, nros por columna)
- [x] Imprimir carton
- [x] Imprimir mas de 1 carton
- [x] Generar numero aleatorio unico en rango ( 1-90)
- [x] Agregar estado a el carton para saber si hubo coincidencia con alguno de los numeros del mismo {value, state: '' | 'match'}
- [x] Mostrar Ficha en el carton si hay coincidencia cell.state === 'match'
- [x] Checkear BINGO!
- [] Generar cartones de manera creciente. Actualmente son aleatorios, cada columna debe estar ordenada respectivamente.
- [] Checkear Linea

1- Obtengo columna
2- Obtengo limites
3- Obtengo fila

4-Checkeo que este libre
Si esta libre lo posiciono
Si esta ocupado y hay lugar en la columna, genero otro nro de fila.
Si no hay lugar en la columna, genero otra columna diferente y vuelvo al punto 2.

### Obtener numero en rango con restricciones

getRandomIntInRange(start,end)

restrictions: numbers[];

getRandomIntInRangoWithExclusions(1,10,[2,5,6])

getRandomIntInRangoWithExclusions(start, end, exclusions){
// obtengo numero aleatorio.
// Está el numero en restrictions?
// Si esta, obtengo otro numero aleatorio
// devuelvo el numero aleatorio
}
