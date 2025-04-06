// const fileInput = document.getElementById('fileInput');
const originalImage = document.getElementById('originalImage');
const originalSize = document.getElementById('originalSize');
const scaleInput = document.getElementById('scaleInput');
const scaleWarning = document.getElementById('scaleWarning');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const resultImage = document.getElementById('resultImage');

let imageWidth = 0;
let imageHeight = 0;

// Загрузка изображения
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    originalImage.src = event.target.result;
    originalImage.classList.remove('hidden');

    const img = new Image();
    img.onload = () => {
      imageWidth = img.width;
      imageHeight = img.height;
      originalSize.textContent = `Размер: ${imageWidth} x ${imageHeight}`;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// Проверка разрешения и имитация SRGAN
scaleInput.addEventListener('input', () => {
  const value = scaleInput.value.trim().toLowerCase();

  let newWidth = 0;
  if (value.endsWith('x')) {
    const factor = parseFloat(value.replace('x', ''));
    newWidth = imageWidth * factor;
  } else {
    newWidth = parseInt(value);
  }

  if (newWidth > 4096) {
    scaleWarning.classList.remove('hidden');
  } else {
    scaleWarning.classList.add('hidden');
  }
});

// Клик по Enter или потеря фокуса
scaleInput.addEventListener('change', () => {
  const value = scaleInput.value.trim().toLowerCase();
  let newWidth = 0;

  if (value.endsWith('x')) {
    const factor = parseFloat(value.replace('x', ''));
    newWidth = imageWidth * factor;
  } else {
    newWidth = parseInt(value);
  }

  if (newWidth > 4096 || isNaN(newWidth)) {
    scaleWarning.classList.remove('hidden');
    return;
  }

  scaleWarning.classList.add('hidden');
  progressContainer.classList.remove('hidden');
  progressBar.style.width = '0%';
  resultImage.classList.add('hidden');

  // Симуляция загрузки (замени здесь на вызов SRGAN позже)
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        progressContainer.classList.add('hidden');
        resultImage.src = originalImage.src; // <-- Здесь заменить на SRGAN результат
        resultImage.classList.remove('hidden');
      }, 500);
    }
  }, 200);
});
