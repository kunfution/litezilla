const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const downloadBtn = document.getElementById("downloadBtn");
const exportJSON = document.getElementById("exportJSON");
const randomBtn = document.getElementById("randomBtn");
const sensitivityInput = document.getElementById("sensitivity");
const sensitivityValue = document.getElementById("sensitivityValue");
const paletteSelect = document.getElementById("paletteSelect");
const sourceSelect = document.getElementById("sourceSelect");
const preview = document.getElementById("preview");

const maxCols = 51;
const maxRows = 30;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let currentImage = null;

const UNSPLASH_ACCESS_KEY = "k6UVIq0s8n9C88bjYqUsXQagU2YM1rT01QwD3ltwa2Q";

const palettes = {
  basic: [
    [255, 0, 0], [0, 0, 255], [0, 100, 0],
    [0, 255, 255], [128, 0, 128], [255, 192, 203],
    [144, 238, 144], [255, 255, 255], [105, 105, 105], [255, 255, 0]
  ],
  colorful: [
    [255, 0, 0], [0, 255, 0], [0, 0, 255],
    [255, 255, 0], [255, 0, 255], [0, 255, 255],
    [128, 0, 128], [255, 165, 0], [0, 128, 128],
    [255, 255, 255]
  ],
  grayscale: [
    [0, 0, 0], [64, 64, 64], [128, 128, 128],
    [192, 192, 192], [255, 255, 255]
  ],
  litezilla: [
    [255, 0, 0], [255, 192, 203], [144, 238, 144], [0, 100, 0],
    [255, 165, 0], [0, 0, 0], [255, 255, 255],
    [128, 0, 128], [0, 0, 255], [255, 255, 0], [0, 255, 255]
  ]
};

function getCurrentPalette() {
  return palettes[paletteSelect.value] || palettes.basic;
}

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.onload = () => {
      currentImage = img;
      preview.src = img.src;
      preview.style.display = "block";
      processImage(img);
    };
    img.src = URL.createObjectURL(file);
  }
});

sensitivityInput.addEventListener("input", () => {
  sensitivityValue.textContent = sensitivityInput.value;
  if (currentImage) processImage(currentImage);
});

paletteSelect.addEventListener("change", () => {
  if (currentImage) processImage(currentImage);
});

randomBtn.addEventListener("click", async () => {
  const source = sourceSelect.value;
  let query = "random";

  if (source === "pop") query = "cute vector,cartoon animal";
  else if (source === "art") query = "cute vector,cartoon animal";
  else if (source === "kids") query = "vector,minimalist,flat,illustration,children";


  if (source === "picsum") {
    const rand = Math.floor(Math.random() * 1000);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      currentImage = img;
      preview.src = img.src;
      preview.style.display = "block";
      processImage(img);
    };
    img.src = `https://picsum.photos/300?random=${rand}`;
    return;
  }

  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await res.json();

    if (!data.urls || !data.urls.small) {
      alert("No se encontró imagen. Intenta otra categoría.");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      currentImage = img;
      preview.src = img.src;
      preview.style.display = "block";
      processImage(img);
    };
    img.src = data.urls.small;
  } catch (err) {
    console.error("Error al cargar imagen desde Unsplash:", err);
    alert("No se pudo obtener la imagen. Intenta de nuevo.");
  }
});

function processImage(img) {
  const offscreen = document.createElement("canvas");
  offscreen.width = maxCols;
  offscreen.height = maxRows;
  const offCtx = offscreen.getContext("2d");

  const aspectRatio = img.width / img.height;
  let drawW = maxCols;
  let drawH = Math.round(maxCols / aspectRatio);
  if (drawH > maxRows) {
    drawH = maxRows;
    drawW = Math.round(maxRows * aspectRatio);
  }

  const offsetX = Math.floor((maxCols - drawW) / 2);
  const offsetY = Math.floor((maxRows - drawH) / 2);

  offCtx.fillStyle = "black";
  offCtx.fillRect(0, 0, maxCols, maxRows);
  offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

  const imageData = offCtx.getImageData(0, 0, maxCols, maxRows);
  drawCirclesWithPalette(imageData);
}

function colorDistance(c1, c2) {
  return Math.sqrt(
    (c1[0] - c2[0]) ** 2 +
    (c1[1] - c2[1]) ** 2 +
    (c1[2] - c2[2]) ** 2
  );
}

function closestColor(r, g, b, palette) {
  let minDist = parseInt(sensitivityInput.value);
  let closest = null;
  for (const [pr, pg, pb] of palette) {
    const dist = colorDistance([r, g, b], [pr, pg, pb]);
    if (dist < minDist) {
      minDist = dist;
      closest = [pr, pg, pb];
    }
  }
  return closest || [r, g, b];
}

function drawCirclesWithPalette(imageData) {
  const palette = getCurrentPalette();

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const spacingX = canvasWidth / maxCols;
  const spacingY = canvasHeight / maxRows;
  const radius = Math.min(spacingX, spacingY) / 2.3;

  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const index = (row * maxCols + col) * 4;
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];

      const [cr, cg, cb] = closestColor(r, g, b, palette);

      const x = col * spacingX + spacingX / 2;
      const y = row * spacingY + spacingY / 2;

      ctx.beginPath();
      ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pixel_art.png";
  link.href = canvas.toDataURL();
  link.click();
});

exportJSON.addEventListener("click", () => {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const json = JSON.stringify([...data.data]);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.download = "pixel_data.json";
  link.href = URL.createObjectURL(blob);
  link.click();
});
