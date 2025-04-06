const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const previewContainer = document.getElementById('previewContainer');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    preview.src = event.target.result;
    previewContainer.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});
