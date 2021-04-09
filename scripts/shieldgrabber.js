'use strict';

const mainCardClass = 'qyN25';
const linkDivClass = 'QRiHXd';
const containerClass = 'T4tcpe n0p5v';  // Title, subtitle and link (if exists) container
const meetRe = new RegExp(".+\"(https?://meet.google.com.+)\".+", "ig");
const courseId = atob(window.location.pathname.split("/").pop()).replace(/[a-z]/ig, "");
const payload = `[[null,null,null,null],[null,null,null,null,null,null,null,null,[null,null,null,null,null,null,[null,null],null,[null],null,null,null,null],null,null,null,null,null,null,null,null,null,null,null,[null,null,null],null,null,null,null,null,null,null,[null,null],null,null,null,null,null,null,null,null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null],[null,true,null],null,null],[null,[["${courseId}"]],[],[],null,[],[]]]`;

var userId = 0;
var rBody;
var rHeaders;
var counter = 0;
var lastUrl = '';  // Even if the link is hidden, classroom's servers keep it in memory
var openedUrls = 0;

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
	counter = 0;
});

// Check if url and open it. Fired every second
var tid = setInterval(() => {
	if (openedUrls >= 2)
		clearInterval(tid);
	if (rBody && rHeaders) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			if (this.status !== 200) return;
			const url = meetRe.exec(this.responseText)[1];
			if (url && url !== lastUrl) {
				openMeetLink(url);
				lastUrl = url;
				openedUrls++;
			}
		}
		xhr.open(rHeaders.method, rHeaders.url, true);
		rHeaders.requestHeaders.forEach((header) => {
			xhr.setRequestHeader(header.name, header.value);
		});
		browser.runtime.sendMessage({requestsCounter: ++counter, currentTarget: btoa(courseId)});
		xhr.send(`f.req=${encodeURI(payload)}&token=${encodeURI(rBody.requestBody.formData.token)}&`);
	}	
}, 1000);
// console.log("finished");
