$(document).ready(function() {
  $('#search-btn').on('click', onSearch);
  $('#log-in-btn').on('click', onLogIn);
});

function onSearch() {
  var proc_name = $('#procedure-name').val();
  var loc = $('#location').val();
  var url = 'http://127.0.0.1:5000/search?proc=' + proc_name + '&loc=' + loc;
  window.location = url;
}

function onLogIn() {
  var url = 'http://127.0.0.1:5000/dash';
  window.location = url;
}