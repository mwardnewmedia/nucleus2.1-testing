
// Function to handle image zoom on hover
function setupImageZoom() {
  const productImages = document.querySelectorAll('.product-main-image');

  productImages.forEach(image => {
    let zoomContainer = null;

    image.addEventListener('mouseenter', (e) => {
      // Create zoom container if it doesn't exist
      if (!zoomContainer) {
        zoomContainer = document.createElement('div');
        zoomContainer.classList.add('zoom-container');
        // Append to the closest positioned ancestor, or body if none
        // For this setup, appending to the parentNode of the image (which is the <a> tag with position:relative) is correct.
        image.parentNode.appendChild(zoomContainer);
      }

      // Set the background image to the high-resolution version
      const zoomImageUrl = image.getAttribute('data-zoom-image');
      zoomContainer.style.backgroundImage = `url('${zoomImageUrl}')`;

      // Display the zoom container
      zoomContainer.style.display = 'block';

      updateZoomPosition(e, image, zoomContainer);
    });

    image.addEventListener('mousemove', (e) => {
      if (zoomContainer) {
        updateZoomPosition(e, image, zoomContainer);
      }
    });

    image.addEventListener('mouseleave', () => {
      if (zoomContainer) {
        zoomContainer.style.display = 'none';
      }
    });
  });
}

function updateZoomPosition(e, originalImage, zoomContainer) {
  const originalRect = originalImage.getBoundingClientRect();
  const zoomContainerRect = zoomContainer.getBoundingClientRect();

  // Calculate mouse position relative to the original image
  const mouseX = e.clientX - originalRect.left;
  const mouseY = e.clientY - originalRect.top;

  // Calculate percentage of mouse position across the original image
  const percentX = (mouseX / originalRect.width);
  const percentY = (mouseY / originalRect.height);

  // Define zoom level
  const zoomLevel = 2.5; // You can adjust this value for more or less zoom

  // Calculate the background size based on the zoom level
  const backgroundSizeX = originalImage.naturalWidth * zoomLevel;
  const backgroundSizeY = originalImage.naturalHeight * zoomLevel;

  // Calculate the background position for the zoomed image
  // The idea is to center the magnified portion under the mouse cursor
  const backgroundPosX = -percentX * (backgroundSizeX - zoomContainerRect.width);
  const backgroundPosY = -percentY * (backgroundSizeY - zoomContainerRect.height);

  zoomContainer.style.backgroundSize = `${backgroundSizeX}px ${backgroundSizeY}px`;
  zoomContainer.style.backgroundPosition = `${backgroundPosX}px ${backgroundPosY}px`;

  // Position the zoom container next to the mouse cursor
  // Adjust these values to position the magnifying glass optimally relative to the cursor
  const containerLeft = mouseX + 20; // 20px offset to the right from mouse on original image
  const containerTop = mouseY + 20;   // 20px offset downwards from mouse on original image

  // Ensure the zoom container stays within the bounds of the original image or its parent container if desired
  // For now, let's just make sure it's relative to the image itself
  zoomContainer.style.left = `${containerLeft}px`;
  zoomContainer.style.top = `${containerTop}px`;

  // Optional: Add a check to prevent the zoom container from going outside the image boundaries
  // This would require more complex logic to constrain its position.
}

// Initialize zoom on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Disable zoom on smaller screens or touch devices
  if (window.innerWidth <= 767 || ('ontouchstart' in window) || navigator.maxTouchPoints) {
    return; // Do not initialize zoom
  }
  setupImageZoom();
}); 