const fileInput = document.getElementById("fileInput");
const originalImage = document.getElementById("originalImage");
const originalSize = document.getElementById("originalSize");
const resultImage = document.getElementById("resultImage");
const resultSize = document.getElementById("resultSize");
const scaleSelect = document.getElementById("scaleSelect");
const scaleWarning = document.getElementById("scaleWarning");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const downloadBtn = document.getElementById("downloadBtn");

let originalImg = null;
let isProcessing = false;

function showBusyWarning() {
  alert("Пожалуйста, подождите завершения обработки изображения.");
}

fileInput.addEventListener("change", (e) => {
  if (isProcessing) return showBusyWarning();

  const file = e.target.files[0];
  if (!file) return;

	//Добавить ограничение?

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      originalImg = img;
      originalImage.src = img.src;
      originalImage.classList.remove("hidden");
      originalSize.textContent = `Размер: ${img.width} x ${img.height}`;
      processImage();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

scaleSelect.addEventListener("change", () => {
  if (isProcessing) return showBusyWarning();
  if (originalImg) processImage();
});

function processImage() {
  const scale = parseFloat(scaleSelect.value);
  const newWidth = Math.round(originalImg.width * scale);
  const newHeight = Math.round(originalImg.height * scale);


  isProcessing = true;
  disableInputs(true);

  progressContainer.classList.remove("hidden");
  progressBar.style.width = "0%";
  resultImage.classList.add("hidden");
  resultSize.textContent = "";
  downloadBtn.classList.add("hidden");

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);

      // Увеличение изображения
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(originalImg, 0, 0, newWidth, newHeight);

      const dataUrl = canvas.toDataURL("image/png");
      resultImage.src = dataUrl;
      resultImage.classList.remove("hidden");
      resultSize.textContent = `Новый размер: ${newWidth} x ${newHeight}`;

      downloadBtn.href = dataUrl;
      downloadBtn.classList.remove("hidden");

      isProcessing = false;
      disableInputs(false);
    }
  }, 100);
}

function disableInputs(disabled) {
  fileInput.disabled = disabled;
  scaleSelect.disabled = disabled;
  fileInput.classList.toggle("opacity-50", disabled);
  scaleSelect.classList.toggle("opacity-50", disabled);
  fileInput.classList.toggle("cursor-not-allowed", disabled);
  scaleSelect.classList.toggle("cursor-not-allowed", disabled);
}
