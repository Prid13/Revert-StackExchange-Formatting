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
	
	// blockquote styling
	blockquote: "off",
	
	blockquote_dark_col: "#242729",
	
	blockquote_yellow_bgcol: "#fff8dc", // alts: #fbf2d4 (feb, 2020), #fdf7e3 (--yellow-050)
	blockquote_yellow_linecol: "#ffeb8e",
	
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
	// use default line-height if custom disabled
	var line_height = values.custom ? values.custom_line_height : defaultValues.custom_line_height;
	
	if(values.old_line_height || values.custom){
		// paragraphs
		style += ".s-prose { line-height: " + line_height + "!important; }";
	}
	
	if(values.additional){
		// code blocks
		style += ".s-prose pre:not(.s-code-block) { ";
		style += 	"line-height: " 		+ defaultValues.custom_line_height + "!important;";
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
	
	// blockquote styling
	if(values.blockquote == "dark"){
		
		style += ".s-prose blockquote {";
		style += 	"color: " 				+ values.blockquote_dark_col + "!important;";
		style += "}";
		
	} else if(values.blockquote == "yellow"){
		
		// don't apply to spoilers tags
		style += ".s-prose blockquote:not(.spoiler) {";
		style += 	"background-color: "	+ values.blockquote_yellow_bgcol + "!important;";
		style += 	"color: " 				+ values.blockquote_dark_col + "!important;";
		style += "}";
		
		style += ".s-prose blockquote:not(.spoiler):before {";
		style += 	"background: "			+ values.blockquote_yellow_linecol + "!important;";
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