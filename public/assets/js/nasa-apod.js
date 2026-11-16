document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'hVxVExhvcYcwoqNVUF5hJXDCrEfSVda7Fu2q2chp';
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  // The APOD API intermittently returns 5xx, so retry once before giving up.
  const fetchApod = () => fetch(apodUrl).catch(() => null)
    .then((response) => (response && response.ok) ? response : fetch(apodUrl));

  fetchApod()
    .then((response) => {
      if (!response.ok) {
        throw new Error(`APOD error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const apodDiv = document.getElementById('nasa-apod');
      const title = document.createElement('p');
      title.textContent = data.title;
      apodDiv.appendChild(title);

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
      document.getElementById('nasa-apod').textContent = "NASA's picture of the day is currently unavailable.";
    });
});