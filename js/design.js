function bindAddElement(){
	$('.list-group-item').on('click', function(){
		var dataElement = $(this).data('element');
		if(dataElement == null) showHideHelp();
		else if(dataElement.element != '') addElement(dataElement.element, dataElement.location);
	});
}

function bindSetLabel(){
	$(document).on('dblclick','b', function(){
		if($(this).hasClass('internal')) return;
		
		var newLabel = prompt('Mudar o label para:', this.innerHTML);
		if(newLabel != null && newLabel != ''){
			this.innerHTML = newLabel;
			$(this).closest('div[class~="panel"]').attr('id', generateId(newLabel));
		}		
	});

	$(document).on('dblclick','label', function(){
		if($(this).hasClass('internal')) return;
		if(this.tagName == 'SPAN' || this.innerHTML.indexOf('<') >= 0) return;
		
		var newLabel = prompt('Mudar o label para:', this.innerHTML);
		var newSize = prompt('Mudar a largura para:', $(this).parent().attr('class'));
		var id;
		var parent = $(this).parent();
		
		if(newLabel != null && newLabel != ''){
			id = generateId(newLabel);
			this.innerHTML = newLabel;
			
			if($(this).next().hasClass('radio') == true){
				$(this).parent().find('input[type="radio"]').attr("name", validName(newLabel));
			}
			else if($(this).next().hasClass('checkbox') == false){
				$(this).attr('for', id);
				$(this).parent().find('input, select, textarea').attr('id', id);
				$(this).parent().find('input, select, textarea').attr('name', validName(id));
			}
		}
		
		if(newSize != null && newSize != ''){
			$(this).parent().attr('class', newSize);
		}
	});	
	
	$(document).on('dblclick','span', function(){
		var newLabel = prompt('Mudar o label para:', this.innerHTML);
		var id;

		if(newLabel != null && newLabel != ''){
			id = generateId(newLabel);
			this.innerHTML = newLabel;
			$(this).prev().attr('id', id);
			$(this).prev().attr('value', newLabel);
		}
	});	
}

function bindSelect(){
	$(document).on('click', 'div, span', function(){
		var jElement = $(this);
		
		if(jElement.hasClass('internal')) return;
		else if(jElement.prop('tagName') == 'SPAN') selectSpan(jElement);
		else if(jElement.attr('class') != null && jElement.attr('class').includes('col-md-') == true) selectInput(jElement);
		else if(jElement.hasClass('row') == true) selectRow(jElement);
		else if(jElement.hasClass('panel') == true) selectPanel(jElement);
	});
	
	$(document).on('dblclick', 'input[type="text"], textarea', function(){
		var isReadonly = $(this).prop('readonly');
		$(this).prop('readonly', !isReadonly);
	});
}

function addElement(element, location){
	var template = getTemplate(element, getGlobalId());
	var parent;
	var name;
	
	switch(location){
		case 'form':
			parent = $('form[name="form"]');
			break;
		case 'panel':
			parent = $('.panel-danger').find('.panel-body');
			name = 'painel';
			break;
		case 'row':
			parent = $('.row-danger');
			parent.removeClass('row-empty');
			name = 'linha';
			break;
		case 'group':
			parent = $('.input-danger');
			name = 'grupo';
			if(element == 'radio'){
				var label = $(parent).find('label').first().text();
				template = template.replace('{radio}',label);
			}
			break;
		case 'table':
			template = getTemplate('labelChild', getGlobalId());
			parent = $('.input-danger').find('thead').find('tr');
			parent.append(template);
			
			template = getTemplate('inputChild', getGlobalId());
			parent = $('.input-danger').find('tbody').find('tr');
			name = 'tabela';
			break;
	}
	
	if(parent.length == 0){
		var labelChild = getTemplate('labelChild', getGlobalId());
		parent = $('.input-danger').find('thead').find('tr');
		parent.append(labelChild);
		
		parent = $('.input-danger').find('tbody').find('tr');
		template = getTemplateLabelless(element, getGlobalId());
		template = '<td>'+template+'</td>';
	}
	
	if(parent.length == 0) alert('Um elemento do tipo '+name+' deve ser selecionado!');
	else if(element == 'groupPaiFilho'){
		parent.append(template);
		alert('Tabela criada. Clique no campo que deseja incluir na tabela.');
		parent.removeClass('row-danger');
		parent.find('table').parent().addClass('input-danger');
	}
	else parent.append(template);	
}

