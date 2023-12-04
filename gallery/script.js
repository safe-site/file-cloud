document.addEventListener('DOMContentLoaded', function () {
    // Get the container for the image gallery
    const imageGalleryContainer = document.getElementById('image-gallery');
    // Get the container for the image count
    const imageCountContainer = document.getElementById('image-count');

    // Retrieve all keys from local storage
    const keys = Object.keys(localStorage);

    // Iterate through the keys and display images
    keys.forEach(key => {
        try {
            // Get the Base64-encoded image data from local storage
            const base64Image = localStorage.getItem(key);

            // Create a container for each image with a delete button
            const imageContainer = document.createElement('div');

            // Create an image element and set its source
            const imgElement = document.createElement('img');
            imgElement.src = base64Image;

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                // Ask for confirmation before deleting
                const confirmDelete = confirm('Are you sure you want to delete this image?');
                if (confirmDelete) {
                    // Remove the image and key from local storage
                    localStorage.removeItem(key);
                    // Remove the image container from the gallery
                    imageContainer.remove();
                    // Update the displayed image count
                    updateImageCount();
                }
            });

            // Append the image and delete button to the image container
            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(deleteButton);

            // Append the image container to the gallery container
            imageGalleryContainer.appendChild(imageContainer);
        } catch (error) {
            // Handle errors when parsing or displaying images
            console.error('Error displaying image:', error);
        }
    });

    // Function to update the displayed image count
function updateImageCount() {
    const updatedKeys = Object.keys(localStorage);
    const imageCount = updatedKeys.length;

    // Get the container for the image count
    const imageCountContainer = document.getElementById('image-count');

    // Create span elements for styling
    const yellowSpan = document.createElement('span');
    yellowSpan.textContent = `${imageCount}`;
    yellowSpan.style.color = 'yellow';

    const whiteSpan = document.createElement('span');
    whiteSpan.textContent = ' / ';
    whiteSpan.style.color = 'white';

    const greenSpan = document.createElement('span');
    greenSpan.textContent = 'Unlimited';
    greenSpan.style.color = 'green';

    // Clear the content of the container
    imageCountContainer.innerHTML = '';

    // Append the span elements to the container
    imageCountContainer.appendChild(yellowSpan);
    imageCountContainer.appendChild(whiteSpan);
    imageCountContainer.appendChild(greenSpan);
}


    // Initial update of the image count
    updateImageCount();
});
