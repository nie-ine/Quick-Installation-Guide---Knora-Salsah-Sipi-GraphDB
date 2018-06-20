define(['angular/core/core'], function() {
	$(document).ready(function() {
	   $(".nav li.disabled a").click(function() {
	     return false;
	   });
	});
});