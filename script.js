const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const upload = document.getElementById("upload");
const paletteSelect = document.getElementById("paletteSelect");
const sizePreset = document.getElementById("sizePreset");
const customSize = document.getElementById("customSize");
const colsInput = document.getElementById("colsInput");
const rowsInput = document.getElementById("rowsInput");
const scaleInput = document.getElementById("scaleInput");
const scaleValue = document.getElementById("scaleValue");
const sensitivityInput = document.getElementById("sensitivity");
const sensitivityValue = document.getElementById("sensitivityValue");
const allowOriginal = document.getElementById("allowOriginal");
const sourceSelect = document.getElementById("sourceSelect");
const randomBtn = document.getElementById("randomBtn");
const downloadBtn = document.getElementById("downloadBtn");
const exportJSON = document.getElementById("exportJSON");
const customPalette = document.querySelector(".palette");
const colors = customPalette.querySelectorAll(".color");
const paintModeMain = document.getElementById("paintMode");
const paintModeFocus = document.getElementById("paintModeFocus");
const paintSizeInput = document.getElementById("paintSize");
const originalPreview = document.getElementById("originalPreview");

const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const saveDesignBtn = document.getElementById("saveDesignBtn");
const loadDesignInput = document.getElementById("loadDesignInput");
const loadDesignBtn = document.getElementById("loadDesignBtn");
const panModeBtn = document.getElementById("panModeBtn");
const focusModeBtn = document.getElementById("focusModeBtn");

let selectedCustomColor = null;
let isPainting = false;
let paintHistory = [];
let redoStack = [];

let panMode = false;
let isPanning = false;
let panStart = { x: 0, y: 0 };
let imageOffsetX = 0;
let imageOffsetY = 0;

let scaleFactor = parseInt(scaleInput.value) / 100;

let maxCols = 51;
let maxRows = 23;
let currentImage = null;
let pixelMatrix = [];

// Sincronizar selectores (si usas ambos)
if (paintModeFocus) {
  paintModeMain.addEventListener("change", () => {
    paintModeFocus.value = paintModeMain.value;
  });
  paintModeFocus.addEventListener("change", () => {
    paintModeMain.value = paintModeFocus.value;
  });
}

function getPaintMode() {
  return paintModeMain.value;
}

// Selección de color
colors.forEach(color => {
  color.addEventListener("click", () => {
    colors.forEach(c => c.classList.remove("selected"));
    color.classList.add("selected");
    selectedCustomColor = color.dataset.color.split(",").map(Number);
  });
});

scaleInput.addEventListener("input", () => {
  scaleFactor = parseInt(scaleInput.value) / 100;
  scaleValue.textContent = scaleInput.value + "%";
  if (currentImage) processImage(currentImage);
});

sensitivityInput.addEventListener("input", () => {
  sensitivityValue.textContent = sensitivityInput.value;
  if (currentImage) processImage(currentImage);
});

paletteSelect.addEventListener("change", () => {
  if (currentImage) processImage(currentImage);
});

sizePreset.addEventListener("change", () => {
  const value = sizePreset.value;
  if (value === "custom") {
    customSize.style.display = "block";
  } else {
    customSize.style.display = "none";
    const [w, h] = value.split("x").map(Number);
    maxCols = w;
    maxRows = h;
    colsInput.value = w;
    rowsInput.value = h;
    adjustCanvasSize();
    if (currentImage) processImage(currentImage);
  }
});

colsInput.addEventListener("input", () => {
  maxCols = parseInt(colsInput.value) || 1;
  adjustCanvasSize();
  if (currentImage) processImage(currentImage);
});
rowsInput.addEventListener("input", () => {
  maxRows = parseInt(rowsInput.value) || 1;
  adjustCanvasSize();
  if (currentImage) processImage(currentImage);
});

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.onload = () => {
      currentImage = img;
      originalPreview.src = img.src;
      imageOffsetX = 0;
      imageOffsetY = 0;
      processImage(img);
    };
    img.src = URL.createObjectURL(file);
  }
});

const UNSPLASH_ACCESS_KEY = "k6UVIq0s8n9C88bjYqUsXQagU2YM1rT01QwD3ltwa2Q";

randomBtn.addEventListener("click", async () => {
  const source = sourceSelect.value;
  let query = "random";

  if (source === "pop") query = "pop culture";
  else if (source === "art") query = "art";
  else if (source === "kids") query = "kids illustration";

  if (source === "picsum") {
    const rand = Math.floor(Math.random() * 1000);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      currentImage = img;
      originalPreview.src = img.src;
      imageOffsetX = 0;
      imageOffsetY = 0;
      processImage(img);
    };
    img.src = `https://picsum.photos/400?random=${rand}`;
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
      originalPreview.src = img.src;
      imageOffsetX = 0;
      imageOffsetY = 0;
      processImage(img);
    };
    img.src = data.urls.small;
  } catch (err) {
    console.error("Error:", err);
    alert("No se pudo cargar la imagen. Intenta de nuevo.");
  }
});

