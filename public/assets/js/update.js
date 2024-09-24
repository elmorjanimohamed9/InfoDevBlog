// Image upload with preview and remove functionality
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
const removeImageButton = document.getElementById('remove-image');

// If an image already exists, show the remove button
if (imagePreview.src) {
    imagePreview.classList.remove('hidden');
    removeImageButton.classList.remove('hidden');
}

// Image selection event
imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            removeImageButton.classList.remove('hidden');
        };

        reader.readAsDataURL(file); 
    } else {
        imagePreview.src = '';
        imagePreview.classList.add('hidden');
        removeImageButton.classList.add('hidden');
    }
});

// Remove image button event
removeImageButton.addEventListener('click', function () {
    // Clear the file input
    imageInput.value = '';

    // Hide the image preview and remove button
    imagePreview.src = '';
    imagePreview.classList.add('hidden');
    removeImageButton.classList.add('hidden');

    const removeImageInput = document.createElement('input');
    removeImageInput.type = 'hidden';
    removeImageInput.name = 'removeImage';
    removeImageInput.value = 'true';
    document.getElementById('article-form').appendChild(removeImageInput);
});
