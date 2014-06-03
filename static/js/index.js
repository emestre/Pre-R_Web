$(document).ready(function() {
  $('#search-btn').on('click', onSearch);
});

function onSearch() {
  var proc_name = $('#procedure-name').val();
  var loc = $('#location').val();
  var mode = $('#mode').find(":selected").text().trim();
  if(loc == "" || proc_name == "") {
	  if(loc == "") {
		$('#location').parent().addClass("has-error");
		$('#location').tooltip({ title: "This field is required.", placement : "bottom" }).tooltip('show');
	  }	
	  else 
		$('#location').parent().removeClass("has-error");
	  if(proc_name == "") {
		$('#procedure-name').parent().addClass("has-error");
		$('#procedure-name').tooltip({ title: "This field is required.", placement : "bottom" }).tooltip('show');
	  }
	  else
		 $('#procedure-name').parent().removeClass("has-error");
  }
  else {
     var url = 'http://127.0.0.1:5000/search?proc=' + proc_name + '&loc=' + loc + '&mode=' + mode;
     window.location = url;
  }
}

function search(event) {
  if (event.which == 13) {
    onSearch();
	event.preventDefault();
  }
}

