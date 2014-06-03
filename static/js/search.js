var map;
var results;
var proc;
var loc;
var mode;
var latitude;
var longitude;

$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', populate_services);
});

function get_param (name) {
  name = RegExp ('[?&]' + name.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
  return (window.location.href.match (name) || ['', ''])[1];
};

function getDirections(address) {

};

function populate_services() {
   proc = get_param('proc');
   loc = get_param('loc').split("%20").join(" ");
   mode = get_param('mode');
  var geocoder = new google.maps.Geocoder();
   $("#proc_name").text(proc);
   $("#loc_name").text(loc);
   geocoder.geocode( { 'address': loc}, function(results, status) {
	
   if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
		
		setMapCenter(latitude, longitude);
		var base = "http://prer-backend.appspot.com/v1/entries/search?";
	//	if(mode == 'Name')
			base += 'name=' + proc;
	//	else
	//		base += 'cpt_code=' + proc;
		base += "&radius=50&lat=" + latitude + "&lng=" + longitude;
	    console.log(api_call);
		$.getJSON(base, function(data) {
			results = data;
			results.sort(function(a, b) {
					return a.cost.localeCompare(b.cost);
				});
			$.each(results, function (index, value) {
					add_result(value, index);
				});
			});
        } 
   }); 
};

function setMapCenter(lat, lng) {
	var center = new google.maps.LatLng(lat, lng);
	
	var mapOptions = {
	center: center,
	scrollWheel: false,
	zoom: 11
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};

function addMarker(address) {
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode( { 'address': address }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				url: '/',
				animation: google.maps.Animation.DROP,
				map: map
			});
		}
	});
};

function initialize() {
	populate_services();
  var locations = [
    new google.maps.LatLng(37.786776,-122.456277),
    new google.maps.LatLng(37.763506,-122.457865),
    new google.maps.LatLng(37.790031,-122.416452),
    new google.maps.LatLng(37.757059,-122.404350),
    new google.maps.LatLng(37.774327,-122.454625),
    new google.maps.LatLng(37.748288,-122.420443),
    new google.maps.LatLng(37.791405,-122.431215),
    new google.maps.LatLng(37.796051,-122.409221),
    new google.maps.LatLng(37.782892,-122.442866),
    new google.maps.LatLng(37.763523,-122.457779)
  ];
  var center = new google.maps.LatLng(37.781298,-122.420365);


  var mapOptions = {
    center: center,
    scrollWheel: false,
    zoom: 13
  };
  
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  for(var index = 0; index < locations.length; index++) {
    var marker = new google.maps.Marker({
      position: locations[index],
      url: '/',
      animation: google.maps.Animation.DROP,
      map: map
    });
  }
};

function sort_results() {
	var type = $('#sort_type').find(":selected").text().trim();
	var order = $('#sort_order').find(":selected").text().trim();
	var radius = $('#radius').find(":selected").text().trim();
	radius = radius.replace(" miles", "");
	
	$.getJSON("http://prer-backend.appspot.com/v1/entries/search?name=" + proc + "&radius=" + radius + "&lat=" + latitude + "&lng=" + longitude, function(data) {
		results = data;
		if(order == "Ascending") {
			if(type == "Price") {
				results.sort(function(a, b) {
					return a.cost.localeCompare(b.cost);
				});
			} else {
				results.sort(function(a, b) {
					return a.distance.localeCompare(b.distance);
				});
			}
		} else {
			if(type == "Price") {
				results.sort(function(a, b) {
					return b.cost.localeCompare(a.cost);
				});
			} else {
				results.sort(function(a, b) {
					return b.distance.localeCompare(a.distance);
				});
			}
		}
		
	
		$("#list-container ul").empty();

		$.each(results, function(index, value) {
			console.log(value);
			console.log(parseFloat(value.cost));
			add_result(value, index);
		});
	}); 
}

function add_result(value, index) {
	var address = value.hospital.street + " " + 
	value.hospital.city + " " + 
	value.hospital.state + " " + 
	value.hospital.zip_code;
	addMarker(address);
	$("#list-container ul").append("<li>" +
		"<div class=\"panel panel-default\">"+
		  "<div class=\"panel-body\">"+
			"<div class=\"panel-more1\">"+
			  "<img src=\"../static/img/hosp" + ((index % 5) + 1) +".jpg\" width=\"200\" />"+
			"</div>"+
			"<div class=\"panel-info\">"+
			  "<h4 style=\"color: #d2322d;\"><strong>$" + value.cost + "</strong></h4>" +
			  "<p>" + value.hospital.name + "<br/> " + 
			  value.hospital.street + "<br/> " + 
			  value.hospital.city + ", " + 
			  value.hospital.state + " " + 
			  value.hospital.zip_code + "<br/> " + 
			  value.hospital.phone_number + "<br/>" + 
			  "<a href=\"" + value.hospital.url + "\">" + value.hospital.url + "</a><br/>" + 
			  "<a id=\"dir-" + index + "\" href=\"#\">Get Directions</a></p>" +
			"</div>"+
		  "</div>"+
		"</div>"+
	  "</li>");
	  
	  $("#dir-" + index).click(function() {
		  $.getJSON("http://api.hostip.info/get_json.php", function(data) {
				console.log(data.ip);
				$.getJSON("http://www.geoplugin.net/json.gp?ip=" + data.ip, function(data) {
					console.log(data);
					var startAddr = data.geoplugin_city + " " + data.geoplugin_regionCode + " "  + data.geoplugin_countryCode;
					var url = "https://maps.google.com/maps?saddr=" + startAddr + "&daddr=" + address;
					window.location = url;
				});
			});
		});
}