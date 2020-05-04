//The server

const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Strating server at ${port}`)});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

//GET response to client to view
app.get('/api', (request, response) => {
    //find everythin in the database
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});


//POST lat and lon and time stamp
app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});


//call wweather data with lat and lon
app.get('/weather/:lat/:lon', async (request, response) => {
    console.log(request.params)
    const getlat = request.params.lat
    const getlon = request.params.lon
    console.log(getlat, getlon)
    const w_api = process.env.API_KEY;
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${getlat}&lon=${getlon}&appid=${w_api}`
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});