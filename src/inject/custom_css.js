var style = "";

var defaultValues = {
	old_line_height: true,
	custom_line_height: 1.3, // default value when custom is turned off
	
	old_paragraph_spacing: true,
	paragraph_spacing: "15px", // margin-bottom
	
	code_block_bgcol: "#eff0f1",
	code_block_padding: "12px 8px",
	code_block_radius: "3px",
	
	inline_code_bgcol: "#e4e6e8",
	inline_code_padding: "1px 5px",
	inline_code_radius: "0px",
	
	comment_code_bgcol: "#eff0f1",
	comment_code_padding: "1px 5px",
	
	// fonts
	old_font: true,
	old_code_font: true,
	
	default_old_font: 'Arial,"Helvetica Neue",Helvetica,sans-serif',
	codeblock_old_font: 'Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif',
	
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
		// paragraphs' line height
		style += ".s-prose { line-height: " + line_height + "!important; }";
	}
	
	if(values.old_paragraph_spacing){
		// paragraph spacing
		style += ".s-prose p, .s-prose ol, .s-prose ul, .s-prose blockquote, .s-prose hr { ";
		style += 	"margin-bottom: "		+ defaultValues.paragraph_spacing + "!important;"; // 15px
		style += "}";
		
		// margin-bottom for <pre>
		style += ".s-prose pre { ";
		style += 	"margin-bottom: "		+ "13px!important;";
		style += "}";
		
		// margin-bottom for ul li, ol li
		style += ".s-prose ol li, .s-prose ul li { ";
		style += 	"margin-bottom: "		+ "7.5px!important;";
		style += "}";
		// fix margin-bottom for last element in ol and ul
		style += ".s-prose ol li:last-child, .s-prose ul li:last-child { ";
		style += 	"margin-bottom: "		+ "0!important;";
		style += "}";
		
		// heading margin-bottom
		style += ".s-prose h1 { margin-bottom: 21px!important; }";
		style += ".s-prose h2 { margin-bottom: 19px!important; }";
		style += ".s-prose h3 { margin-bottom: 17px!important; }";
		style += ".s-prose h4 { margin-bottom: 15px!important; }";
		
		// fix margin-bottom for last element in blockquote
		style += ".s-prose blockquote *:last-child { ";
		style += 	"margin-bottom: "		+ "0!important;"; // don't apply to blockquotes
		style += "}";
	}
	
	if(values.additional){
		// code blocks
		style += ".s-prose pre.s-code-block, .s-prose pre:not(.s-code-block) { ";
		style += 	"line-height: "			+ defaultValues.custom_line_height + "!important;";
		style += 	"background-color: "	+ values.code_block_bgcol + "!important;";
		style += 	"padding: " 			+ values.code_block_padding + "!important;";
		style += 	"border-radius: " 		+ values.code_block_radius + "!important;";
		style += "}";
		
			// fix inline code styling overriding code blocks (add transparent bg, remove padding)
			style += ".s-prose pre.s-code-block code, .s-prose pre:not(.s-code-block) code { ";
			style += 	"background-color: transparent!important;";
			style += 	"padding: 0!important;";
			style += "}";
		
		// inline code
		style += ".s-prose *:not(.s-code-block) > code {";
		style += 	"background-color: "	+ values.inline_code_bgcol + "!important;";
		style += 	"padding: " 			+ values.inline_code_padding + "!important;";
		style += 	"border-radius: " 		+ values.inline_code_radius + "!important;";
		style += "}";
		
		// comment inline code
		style += ".comment-text code {";
		style += 	"background-color: "	+ values.comment_code_bgcol + "!important;";
		style += 	"padding: " 			+ values.comment_code_padding + "!important;"; // padding is same
		style += "}";
	} else {
		
		if(values.old_line_height || values.custom){
			
			// fix padding for inline code if only old line-height is enabled
			style += ".s-prose *:not(.s-code-block):not(pre) > code {";
			style += 	"padding: " 			+ values.inline_code_padding + "!important;";
			style += "}";
		
		}
	}
	
	// fonts styling
	style += "body {";
	
	if(values.old_font){
		style += 	"--ff-sans: " + values.default_old_font + "!important;";
		style += 	"--ff-serif: " + values.default_old_font + "!important;";
	}
	if(values.old_code_font){
		style += 	"--ff-mono: " + values.codeblock_old_font + "!important;";
	}
	
	style += "}";
	
	// blockquote styling
	if(values.blockquote == "dark"){
		
		style += ".s-prose blockquote {";
		style += 	"color: "				+ values.blockquote_dark_col + "!important;";
		style += "}";
		
	} else if(values.blockquote == "yellow"){
		
		// don't apply to spoilers tags
		style += ".s-prose blockquote:not(.spoiler) {";
		style += 	"background-color: "	+ values.blockquote_yellow_bgcol + "!important;";
		style += 	"color: "				+ values.blockquote_dark_col + "!important;";
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