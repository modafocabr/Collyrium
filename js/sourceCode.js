function showHideSourceCode(){
	if($('#divSource').is(':visible') == true){
		$('form[name="form"]')[0].innerHTML = '';
		$('form[name="form"]').append($('#formSource').val());	

		$('#divSource').hide();			
		$('#divApp').show();
	}
	else{
		var source = $('form[name="form"]')[0].innerHTML.replace(/type="text">/g,'type="text"/>');		
		
		$('#formSource').val(source);
		$('#divApp').hide();
		$('#divSource').show();							
	}
}