var globalId = 0;
function getGlobalId(){
	return ++globalId;
}

function generateId(id){
	return id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')+'_'+getGlobalId();
}

function selectSpan(jElement){
	if(jElement.hasClass('span-danger') == true){
		jElement.removeClass('span-danger');
	}
	else{
		$('.span-danger').removeClass('span-danger');
		jElement.addClass('span-danger');				
	}
}

function selectInput(jElement){
	if(jElement.hasClass('input-danger') == true){
		jElement.removeClass('input-danger');
	}
	else{
		$('.input-danger').removeClass('input-danger');
		jElement.addClass('input-danger');				
	}	
}

function selectRow(jElement){
	if(jElement.hasClass('row-danger') == true){
		jElement.removeClass('row-danger');
	}
	else{
		$('.row-danger').removeClass('row-danger');
		jElement.addClass('row-danger');				
	}			
}

function selectPanel(jElement){
	if(jElement.hasClass('panel-default') == true){
		$('.panel-danger').addClass('panel-default');
		$('.panel-danger').removeClass('panel-danger');
		jElement.removeClass('panel-default');
		jElement.addClass('panel-danger');
	}
	else{
		jElement.removeClass('panel-danger');
		jElement.addClass('panel-default');
	}	
}

function deleteSelectedElement(){
	if($('.span-danger').length > 0) $('.span-danger').closest('div').remove();
	else if($('.input-danger').length > 0) $('.input-danger').remove();
	else if($('.row-danger').length > 0) $('.row-danger').remove();
	else if($('.panel-danger').length > 0) $('.panel-danger').remove();	
	refreshEmptyRow();
}

function moveToLeftSelectedElement(){
	var target = $('.input-danger').prev();
	var source = $('.input-danger');
	
	if(source.length > 0 && target.length > 0){
		$('.input-danger').remove();
		source.insertBefore(target);
	}
}

function moveToUpSelectedElement(){
	var target = $('.input-danger').parent().prev();
	var source = $('.input-danger');
	
	if(source.length > 0 && target.length > 0){
		$('.input-danger').remove();
		source.appendTo(target);
		refreshEmptyRow();
	}
}

function moveToRightSelectedElement(){
	var target = $('.input-danger').next();
	var source = $('.input-danger');
	
	if(source.length > 0 && target.length > 0){
		$('.input-danger').remove();
		source.insertAfter(target);
	}
}

function moveToDownSelectedElement(){
	var target = $('.input-danger').parent().next();
	var source = $('.input-danger');
	
	if(source.length > 0 && target.length > 0){
		$('.input-danger').remove();
		source.appendTo(target);
		refreshEmptyRow();			
	}
}

function refreshEmptyRow(){
	$('.row').removeClass('row-empty');
	$('.row').each(function(){
		if($(this).children().length == 0) $(this).addClass('row-empty');
	});
}

function clearAllSelections(){
	$('.panel-danger').addClass('panel-default');
	$('.panel-danger').removeClass('panel-danger');
	
	$('.row-danger').addClass('row-default');
	$('.row-danger').removeClass('row-danger');
	
	$('.input-danger').addClass('input-default');
	$('.input-danger').removeClass('input-danger');
	
	$('.span-danger').addClass('span-default');
	$('.span-danger').removeClass('span-danger');	
}

function validName(name){
	return name.substr(0, 30);
}