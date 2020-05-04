
        // Making a map and tiles
        const mymap = L.map('issMap').setView([0, 0], 3);
        const attribution =
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);
        
        
        
        //GETTING data and adding it to the logs/data page
        async function getData() {
            const response = await fetch('/api');
            const data = await response.json();
            console.log(data)
    
            for (item of data) {

                const marker = L.marker([item.lat, item.lon]).addTo(mymap);


                const txt = `The temperature here at latitude: ${item.lat} and longitude: ${item.lon},<br> 
                is ${item.fahr} Fahrenheit with
                ${item.desc}.`

                marker.bindPopup(txt);
            }
        }

            getData()