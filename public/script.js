//Home Page

//Geo locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);
    // const w_api = "4443a9362e1899f1250bec19128caa2b";
    // const api_url = `weather/lat=${lat}&lon=${lon}&appid=${w_api}`
    console.log(lat, lon)
    const api_url = `weather/${lat}/${lon}`
    const response = await fetch(api_url);
    const json = await response.json();
    const kelvin = json.main.temp;
    const celsius = kelvin - 273
    // console.log(celsius)
    const fahr = Math.floor(celsius * (9/5) + 32 )
    const desc = json.weather[0].description;
    // console.log(fahr)
    // const celsius = ((5/9 * json.main.temp
    // console.log(celsius)
    document.getElementById('summary').textContent = desc;
    document.getElementById('temperature').textContent = fahr;
    console.log(json)


    const data = { lat, lon, fahr, desc };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);
  
  });
} else {
  console.log('geolocation not available');
}




// Button press to POST lat and lon data to server
// const button = document.getElementById('submit');
// button.addEventListener('click', async event => {


