function displayImages(inputNumber) {
    const imageInput = document.getElementById(`imageInput${inputNumber}`);
    const imagePreviews = document.getElementById(`imagePreview${inputNumber}`);
    imagePreviews.innerHTML = '';

    if (imageInput.files && imageInput.files.length > 0) {
        for (const file of imageInput.files) {
            const reader = new FileReader();

            reader.onload = function(e) {
                imagePreviews.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }
}