
async function getStores() {
    const res = await fetch("/api/v1/stores");
    const data = await res.json();

    const stores = data.data.map(store => store.location.formattedAddress);

    console.log(stores);
    loadMap(stores);
}

function loadMap(stores) {
    fetch('/api/key')
        .then((response) => response.json())
        .then((data) => {
            L.mapquest.key = data.GEOCODER_API_KEY;

            L.mapquest.geocoding().geocode(stores, createMap);

        });
}

function createMap(error, response) {
    // Initialize the Map
    var map = L.mapquest.map('map', {
        layers: L.mapquest.tileLayer('map'),
        center: [0, 0],
        zoom: 12
    });

    // Generate the feature group containing markers from the geocoded locations
    var featureGroup = generateMarkersFeatureGroup(response);

    // Add markers to the map and zoom to the features
    featureGroup.addTo(map);
    map.fitBounds(featureGroup.getBounds());
}

function generateMarkersFeatureGroup(response) {
    var group = [];
    for (var i = 0; i < response.results.length; i++) {
        var location = response.results[i].locations[0];
        var locationLatLng = location.latLng;

        // Create a marker for each location
        var marker = L.marker(locationLatLng, { icon: L.mapquest.icons.marker({ primaryColor: '#ff0000' }) })
            .bindPopup(location.adminArea5 + ', ' + location.adminArea3);

        group.push(marker);
    }
    return L.featureGroup(group);
}


getStores();
