document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'hVxVExhvcYcwoqNVUF5hJXDCrEfSVda7Fu2q2chp';
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  fetch(apodUrl)
    .then((response) => response.json())
    .then((data) => {
      const apodDiv = document.getElementById('nasa-apod');

      if (data.media_type === 'image') {
        const apodImg = document.createElement('img');
        apodImg.src = data.url;
        apodImg.alt = data.title;
        apodImg.style.width = '100%';
        apodDiv.appendChild(apodImg);
      } else if (data.media_type === 'video') {
        const apodIframe = document.createElement('iframe');
        apodIframe.src = data.url;
        apodIframe.width = '100%';
        apodIframe.height = '300px';
        apodIframe.frameBorder = '0';
        apodIframe.allow = 'autoplay; fullscreen';
        apodDiv.appendChild(apodIframe);
      } else {
        console.warn('Unsupported media type:', data.media_type);
      }
    })
    .catch((error) => {
      console.error('Error fetching APOD:', error);
    });
});


// Fetch Mars Rover Photos
function fetchMarsRoverPhotos() {
  const roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=' + apiKey;

  fetch(roverUrl)
    .then(response => response.json())
    .then(data => {
      if (data.latest_photos) {
        const photos = data.latest_photos.slice(0, 5); // Limit to 5 photos
        const marsRoverPhotosDiv = document.getElementById('mars-rover-photos');

        photos.forEach(photo => {
          const img = document.createElement('img');
          img.src = photo.img_src;
          img.alt = `Mars Rover photo taken on ${photo.earth_date}`;
          img.style.width = '100%';
          img.style.padding = '1rem';
          marsRoverPhotosDiv.appendChild(img);
        });
      }
    })
    .catch(err => console.error(err));
}

fetchMarsRoverPhotos();



// Fetch Earth Asset Imagery
function fetchEarthAsset() {
  const lat = 37.7749; // Latitude
  const lon = -122.4194; // Longitude
  const date = '2021-07-01'; // Date in YYYY-MM-DD format
  const dim = 0.1; // Image dimension in degrees
  const earthAssetUrl = `https://api.nasa.gov/planetary/earth/assets?lat=${lat}&lon=${lon}&date=${date}&dim=${dim}&api_key=${apiKey}`;

  fetch(earthAssetUrl)
    .then(response => response.json())
    .then(data => {
      const earthAssetDiv = document.getElementById('earth-asset');
      const img = document.createElement('img');
      img.src = data.url;
      img.alt = `Earth Asset Imagery for latitude ${lat}, longitude ${lon}`;
      img.style.width = '100%';
      img.style.padding = '1rem';
      earthAssetDiv.appendChild(img);
    })
    .catch(err => console.error(err));
}

fetchEarthAsset();

