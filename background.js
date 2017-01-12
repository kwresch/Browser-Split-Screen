chrome.extension.onMessage.addListener(function (msg, sender, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("HTML data retreived");
			console.log("background.js COL: " + msg.col);
			//console.log("background.js DATA: " + this.responseText);
			var data = {
				col: msg.col,
				url: msg.url,
				html: this.responseText
			};
			//callback(msg.col, this.responseText);
			callback(data);
		}
	}
	xhr.open("GET", msg.url, true);
	xhr.send();
	return true;
});
