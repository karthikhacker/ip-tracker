const form = document.querySelector('.form');
const inputIp = document.querySelector('#input-ip');
const ipAddress = document.querySelector('#ip-address');
const loc = document.querySelector('#location');
const timeZone = document.querySelector('#time-zone');
const isp_provider = document.querySelector('#isp');
const mapContainer = document.querySelector('.map-container');
const API_KEY = 'at_wnInxI9Zwae6EuwwYrtQ4nc9TGJhQ';


var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2FydGhpa2hhY2tlciIsImEiOiJja3R2YzhoeXMwamY0Mm9tcGN3bHluMXhrIn0.VnpPB5C-PFbJ9JMOdkeNpA'
}).addTo(mymap);

// display data 
const displayData = (res) => {
    const { isp, ip } = res;
    const { city, country, timezone } = res.location;
    console.log(res);
    mapContainer.innerHTML = `
    <div class="col-md-1">
        <div class="row">
          <h5> IP Address </h5>
          <p id="ip-address">${ip}</p>
        </div>
        <div class="row">
          <h5> Location </h5>
          <p id="location">${city},${country}</p>
        </div>
        <div class="row">
          <h5>Timezone</h5>
          <p id="time-zone">${timezone}</p>
        </div>
        <div class="row">
          <h5>ISP</h5>
          <p id="isp">${isp}</p>
        </div>
      </div>
    `
}
//display map 
const displayMap = (res) => {
    //console.log(res);
    let { lat, lng } = res.location;
    mymap.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]).addTo(mymap);
}
//get location 
const getLocation = (ip) => {
    mapContainer.innerHTML = '<p class="loading">LOADING...</p>';
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_wnInxI9Zwae6EuwwYrtQ4nc9TGJhQ&ipAddress=${ip}`)
        .then(res => res.json())
        .then(result => {
            displayMap(result);
            displayData(result);
        })
        .catch(error => console.log(error));
}

// validate ip
const validateIp = (ipAdd) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAdd)) {
        getLocation(ipAdd);
        return true;
    } else {
        alert('Not an valid ip address.')
        return false;
    }
}
// user form submit
const submitForm = (e) => {
    e.preventDefault();
    let userIp = inputIp.value;
    if (userIp !== '') {
        validateIp(userIp)
    } else {
        alert('Enter an ip address');
    }

}
form.addEventListener('submit', submitForm);