async function loadImageGallery() {
    try {
      const response = await fetch('/images');
      const imageURLs = await response.json();
      const imageGallery = document.getElementById('image-gallery');
      imageURLs.forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Gallery image';
        img.className = 'gallery-image';
        imageGallery.appendChild(img);
      });
    } catch (error) {
      console.error('Error loading image gallery:', error);
    }
  }
  
  loadImageGallery();
  