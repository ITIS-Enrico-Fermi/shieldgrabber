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
		browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
			tabs.forEach(tab => {
				browser.tabs.sendMessage(
					tab.id,
					{requestBody: body, requestHeaders: requestDetails}
				);
			});
		});
	}
}

browser.runtime.onMessage.addListener((data, sender, sendResponse) => {
	// console.log(data.content);
	if (data.command !== "start") return;
	if (!browser.webRequest.onBeforeRequest.hasListener(requestsBodyListener) && !browser.webRequest.onBeforeSendHeaders.hasListener(requestsHeadersListener)) {
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
		sendResponse({status: "started"});
	} else {
		sendResponse({status: "running"});
	}

});