const palettes = {
  basic: [[255, 0, 0], [0, 0, 255], [0, 100, 0], [0, 255, 255], [128, 0, 128], [255, 192, 203], [144, 238, 144], [255, 255, 255], [105, 105, 105], [255, 255, 0]],
  colorful: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 0, 255], [0, 255, 255], [128, 0, 128], [255, 165, 0], [0, 128, 128], [255, 255, 255]],
  grayscale: [[64, 64, 64], [128, 128, 128], [192, 192, 192], [255, 255, 255]],
  litezilla: [[255, 0, 0], [255, 192, 203], [144, 238, 144], [0, 100, 0], [255, 165, 0], [255, 255, 255], [128, 0, 128], [0, 0, 255], [255, 255, 0], [0, 255, 255]]
};

function adjustCanvasSize() {
  const aspect = maxCols / maxRows;
  const baseWidth = 1020;
  canvas.width = baseWidth;
  canvas.height = baseWidth / aspect;

  const maxHeight = 700;
  if (canvas.height > maxHeight) {
    canvas.height = maxHeight;
    canvas.width = maxHeight * aspect;
  }
}

function processImage(img) {
  const offscreen = document.createElement("canvas");
  offscreen.width = maxCols;
  offscreen.height = maxRows;
  const offCtx = offscreen.getContext("2d");

  const aspect = img.width / img.height;
  let baseW = maxCols;
  let baseH = baseW / aspect;

  if (baseH > maxRows) {
    baseH = maxRows;
    baseW = baseH * aspect;
  }

  let drawW = baseW * scaleFactor;
  let drawH = baseH * scaleFactor;

  const offsetX = Math.floor((maxCols - drawW) / 2) + imageOffsetX;
  const offsetY = Math.floor((maxRows - drawH) / 2) + imageOffsetY;

  offCtx.fillStyle = "black";
  offCtx.fillRect(0, 0, maxCols, maxRows);
  offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

  let imageData = offCtx.getImageData(0, 0, maxCols, maxRows);
  let data = imageData.data;

  const contrast = 1.2;
  const brightness = 10;

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      data[i + c] = Math.min(255, Math.max(0, contrast * (data[i + c] - 128) + 128 + brightness));
    }
  }

  const width = imageData.width;
  const height = imageData.height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldR = data[idx], oldG = data[idx + 1], oldB = data[idx + 2];
      const [newR, newG, newB] = closestColor(oldR, oldG, oldB, palettes[paletteSelect.value] || palettes.basic);

      data[idx] = newR; data[idx + 1] = newG; data[idx + 2] = newB;

      const errR = oldR - newR, errG = oldG - newG, errB = oldB - newB;

      const spread = [
        { x: 1, y: 0, factor: 7 / 16 },
        { x: -1, y: 1, factor: 3 / 16 },
        { x: 0, y: 1, factor: 5 / 16 },
        { x: 1, y: 1, factor: 1 / 16 }
      ];

      for (const s of spread) {
        const nx = x + s.x, ny = y + s.y;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = (ny * width + nx) * 4;
          data[nidx] += errR * s.factor;
          data[nidx + 1] += errG * s.factor;
          data[nidx + 2] += errB * s.factor;
        }
      }
    }
  }

  offCtx.putImageData(imageData, 0, 0);
  drawCirclesWithPalette(imageData);
}

