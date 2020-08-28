var line_height_checkbox = document.getElementById('old-line-height');
var custom_checkbox = document.getElementById('custom-line-height');
var additional_checkbox = document.getElementById('additional');
var disabled_checkbox = document.getElementById('turn_off_ext');
var custom_input = document.getElementById('custom_input');
var refresh_txt = document.getElementById('refresh');

// sync variables
var vars = {
	"old_line_height": true,
	"custom": false,
	"custom_line_height": 1.3,
	"disabled": false,
	"additional": true
};

var inited = false; // var to run doUpdate() differently first time
init();

function init(){
	chrome.storage.sync.get(vars, function(data){
		vars['old_line_height'] = data.old_line_height;
		vars['custom'] = data.custom;
		vars['custom_line_height'] = data.custom_line_height;
		vars['additional'] = data.additional;
		vars['disabled'] = data.disabled;
		
		// init element states
		line_height_checkbox.checked = vars['old_line_height'];
		custom_checkbox.checked = vars['custom'];
		custom_input.disabled = !vars['custom'];
		custom_input.value = vars['custom_line_height'];
		additional_checkbox.checked = vars['additional'];
		disabled_checkbox.checked = vars['disabled'];
		
		// init listeners
		line_height_checkbox.addEventListener('change', doUpdate);
		custom_checkbox.addEventListener('change', doUpdate);
		custom_input.addEventListener('change', doUpdate);
		additional_checkbox.addEventListener('change', doUpdate);
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
	
	// if Additional Reversions is checked
	if(additional_checkbox.checked){
		vars['additional'] = true;
	} else {
		vars['additional'] = false;
	}
	
	// if extension is Disabled
	vars['disabled'] = disabled_checkbox.checked;
	if(vars['disabled']){
		document.body.style.backgroundColor = "#ccc";
	} else {
		document.body.style.backgroundColor = "white";
	}
	
	if(inited){
		// sync new settings
		sync_vars({
			"old_line_height": vars['old_line_height'],
			"custom": vars['custom'],
			"custom_line_height": custom_input.value,
			"disabled": vars['disabled'],
			"additional": vars['additional']
		});
	}
	
	inited =  true;
}

function sync_vars(dict){
	// PITFALLS:
	//	- are multiple set() calls handled in order/sync?
	//	- set() call might fail if popup window closes prematurely?
	chrome.storage.sync.set(dict, function(){

		refresh_txt.style.display = "block";
		
	});
}