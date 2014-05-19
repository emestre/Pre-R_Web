var num_procs = 0;

$(document).ready(function() {
	$('#insured_dd li').click(function () {
		$('#insured').text($(this).text());
	});
	$('#right_content').height($('#middle_content').height());
	$('#left_content').height($('#middle_content').height());
});

function validate(evt, ele) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
	$(ele).tooltip({ title: "Only numbers are allowed", placement : "bottom" }).tooltip('show');
  }
  else {
	$(ele).tooltip('hide');
  }
}

function addservice() {
	num_procs++;
	var new_service = 
					"<div class=\"proc-" + num_procs + "\">" +	
					"<hr class=\"divider\" />" +  					
					"<div class=\"form-group\">" +
					 "<label for=\"service_name\" class=\"col-sm-2 control-label\">Name</label>" +
					 "<div class=\"col-sm-10\">" +
					  "<input type=\"text\" class=\"form-control\" id=\"service_name\" placeholder=\"Name\">" +
					 "</div>" +
				    "</div>" +
					
					"<div class=\"form-group\">" +
					 "<label for=\"cpt_code\" class=\"col-sm-2 control-label\">CPT</label>" +
					 "<div class=\"col-sm-10\">" +
					  "<input type=\"text\" class=\"form-control\" id=\"cpt_code\" placeholder=\"CPT Code\">" +
					" </div>" +
				   "</div>" +
				   
				  "<div class=\"form-group\">" +			  
				  "<label for=\"cost\" class=\"col-sm-2 control-label\">Cost</label>" +
				  "<div class=\"col-sm-10\">" +
				  "<div class=\"input-group\">" +
					  "<span class=\"input-group-addon\">$</span>" +
					  "<input type=\"price\" class=\"form-control\" id=\"cost\" placeholder=\"Cost\" onkeypress=\"validate(event, this)\">" +
					"</div>" +
				 "</div>" +
				  "</div>" +
				  "<div class=\"form-group\">" +
					 "<label for=\"description\" class=\"col-sm-2 control-label\">Desc.</label>" +
					 "<div class=\"col-sm-10\">" +
					  "<input type=\"text\" class=\"form-control\" id=\"description\" placeholder=\"Description\">" +
					 "</div>" +
				  "</div>" +
				"</div>";

	$("#add-procedure").before(new_service);
	$("#remove-procedure").show();
	if(num_procs > 0)
		$('#right_content').height('100%');
}

function removeservice() {
	$(".proc-" + num_procs).remove();
	num_procs--;
	console.log(num_procs);
	if(num_procs == 0) {
		$("#remove-procedure").hide();
		$('#right_content').height($('#middle_content').height());
	}
}

$('#submit').click(function() {
var btn = $(this)
    btn.button('loading');
	setTimeout(function() { done_loading(btn); }, 2000);
});

function done_loading(btn) {
	btn.button('complete');
	btn.removeClass('btn-primary');
	btn.addClass('btn-success');
	btn.append('<i class=\"glyphicon glyphicon-ok\"></i>');
	btn.unbind('click');
}