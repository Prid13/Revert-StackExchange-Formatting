var style = "";

var defaultValues = {
	old_line_height: true,
	custom_line_height: 1.3, // default value when custom is turned off
	
	code_block_bgcol: "#eff0f1",
	code_block_padding: "12px 8px",
	code_block_radius: "3px",
	
	inline_code_bgcol: "#e4e6e8",
	inline_code_padding: "1px 5px",
	inline_code_radius: "0px",
	
	comment_code_bgcol: "#eff0f1",
	comment_code_padding: "1px 5px",
	
	custom: false,
	disabled: false,
	additional: true
};

chrome.storage.sync.get(defaultValues, function(savedValues){
	if(!savedValues.disabled){
		buildCSS(savedValues);
		injectCSS();
	}
});

function buildCSS(values){
	var line_height = values.custom ? values.custom_line_height : defaultValues.custom_line_height; // use default if custom disabled
	
	// paragraphs
	style += ".s-prose { line-height: " + line_height + "!important; }";
	
	if(values.additional){
		// code blocks
		style += ".s-prose pre:not(.s-code-block) { ";
		style += 	"background-color: " 	+ values.code_block_bgcol + "!important;";
		style += 	"padding: " 			+ values.code_block_padding + "!important;";
		style += 	"border-radius: " 		+ values.code_block_radius + "!important;";
		style += "}";
		
			// transparent bg on code lines within code blocks
			style += ".s-prose pre:not(.s-code-block) code { background-color: transparent!important; }";
		
		// inline code
		style += ".s-prose code:not(.s-code-block) {";
		style += 	"background-color: " 	+ values.inline_code_bgcol + "!important;";
		style += 	"padding: " 			+ values.inline_code_padding + "!important;";
		style += 	"border-radius: " 		+ values.inline_code_radius + "!important;";
		style += "}";
		
		// comment inline code
		style += ".comment-text code {";
		style += 	"background-color: " 	+ values.comment_code_bgcol + "!important;";
		style += 	"padding: " 			+ values.comment_code_padding + "!important;"; // padding is same
		style += "}";
	} else {
		
		// fix padding for inline code if only old line-height is enabled
		style += ".s-prose code:not(.s-code-block) {";
		style += 	"padding: " 			+ values.inline_code_padding + "!important;";
		style += "}";
		
	}
}

function injectCSS(){
	// credit: https://stackoverflow.com/a/13436780/3705191
	var cssStyle = document.createElement('style');
	cssStyle.type = 'text/css';
	var rules = document.createTextNode(style);
	cssStyle.appendChild(rules);
	document.getElementsByTagName("head")[0].appendChild(cssStyle);
}