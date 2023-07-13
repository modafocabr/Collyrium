function getTemplate(templateName, globalId){
	var tmpl = '';
	
	switch(templateName){
		case 'title':
			tmpl+= '<div class="panel panel-default" id="title_'+globalId+'">';
			tmpl+= '	<div class="panel-body">';
			tmpl+= '		<h1><b>Título</b></h1>';
			tmpl+= '	</div>';
			tmpl+= '</div>';
			break;
		case 'panel':
			tmpl+= '<div class="panel panel-default" id="panel_'+globalId+'">';
			tmpl+= '	<div class="panel-heading ">';
			tmpl+= '		<h3 class="panel-title"><b>Painel</b></h3>';
			tmpl+= '	</div>';
			tmpl+= '	<div class="panel-body"></div>';
			tmpl+= '</div>';
			break;			
		case 'row':
			tmpl+= '<div class="form-group row row-empty"></div>';
			break;
		case 'text':
			tmpl+= '<div class="col-md-3">';
			tmpl+= '	<label for="texto_'+globalId+'">Texto</label>';
			tmpl+= '	<input type="text" class="form-control" name="texto_'+globalId+'" id="texto_'+globalId+'" />';
			tmpl+= '</div>';
			break;
		case 'date':
			tmpl+='<div class="col-md-3">';
			tmpl+='		<label for="data_'+globalId+'">Data</label>';
			tmpl+='		<div class="input-group enable-calendar">';
			tmpl+='			<input type="text" class="form-control" name="data_'+globalId+'" id="data_'+globalId+'" mask="00/00/0000"/>';
			tmpl+='			<span class="input-group-addon fs-cursor-pointer">';
			tmpl+='				<span class="fluigicon fluigicon-calendar"></span>';
			tmpl+='			</span>';
			tmpl+='		</div>';
			tmpl+='</div>';
			break;
		case 'money':
			tmpl+= '<div class="col-md-3">';
			tmpl+= '	<label for="moeda_'+globalId+'">Moeda</label>';
			tmpl+= '	<input type="text" class="form-control" name="moeda_'+globalId+'" mask="#000.000.000,00" placeholder="0.000.000,00" />';
			tmpl+= '</div>';
			break;
		case 'percent':
			tmpl+= '<div class="col-md-3">';
			tmpl+= '	<label for="porcento_'+globalId+'">Porcento</label>';
			tmpl+= '	<input type="text" class="form-control" name="porcento_'+globalId+'" mask="#000,00" placeholder="000,00" />';
			tmpl+= '</div>';
			break;
		case 'zoom':
			tmpl+= '<div class="col-md-3">';
			tmpl+= '	<label for="zoom_'+globalId+'">Zoom</label>';
			tmpl+= '	<div class="input-group">';
			tmpl+= '		<input type="text" class="form-control" name="zoom_'+globalId+'" id="zoom_'+globalId+'" />';
			tmpl+= '		<span class="input-group-addon fs-cursor-pointer">';
			tmpl+= '			<span class="fluigicon fluigicon-search enable-zoom" data-zoom="{\'displayKey\':\'colleagueName\',\'datasetId\':\'colleague\',\'fields\':[{\'field\':\'colleagueId\',\'label\':\'ID\'},{\'field\':\'colleagueName\',\'label\':\'Nome\',\'standard\':\'true\',\'search\':\'true\'},{\'field\':\'login\',\'label\':\'Login\',\'search\':\'true\'}]}"></span>';
			tmpl+= '		</span>';
			tmpl+= '	</div>';
			tmpl+= '</div>';
			break;
		case 'select':
			tmpl+= '<div class="col-md-3">';
			tmpl+= '	<label for="lista_'+globalId+'">Lista</label>';
			tmpl+= '	<select class="form-control" name="lista_'+globalId+'"></select>';
			tmpl+= '</div>';
			break;
		case 'groupRadio':
			tmpl+='<div class="col-md-3">';
			tmpl+='		<label>Radio</label>';
			tmpl+='</div>';
			break;
		case 'radio':
			tmpl+='<div class="radio">';
			tmpl+='		<label>';
			tmpl+='			<input name="{radio}" id="radio_'+globalId+'" value="opção" type="radio"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			break;
		case 'groupCheckbox':
			tmpl+='<div class="col-md-3">';
			tmpl+='		<label>Checkbox</label>';
			tmpl+='</div>';
			break;
		case 'checkbox':
			tmpl+='<div class="checkbox">';
			tmpl+='		<label>';
			tmpl+='			<input name="option_'+globalId+'" value="opção" type="checkbox"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			break;
		case 'textarea':
			tmpl+= '<div class="col-md-3">';
			tmpl+= '	<label for="Textarea_'+globalId+'">Área de texto</label>';
			tmpl+= '	<textarea class="form-control" name="textarea_'+globalId+'" id="textarea_'+globalId+'"></textarea>';
			tmpl+= '</div>';
			break;
		case 'groupPaiFilho':
			tmpl+='<div class="col-md-12">';
			tmpl+='		<div class="table-responsive">';
			tmpl+='			<table border="0" class="table table-striped table-bordered" tablename="table_'+globalId+'" id="table_'+globalId+'" nodeletebutton="false" addbuttonclass="btn btn-primary">';
			tmpl+='				<thead>';
			tmpl+='					<tr>';
			//tmpl+='						<td><b></b></td>';
			tmpl+='					</tr>';
			tmpl+='				</thead>';
			tmpl+='				<tbody>';
			tmpl+='					<tr>';
			//tmpl+='						<td></td>';
			tmpl+='					</tr>';
			tmpl+='				</tbody>';
			tmpl+='			</table>';
			tmpl+='		</div>';
			tmpl+='</div>';
			break;
		case 'inputChild':
			tmpl+='<td><input type="text" class="form-control" name="field_'+globalId+'" id="field_'+globalId+'" /></td>';
			break;
		case 'labelChild':
			tmpl+='<td><b>Pai-Filho</b></td>';
			break;			
	}
	
	return tmpl;
}

