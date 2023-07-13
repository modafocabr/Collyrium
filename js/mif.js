function showHideMif(){
	if($('#divMif').is(':visible') == true){
		$('#divMif').hide();			
		$('#divApp').show();
	}
	else{
		$('#divApp').hide();
		$('#divMif').show();
		showPanelList();
		showFieldDetail();
		showFieldRule();
		showFieldControl();
	}
}

function showPanelList(){
	var view = [];
	view['panel'] = getPanels();
	var template = $('#tplPanelList')[0].innerHTML;
	var output = Mustache.render(template, view);
	$('#tablePanelList')[0].innerHTML = output;
}

function showFieldDetail(){
	var view = [];
	view['panel'] = getFields();
	var template = $('#tplFieldDetail')[0].innerHTML;
	var output = Mustache.render(template, view);
	$('#tableFieldDetail')[0].innerHTML = output;
}

function showFieldRule(){
	var view = [];
	view['panel'] = getFields();
	var template = $('#tplFieldRule')[0].innerHTML;
	var output = Mustache.render(template, view);
	$('#tableFieldRule')[0].innerHTML = output;
}

function showFieldControl(){
	var view = [];
	view['panel'] = getFields();
	console.log(view);
	var template = $('#tplFieldControl')[0].innerHTML;
	var output = Mustache.render(template, view);
	$('#tableFieldControl')[0].innerHTML = output;
}

function getPanels(){
	var charCode = 64;
	var panels = [];
	
	$('form .panel-title b, form table').each(function(){
		var panel = {id:'', code:'', label:'', type: ''};
		var panelEnd = {id:'', code:'', label:'', type: ''};
		
		charCode++;
		
		if($(this).prop('tagName') == 'B'){
			panel.id = $(this).closest('.panel').attr('id');
			panel.code = String.fromCharCode(charCode);
			panel.label = this.innerHTML;
			panel.type = 'panel';
			panels.push(panel);
		}
		else{
			panel.id = $(this).attr('id');
			panelEnd.id = $(this).attr('id');
			
			panel.code = String.fromCharCode(charCode);
			panelEnd.code = String.fromCharCode(charCode);
			
			panel.label = $(this).attr('id').split('_')[1]+' - Início';
			panelEnd.label = $(this).attr('id').split('_')[1]+' - Término';
			
			panel.type = 'start';
			panelEnd.type = 'end';
			
			panels.push(panel);
			panels.push(panelEnd);
		}
	});
	
	return panels;
}

function getFields(){
	var panels = getPanels();
	
	for(var i=0; i<panels.length; i++){
		var fields = [];
		var code = 0;
		console.log(panels[i]);
		
		if(panels[i].type == 'start'){
			$('#'+panels[i].id+' thead tr td b').each(function(){
				console.log(this);
				code++;
				fields.push({id: panels[i].code+code, label: $(this).text(), type: '', list: '', format: '', filling: 'Manual', integrated: 'Não'});
			});
		}
		else{
			$('#'+panels[i].id+' div[class*="col-"]').each(function(){
				if($(this).find('.table-responsive').length == 0 && $(this).find('label').length > 0){
					code++;
					var fieldDetails = getFieldDetails($(this));
					
					fields.push({id: panels[i].code+code, label: fieldDetails.label, type: fieldDetails.type, list: fieldDetails.list, format: fieldDetails.format, filling: fieldDetails.filling, integrated: fieldDetails.integrated});
				}
			});
		}
		panels[i].field = fields;
	}
	
	return panels;
}

function getFieldDetails(element){
	var fieldDetails = {label: '', type: '', list: 'N/A', format: 'Livre', filling: 'Manual', integrated: 'Não'}
	
	fieldDetails.label = element.find('label')[0].innerHTML;
	//fieldDetails.type = (element.find('.form-control').length > 0) ? element.find('.form-control').attr('name').split('_')[0] : element.attr('id').split('_')[0];
	fieldDetails.type = getFieldType(element);
	
	switch(fieldDetails.type){
		case 'Lista':
		case 'Radio':
		case 'Checkbox':
			fieldDetails.list = '';
			fieldDetails.format = 'N/A';
			break;
		case 'Data':
			fieldDetails.format = 'DD/MM/YYYY';
			break;
		case 'Moeda':
			fieldDetails.format = '0.000,00';
			break;
		case 'Porcento':
			fieldDetails.format = '000,00';
			break;
	}
	
	return fieldDetails;
}

function getFieldType(element){
	var formControl = element.find('.form-control');
	if(formControl.length > 0){
		var tagName = formControl.prop('tagName');
		if(tagName == 'INPUT'){
			var mask = formControl.attr('mask');
			
			switch(mask){
				case undefined:
					return (formControl.next().length == 0) ? 'Texto' : 'Zoom';
				case '00/00/0000':
					return 'Data';
				case '#000.000.000,00':
					return 'Moeda';
				case '#000,00':
					return 'Porcento';
				default:
					return 'undefined';
			}
		}
		else if(tagName == 'SELECT') return 'Seleção';
		else if(tagName == 'TEXTAREA') return 'Área de Texto';
	}
	else{
		var type = element.find('input').attr('type');
		return type.charAt(0).toUpperCase() + type.slice(1);
	}
}	