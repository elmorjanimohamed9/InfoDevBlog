
// Image upload with preview
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
const removeImageButton = document.getElementById('remove-image');

imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            removeImageButton.classList.remove('hidden'); 
        }

        reader.readAsDataURL(file); 
    } else {
        imagePreview.src = '';
        imagePreview.classList.add('hidden'); 
        removeImageButton.classList.add('hidden'); 
    }
});

removeImageButton.addEventListener('click', function () {
    imageInput.value = ''; 
    imagePreview.src = ''; 
    imagePreview.classList.add('hidden'); 
    removeImageButton.classList.add('hidden'); 
});