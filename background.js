const payload = '[[null,null,null,null],[null,null,null,null,null,null,null,null,[null,null,null,null,null,null,[null,null],null,[null],null,null,null,null],null,null,null,null,null,null,null,null,null,null,null,[null,null,null],null,null,null,null,null,null,null,[null,null],null,null,null,null,null,null,null,null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null],[null,true,null],null,null],[null,[["40220341253"]],[],[],null,[],[]]]';
const meetRe = new RegExp(".+(\"https?://meet.google.com.+\").+", "ig");
var requestsBodyList = [];

let requestsBodyListener = (requestDetails) => {
	if (requestDetails.method != "POST") return;
	requestsBodyList.push(requestDetails);
}

let requestsHeadersListener = (requestDetails) => {
	if (requestDetails.method != "POST") return;
	let findRequestId = (element) => {
		return element.requestId === requestDetails.requestId;
	}
	let body = requestsBodyList.find(findRequestId);
	if (body) {
		browser.webRequest.onBeforeSendHeaders.removeListener(requestsHeadersListener);
		browser.webRequest.onBeforeRequest.removeListener(requestsBodyListener);
		// console.log(requestDetails);
		// console.log(body);
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			if (this.status !== 200) return;
			const url = meetRe.exec(this.responseText)[1];
			console.log(url);
			
		}
		xhr.open(requestDetails.method, requestDetails.url, true);
		requestDetails.requestHeaders.forEach((header) => {
			xhr.setRequestHeader(header.name, header.value);
		});
		xhr.send(`f.req=${encodeURI(payload)}&token=${encodeURI(body.requestBody.formData.token)}&`);
	}
}

browser.webRequest.onBeforeRequest.addListener(
	requestsBodyListener,
	{
		urls: ["*://classroom.google.com/*/querycourse*"],
	},
	["requestBody"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
        requestsHeadersListener,
        {
                urls: ["*://classroom.google.com/*/querycourse*"],
        },
        ["requestHeaders"]
);

