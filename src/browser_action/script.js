var line_height_checkbox = document.getElementById('old-line-height');
var custom_checkbox = document.getElementById('custom-line-height');
var p_spacing_checkbox = document.getElementById('p_spacing');
var additional_checkbox = document.getElementById('additional');
var old_font_checkbox = document.getElementById('old-font');
var old_code_font_checkbox = document.getElementById('old-code-font');
var custom_font_checkbox = document.getElementById('custom-font');
var blockquote_radio = document.getElementsByName('blockquote');
var disabled_checkbox = document.getElementById('turn_off_ext');
var custom_input = document.getElementById('custom_input');
var refresh_txt = document.getElementById('refresh');

// sync variables (default values listed)
var vars = {
	"old_line_height": true,
	"custom": false,
	"custom_line_height": 1.3,
	"old_paragraph_spacing": true,
	"additional": true,
	"old_font": true,
	"old_code_font": true,
	"custom_font": false,
	"blockquote": "off",
	"disabled": false
};

var inited = false; // var to run doUpdate() differently first time
init();

function init(){
	chrome.storage.sync.get(vars, function(data){
		vars['old_line_height'] = data.old_line_height;
		vars['custom'] = data.custom;
		vars['custom_line_height'] = data.custom_line_height;
		vars['old_paragraph_spacing'] = data.old_paragraph_spacing;
		vars['additional'] = data.additional;
		vars['old_font'] = data.old_font;
		vars['old_code_font'] = data.old_code_font;
		vars['blockquote'] = data.blockquote;
		vars['disabled'] = data.disabled;
		
		// init element states
		line_height_checkbox.checked = vars['old_line_height'];
		custom_checkbox.checked = vars['custom'];
		custom_input.disabled = !vars['custom'];
		custom_input.value = vars['custom_line_height'];
		p_spacing_checkbox.checked = vars['old_paragraph_spacing'];
		additional_checkbox.checked = vars['additional'];
		old_font_checkbox.checked = vars['old_font'];
		old_code_font_checkbox.checked = vars['old_code_font'];
		disabled_checkbox.checked = vars['disabled'];
		
		// loop radio buttons
		for(var i = 0; i < blockquote_radio.length; i++){
			var blockquote = blockquote_radio;
			if(blockquote[i].value == vars['blockquote']){
				blockquote[i].checked = true;
			} else {
				blockquote[i].checked = false;
			}
			
			// radio button event listeners
			blockquote[i].addEventListener('click', doUpdate);
		}
		
		// init listeners
		line_height_checkbox.addEventListener('change', doUpdate);
		custom_checkbox.addEventListener('change', doUpdate);
		custom_input.addEventListener('change', doUpdate);
		p_spacing_checkbox.addEventListener('change', doUpdate);
		additional_checkbox.addEventListener('change', doUpdate);
		old_font_checkbox.addEventListener('change', doUpdate);
		old_code_font_checkbox.addEventListener('change', doUpdate);
		disabled_checkbox.addEventListener('change', doUpdate);
		
		doUpdate();
	});
}

function doUpdate(){
	// if Old Line-Height is checked
	if(line_height_checkbox.checked){
		vars['old_line_height'] = true;
	} else {
		vars['old_line_height'] = false;
	}
	
	// if Custom Line-Height is checked
	if(custom_checkbox.checked){
		vars['custom'] = true;
	} else {
		vars['custom'] = false;
	}
	custom_input.disabled = !vars['custom']; // disable when custom line-height is OFF
	
	// if Old Paragraph Spacing is checked
	if(p_spacing_checkbox.checked){
		vars['old_paragraph_spacing'] = true;
	} else {
		vars['old_paragraph_spacing'] = false;
	}
	
	// if Additional Reversions is checked
	if(additional_checkbox.checked){
		vars['additional'] = true;
	} else {
		vars['additional'] = false;
	}
	
	// if Revert Font is checked
	if(old_font_checkbox.checked){
		vars['old_font'] = true;
	} else {
		vars['old_font'] = false;
	}
	
	// if Revert Code Font is checked
	if(old_code_font_checkbox.checked){
		vars['old_code_font'] = true;
	} else {
		vars['old_code_font'] = false;
	}
	
	// if Blockquote radio is changed
	var blockquote = blockquote_radio;
	for(var i = 0; i < blockquote.length; i++){
		if(blockquote[i].checked){
			vars['blockquote'] = blockquote[i].value;
			break;
		}
	}
	
	// if extension is Disabled
	vars['disabled'] = disabled_checkbox.checked;
	if(vars['disabled']){
		document.body.style.backgroundColor = "#d8a9a9";
	} else {
		document.body.style.backgroundColor = "white";
	}
	
	if(inited){
		// sync new settings
		sync_vars({
			"old_line_height": vars['old_line_height'],
			"custom": vars['custom'],
			"custom_line_height": custom_input.value,
			"old_paragraph_spacing": vars['old_paragraph_spacing'],
			"additional": vars['additional'],
			"old_font": vars['old_font'],
			"old_code_font": vars['old_code_font'],
			"blockquote": vars['blockquote'],
			"disabled": vars['disabled']
		});
	}
	
	inited =  true;
}

function sync_vars(dict){
	// PITFALLS:
	//	- are multiple set() calls handled in order/sync?
	//	- set() call might fail if popup window closes prematurely?
	chrome.storage.sync.set(dict, function(){

		refresh_txt.style.display = "block"; // make "REFRESH PAGE" label visible
		
	});
}