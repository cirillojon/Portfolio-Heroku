function initMap() {
    // Fetch the API key from the server
    fetch('/api/get-api-key')
      .then(response => response.json())
      .then(data => {
        const mapsKey = data.mapsKey;
  
        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&callback=initializeMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      });
  }
  
  function initializeMap() {
    // Set the map options
    var mapOptions = {
      zoom: 10,
      center: { lat: 40.7128, lng: -74.0060 }
    };
  
    // Create a new map instance
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
  
  