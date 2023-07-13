$(document).ready(function(){
	binds();
});

function binds(){
	//Design binds
	bindAddElement();
	bindSetLabel();
	bindSelect();

	//App binds
	bindKeyboard();
	
	//Help binds
	closeHelp();
}

function bindKeyboard(){
	$(document).keyup(function(e){
		if(e.keyCode == 46) deleteSelectedElement();
		else if(e.keyCode == 37) moveToLeftSelectedElement();
		else if(e.keyCode == 38) moveToUpSelectedElement();
		else if(e.keyCode == 39) moveToRightSelectedElement();
		else if(e.keyCode == 40) moveToDownSelectedElement();
		else if(e.keyCode == 76) clearAllSelections(); //L button
		else if(e.keyCode == 120) showHideSourceCode(); //F9 button
		else if(e.keyCode == 121) showHideMif(); //F10 button
	});
}