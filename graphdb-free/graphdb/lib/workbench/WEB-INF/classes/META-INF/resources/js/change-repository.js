define(['angular/core/core'], function() {
	$(function() {
	    $("#repositorySelectDropdown").on('hidden.bs.dropdown', function(e) {
	        $("#repositorySelectCaret").attr('class', 'fa fa-caret-right');
	    });
	
	    $("#repositorySelectDropdown").on('show.bs.dropdown', function(e) {
	        $("#repositorySelectCaret").attr('class', 'fa fa-caret-down');
	    });
	});
	
	
	function changeRepository(node) {
	    var shouldReload = false;
	    if ($("#currentRepository").text() === 'None selected') {
	        shouldReload = true;
	    }
	    repositoryName = node.text.trim();
	    backendRepositoryID = repositoryName;
	    $.cookie('current.repository.id', repositoryName, {path : '/'});
	    $("#currentRepository").text(repositoryName);
	    if (shouldReload) {
	        window.location.reload();
	    }
	}
});