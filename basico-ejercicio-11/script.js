const form = document.querySelector("form");
const areaResult = document.querySelector(".area-result");

form.addEventListener("submit", handleSubmit);

const getTriangleArea = (base, height) => (base * height) / 2;

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formEntries = [...formData.entries()];

  const base = formEntries[0][1];
  const height = formEntries[1][1];

  if (!base.length || !height.length) {
    return alert("campos vacios");
  }

  if (isNaN(base) || isNaN(height)) {
    return alert("el valor debe ser un numero");
  }

  areaResult.innerHTML = `Area: ${getTriangleArea(base, height)}cm`;
}
