// Loading basemap and tiles
var map = L.map('map').setView([40.86,-95.86], 5);
map.scrollWheelZoom.disable();

var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(CartoDB_DarkMatter);

// COLOR SCHEME FOR MARKERS
// ['#f0f9e8','#bae4bc','#7bccc4','#43a2ca','#0868ac']

// global variables for layer controls
var startupsUSGeoJSON;

function getColor(d) {
    return d > 500000000 ? '#7fff00' :
           d > 100000000 ? '#b9ff00' :
           d > 500000000  ? '#e5ff00' :
           d > 15000000  ? '#e5a100' :
           d > 10000000  ? '#ec2600' :
     						'none' ;
}

// JQuery to grab geoJson layers and plot them
$.getJSON("geojson/startupsus.geojson", function (data) {
	var startupPoints = data;

	var startupPointToLayer = function (feature, latlng){

		var startupMarker = L.circle(latlng, 30000, {
			stroke: false,
			fillColor: getColor(feature.properties.funding_total_usd), 
			fillOpacity: 0.9
		});
		return startupMarker
	    }

	var startupHover = function (feature, layer) {
		layer.bindPopup("<strong>Name: </strong><br />" + feature.properties.name + "<br /><strong>Industry: </strong>" + feature.properties.category_list +
						"<br /><strong>Funding: </strong>" + "$" + feature.properties.funding_total_usd + " USD" 
						+ "<br /><strong>First Funding at: </strong>" + feature.properties.first_funding_at.substring(0, 10) +
						"<br /><strong>Last Funding at: </strong>" + feature.properties.last_funding_at.substring(0, 10) +
						"<br /><strong>Funding Rounds: </strong>" + feature.properties.funding_rounds
						);
		layer.on('mouseover', function (e) {
		            this.openPopup();
		        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
	}

	startupUSGeoJson = L.geoJson(startupPoints, {
		pointToLayer: startupPointToLayer, 
		onEachFeature: startupHover
	}).addTo(map);
});











