$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', initialize);
});

function initialize() {
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