'use strict';

const mainCardClass = 'qyN25';
const linkDivClass = 'QRiHXd';
const containerClass = 'T4tcpe n0p5v';  // Title, subtitle and link (if exists) container
const meetRe = new RegExp(".+\"(https?://meet.google.com.+)\".+", "ig");
const payload = '[[null,null,null,null],[null,null,null,null,null,null,null,null,[null,null,null,null,null,null,[null,null],null,[null],null,null,null,null],null,null,null,null,null,null,null,null,null,null,null,[null,null,null],null,null,null,null,null,null,null,[null,null],null,null,null,null,null,null,null,null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null],[null,true,null],null,null],[null,[["40220341253"]],[],[],null,[],[]]]';

var userId = 0;
var rBody;
var rHeaders;

let openMeetLink = (link, open=true) => {
	if (open)
		window.open(link+`?authuser=${userId}`);
	else  // Debugging purposes
		console.log(link+`?authuser=${userId}`);
}

let getting = browser.storage.sync.get("userId");
getting.then(item => {
	userId = item.userId;
}, error => {
	console.log(`An error occured: ${error}`);
});

// console.log("started");
browser.runtime.onMessage.addListener(data => {
 	rBody = data.requestBody;
	rHeaders = data.requestHeaders;
});

// Check if url and open it. Fired every second
var tid = setInterval(() => {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		if (this.status !== 200) return;
		const url = meetRe.exec(this.responseText)[1];
		if (url) {

			openMeetLink(url);
			clearInterval(tid);
		}
	}
	xhr.open(rHeaders.method, rHeaders.url, true);
	rHeaders.requestHeaders.forEach((header) => {
		xhr.setRequestHeader(header.name, header.value);
	});
	xhr.send(`f.req=${encodeURI(payload)}&token=${encodeURI(rBody.requestBody.formData.token)}&`);
}, 1000);
// console.log("finished");
