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