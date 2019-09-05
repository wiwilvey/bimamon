$(document).ready( function(){
    var authcode = localStorage.getItem('nig');
    if( authcode == null || authcode == ""){
        window.location="login.html";
    }
})