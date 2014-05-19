var accessToken;
var state;
var config = {
    'client_id': '215971084464-qvdpo7inei4u9ihuhjp8sh68o2e5pk4p.apps.googleusercontent.com',
	'immediate': true,
    'scope': 'https://www.googleapis.com/auth/userinfo.profile',
};  

$(document).ready(function() {
  $('#log-in-btn').on('click', onLogIn);
  try_auth();
});

function onLogIn() {
  if($("#log-in-btn").text().trim() == "Log In")
	auth();
  else {
	var url = 'http://127.0.0.1:5000/input';
     window.location = url;
  }
}  

function try_auth() {
	accessToken = sessionStorage.getItem("token")
	if(accessToken != null)
		validateToken();
}
 
function auth() {
	gapi.auth.authorize(config, function() {
		var temp = gapi.auth.getToken();
		accessToken = temp.access_token;
		sessionStorage.setItem("token", accessToken);
		console.log('We have got our token....');
		console.log('We are now going to validate our token....');
		validateToken();
	});
}
 
function validateToken() {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + accessToken,
        data: null,
        success: function(response){  
            console.log('Our token is valid....');
            console.log('We now want to get info about the user using our token....');
            getUserInfo();
        },  
        error: function(error) {
            console.log('Our token is not valid....');
        },
        dataType: "jsonp" 
    });
}
 
function getUserInfo() {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken,
        data: null,
        success: function(response) {
            console.log('We have gotten info back....');
            console.log(response);
            $('#log-in-btn').html("Hello, " + response.name);
        },
        dataType: "jsonp"
    });
}