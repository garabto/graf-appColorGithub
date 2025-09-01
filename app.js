// Referencias
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const redVal = document.getElementById("redVal");
const greenVal = document.getElementById("greenVal");
const blueVal = document.getElementById("blueVal");
const rgbInput = document.getElementById("rgbInput");
const hexInput = document.getElementById("hexInput");
const colorPreview = document.getElementById("colorPreview");
const colorPicker = document.getElementById("colorPicker");

// Función para actualizar el preview
function updateColor(r, g, b) {
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hex = rgbToHex(r, g, b);
  colorPreview.style.backgroundColor = rgb;
  rgbInput.value = `${r},${g},${b}`;
  hexInput.value = hex;
  red.value = r;
  green.value = g;
  blue.value = b;
  redVal.textContent = r;
  greenVal.textContent = g;
  blueVal.textContent = b;
  colorPicker.value = hex;
}

// Convertir RGB → HEX
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Convertir HEX → RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((h) => h + h).join("");
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// Eventos sliders
[red, green, blue].forEach((slider) =>
  slider.addEventListener("input", () =>
    updateColor(red.value, green.value, blue.value)
  )
);

// Input RGB
rgbInput.addEventListener("input", () => {
  const parts = rgbInput.value.split(",").map((x) => parseInt(x.trim()));
  if (parts.length === 3 && parts.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
    updateColor(parts[0], parts[1], parts[2]);
  }
});

// Input HEX
hexInput.addEventListener("input", () => {
  const hex = hexInput.value.trim();
  if (/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex)) {
    const [r, g, b] = hexToRgb(hex);
    updateColor(r, g, b);
  }
});

// Color Picker
colorPicker.addEventListener("input", () => {
  const [r, g, b] = hexToRgb(colorPicker.value);
  updateColor(r, g, b);
});

// Inicial
updateColor(0, 0, 0);
