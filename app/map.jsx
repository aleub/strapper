/*
var map = L.map('map').setView([51.505, -0.09], 10);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 18
}).addTo(map);

$.get("http://localhost:8000/latlngs", function(res) {
    //L.multiPolygon(res).addTo(map);
    //L.rectangle(res, {color: '#ff7800', weight: 1}).addTo(map);
    var polyline = L.polyline(res, {
        color: 'red',
        stroke: true,
        weight: 10,
        opacity: 1}).addTo(map);

    map.fitBounds(polyline.getBounds());
});*/
