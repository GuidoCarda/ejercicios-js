const WORDS = ["ala", "Guido", "NeuQuen", "Pato", "arco", "oreo"];

function isPalindrome(word) {
  return word.toLowerCase() === word.split("").reverse().join("").toLowerCase();
}

WORDS.forEach((w) => {
  console.log(`${w} ${isPalindrome(w) ? "es palindromo" : "no es palindromo"}`);
});
