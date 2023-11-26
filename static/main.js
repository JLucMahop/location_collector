// Get the collect button element
const collectBtn = document.getElementById('collectBtn');

// Add an event listener to the collect button
collectBtn.addEventListener('click', collectPosition);

// Function to collect the device's position
function collectPosition() {
    if (navigator.geolocation) {
        // Request the device's position
        navigator.geolocation.getCurrentPosition(
            onSuccess,
            onError
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Function to handle successful position retrieval
function onSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const altitude = position.coords.altitude || null;
    const accuracy = position.coords.accuracy;

    // Send the position data to the server
    const data = {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude,
        accuracy: accuracy
    };

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Position data collected successfully.');
        } else {
            alert('Failed to collect position data.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to handle position retrieval errors
function onError(error) {
    console.error('Error:', error.message);
    alert('Failed to retrieve the device\'s position.');
}