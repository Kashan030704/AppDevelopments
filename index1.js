//Take City Name and use into Longitude and Latitude

async function getGeoLocation() {
    const city = document.getElementById("userinput").value;
    document.getElementById("city").textContent = city;
    const encodedcity = encodeURIComponent(city);
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodedcity);
    const data = await response.json();
//Latitude First
    document.getElementById("Latitude").textContent = `Latitude: ${data.results[0].latitude}`;
//Longitude Second
    document.getElementById("Longitude").textContent = `Longitude: ${data.results[0].longitude}`;
//Calling the temperature function with parameters
    getTemp(data.results[0].latitude,data.results[0].longitude);
//Calling the the function for Sunrise/Sunset Timings with the same parameters as the previous function call
    getSunriseSunset(data.results[0].latitude, data.results[0].longitude);

}

async function getTemp(Latitude, Longitude){
        const encodedLatitude = encodeURIComponent(Latitude);
        const encodedLongitude = encodeURIComponent(Longitude);
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + encodedLatitude + "&longitude="+ encodedLongitude +"&hourly=temperature_2m");
        const data = await response.json();
        for(let i=0; i < 5; ++i) {
            //let num = encodedURIComponent(i);
        document.getElementById("Temperature"+i).textContent = `Time: ${data.hourly.time[i]} Temperature: ${data.hourly.temperature_2m[i]}°C`;
        }

    }

async function getSunriseSunset(Latitude, Longitude){
    const encodedLatitude = encodeURIComponent(Latitude);
    const encodedLongitude = encodeURIComponent(Longitude);
    const response = await fetch("https://api.sunrise-sunset.org/json?lat=" + encodedLatitude+"&lng="+encodedLongitude);
    const data = await response.json();
    document.getElementById("Sunrise").textContent = `Sunrise at ${data.results.sunrise}`;
    document.getElementById("Sunset").textContent = `Sunset at ${data.results.sunset}`;

}
     