function getTemplateLabelless(templateName, globalId){
	var tmpl = '';
	
	switch(templateName){
		case 'text':
			tmpl+= '<input type="text" class="form-control" name="texto_'+globalId+'" id="texto_'+globalId+'" />';
			break;
		case 'date':
			tmpl+='<div class="input-group enable-calendar">';
			tmpl+='		<input type="text" class="form-control" name="data_'+globalId+'" id="data_'+globalId+'" mask="00/00/0000"/>';
			tmpl+='		<span class="input-group-addon fs-cursor-pointer">';
			tmpl+='			<span class="fluigicon fluigicon-calendar"></span>';
			tmpl+='		</span>';
			tmpl+='</div>';
			break;
		case 'money':
			tmpl+= '<input type="text" class="form-control" name="moeda_'+globalId+'" mask="#000.000.000,00" placeholder="0.000.000,00" />';
			break;
		case 'percent':
			tmpl+= '<input type="text" class="form-control" name="porcento_'+globalId+'" mask="#000,00" placeholder="000,00" />';
			break;
		case 'zoom':
			tmpl+= '<div class="input-group">';
			tmpl+= '	<input type="text" class="form-control" name="zoom_'+globalId+'" id="zoom_'+globalId+'" />';
			tmpl+= '	<span class="input-group-addon fs-cursor-pointer">';
			tmpl+= '		<span class="fluigicon fluigicon-search enable-zoom" data-zoom="{\'displayKey\':\'colleagueName\',\'datasetId\':\'colleague\',\'fields\':[{\'field\':\'colleagueId\',\'label\':\'ID\'},{\'field\':\'colleagueName\',\'label\':\'Nome\',\'standard\':\'true\',\'search\':\'true\'},{\'field\':\'login\',\'label\':\'Login\',\'search\':\'true\'}]}"></span>';
			tmpl+= '	</span>';
			tmpl+= '</div>';
			break;
		case 'select':
			tmpl+= '<select class="form-control" name="lista_'+globalId+'"></select>';
			break;
		case 'groupRadio':
			tmpl+='		<div class="radio">';
			tmpl+='			<label>';
			tmpl+='				<input name="{radio}" id="radio_'+globalId+'" value="opção" type="radio"/>';
			tmpl+='				<span>Opção</span>';
			tmpl+='			</label>';
			tmpl+='		</div>';
			tmpl+='		<div class="radio">';
			tmpl+='			<label>';
			tmpl+='				<input name="{radio}" id="radio_'+globalId+'" value="opção" type="radio"/>';
			tmpl+='				<span>Opção</span>';
			tmpl+='			</label>';
			tmpl+='		</div>';
			tmpl+='		<div class="radio">';
			tmpl+='			<label>';
			tmpl+='				<input name="{radio}" id="radio_'+globalId+'" value="opção" type="radio"/>';
			tmpl+='				<span>Opção</span>';
			tmpl+='			</label>';
			tmpl+='		</div>';
			tmpl+='		<div class="radio">';
			tmpl+='			<label>';
			tmpl+='				<input name="{radio}" id="radio_'+globalId+'" value="opção" type="radio"/>';
			tmpl+='				<span>Opção</span>';
			tmpl+='			</label>';
			tmpl+='		</div>';
			tmpl+='		<div class="radio">';
			tmpl+='			<label>';
			tmpl+='				<input name="{radio}" id="radio_'+globalId+'" value="opção" type="radio"/>';
			tmpl+='				<span>Opção</span>';
			tmpl+='			</label>';
			tmpl+='		</div>';
			break;
		case 'groupCheckbox':
			tmpl+='<div class="checkbox">';
			tmpl+='		<label>';
			tmpl+='			<input name="option_'+globalId+'" value="opção" type="checkbox"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			tmpl+='<div class="checkbox">';
			tmpl+='		<label>';
			tmpl+='			<input name="option_'+globalId+'" value="opção" type="checkbox"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			tmpl+='<div class="checkbox">';
			tmpl+='		<label>';
			tmpl+='			<input name="option_'+globalId+'" value="opção" type="checkbox"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			tmpl+='<div class="checkbox">';
			tmpl+='		<label>';
			tmpl+='			<input name="option_'+globalId+'" value="opção" type="checkbox"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			tmpl+='<div class="checkbox">';
			tmpl+='		<label>';
			tmpl+='			<input name="option_'+globalId+'" value="opção" type="checkbox"/>';
			tmpl+='			<span>Opção</span>';
			tmpl+='		</label>';
			tmpl+='</div>';
			break;
		case 'textarea':
			tmpl+= '<textarea class="form-control" name="textarea_'+globalId+'" id="textarea_'+globalId+'"></textarea>';
			break;
	}
	
	return tmpl;	
}