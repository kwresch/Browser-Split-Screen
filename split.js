
function addColumns(count) {
	for (var i = 0; i < count; i++) {
		$('body').append('<div id="col_' + i + '" class="column">COLUMN ' + i + '</div>');
		$("#col_" + i).width((100 / count) + "%");
	}
}

/*chrome.runtime.onMessage.addListener(function (msg, sender, callback) {
	console.log("MESSAGE RECEIVED");
	console.log("MSG: " + JSON.stringify(msg));
});*/

function setWebPage(data) {
	//console.log("PAGE: " + data.html);
	//var teststr = "background:url(/images/nav_logo242.png)";
	//console.log("BEFORE: " + teststr); 
	//teststr = teststr.replace(/url\(\//g, "TEST");
	//console.log("AFTER: " + teststr);
	var html = data.html.replace(/\"\/\//g, "\"http://");
	html = html.replace(/src=\"\//g, ("src=\"" + data.url));
	html = html.replace(/url\(\//g, ("url(" + data.url));
	html = html.replace(/href=\"\//g, ("href=\"" + data.url));
	html = html.replace(/srcset=\"\//g, ("srcset=\"" + data.url));
	html = html.replace(/content=\"\//g, ("content=\"" + data.url));
	var head = html.match(/<head>(.|\n)*<\/head>/);
	var body = html.match(/<body(.|\n)*<\/body>/);
	//console.log("HEAD: " + head[0]);
	console.log("HEAD SIZE: " + head.length);
	console.log("BODY SIZE: " + body.length);
	$('#col_' + data.col).html(html);
}

function loadWebPages(pages) {
	console.log("LEN: " + pages.length);
	for (var i = 0; i < pages.length; i++) {
		chrome.extension.sendMessage({
			col: i,
			url: pages[i],
		}, setWebPage);
	}
}

$(document).ready(function() {
	// Add columns
	//addColumns(2);
	addColumns(1);

	var pages = [];
	//pages.push("https://www.google.com/");
	pages.push("https://keep.google.com/");
	//
	loadWebPages(pages);
});
