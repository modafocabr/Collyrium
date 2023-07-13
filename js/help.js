function closeHelp(){
	$('#closeHelp').on('click', function(){
		showHideHelp();
	});
}

function showHideHelp(){
	if($('#divHelp').is(':visible') == true){
		$('#divHelp').hide();			
		$('#divApp').show();
	}
	else{
		$('#divApp').hide();
		$('#divHelp').show();							
	}
}