function closestColor(r, g, b, palette) {
  let minDist = parseInt(sensitivityInput.value);
  let closest = null;
  for (const [pr, pg, pb] of palette) {
    const dist = Math.sqrt((r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closest = [pr, pg, pb];
    }
  }
  if (!closest) {
    if (r === 0 && g === 0 && b === 0) return [21, 21, 21];
    return allowOriginal.checked ? [r, g, b] : [21, 21, 21];
  }
  return closest;
}

function drawCirclesWithPalette(imageData) {
  const palette = palettes[paletteSelect.value] || palettes.basic;
  pixelMatrix = [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spacing = Math.min(canvas.width / maxCols, canvas.height / maxRows);
  const radius = spacing / 2.5;

  const offsetX = (canvas.width - spacing * maxCols) / 2;
  const offsetY = (canvas.height - spacing * maxRows) / 2;

  for (let row = 0; row < maxRows; row++) {
    pixelMatrix[row] = [];
    for (let col = 0; col < maxCols; col++) {
      const idx = (row * maxCols + col) * 4;
      const r = imageData.data[idx];
      const g = imageData.data[idx + 1];
      const b = imageData.data[idx + 2];
      const [cr, cg, cb] = closestColor(r, g, b, palette);
      pixelMatrix[row][col] = [cr, cg, cb];

      const x = offsetX + col * spacing + spacing / 2;
      const y = offsetY + row * spacing + spacing / 2;

      ctx.beginPath();
      ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

canvas.addEventListener("mousedown", (e) => {
  if (panMode) {
    isPanning = true;
    panStart = { x: e.clientX - imageOffsetX, y: e.clientY - imageOffsetY };
  } else {
    isPainting = true;
    handlePaint(e);
  }
});

canvas.addEventListener("mouseup", () => {
  isPainting = false;
  isPanning = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPanning && panMode) {
    imageOffsetX = e.clientX - panStart.x;
    imageOffsetY = e.clientY - panStart.y;
    if (currentImage) processImage(currentImage);
  } else if (isPainting && getPaintMode() === "brush") {
    handlePaint(e);
  }
});

canvas.addEventListener("click", (e) => {
  if (!panMode) handlePaint(e);
});

function handlePaint(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const spacing = Math.min(canvas.width / maxCols, canvas.height / maxRows);
  const offsetX = (canvas.width - spacing * maxCols) / 2;
  const offsetY = (canvas.height - spacing * maxRows) / 2;

  const col = Math.floor((x - offsetX) / spacing);
  const row = Math.floor((y - offsetY) / spacing);

  if (row >= 0 && row < maxRows && col >= 0 && col < maxCols) {
    paintCell(row, col);
  }
}

function paintCell(row, col) {
  if (!selectedCustomColor && getPaintMode() !== "eraser") return;

  const size = parseInt(paintSizeInput.value) || 1;
  const mode = getPaintMode();

  saveHistory();

  for (let r = row - size; r <= row + size; r++) {
    for (let c = col - size; c <= col + size; c++) {
      if (r >= 0 && r < maxRows && c >= 0 && c < maxCols) {

        let paint = false;

        if (mode === "single") {
          paint = (r === row && c === col);

        } else if (mode === "square" || mode === "brush" || mode === "eraser") {
          paint = true;

        } else if (mode === "circle") {
          const dist = Math.sqrt((row - r) ** 2 + (col - c) ** 2);
          if (dist <= size) paint = true;
        }

        if (paint) {
          pixelMatrix[r][c] = mode === "eraser" ? [21, 21, 21] : selectedCustomColor;
        }
      }
    }
  }

  redrawCanvas();
}



function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spacing = Math.min(canvas.width / maxCols, canvas.height / maxRows);
  const radius = spacing / 2.5;
  const offsetX = (canvas.width - spacing * maxCols) / 2;
  const offsetY = (canvas.height - spacing * maxRows) / 2;

  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const [r, g, b] = pixelMatrix[row][col];
      const x = offsetX + col * spacing + spacing / 2;
      const y = offsetY + row * spacing + spacing / 2;

      ctx.beginPath();
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function saveHistory() {
  paintHistory.push(JSON.stringify(pixelMatrix));
  if (paintHistory.length > 50) paintHistory.shift();
  redoStack = [];
}

undoBtn.addEventListener("click", () => {
  if (paintHistory.length > 1) {
    redoStack.push(paintHistory.pop());
    pixelMatrix = JSON.parse(paintHistory[paintHistory.length - 1]);
    redrawCanvas();
  }
});

redoBtn.addEventListener("click", () => {
  if (redoStack.length) {
    paintHistory.push(redoStack.pop());
    pixelMatrix = JSON.parse(paintHistory[paintHistory.length - 1]);
    redrawCanvas();
  }
});

saveDesignBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(pixelMatrix)], { type: "application/json" });
  const link = document.createElement("a");
  link.download = "design.json";
  link.href = URL.createObjectURL(blob);
  link.click();
});

loadDesignBtn.addEventListener("click", () => {
  loadDesignInput.click();
});

loadDesignInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    pixelMatrix = JSON.parse(reader.result);
    saveHistory();
    redrawCanvas();
  };
  reader.readAsText(file);
});

panModeBtn.addEventListener("click", () => {
  panMode = !panMode;
  panModeBtn.style.background = panMode ? "#555" : "#333";
});

focusModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pixel_art.png";
  link.href = canvas.toDataURL();
  link.click();
});

exportJSON.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(pixelMatrix)], { type: "application/json" });
  const link = document.createElement("a");
  link.download = "pixel_data.json";
  link.href = URL.createObjectURL(blob);
  link.click();
});

