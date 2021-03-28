'use strict';

const mainCardClass = 'qyN25';
const linkDivClass = 'QRiHXd';
const containerClass = 'T4tcpe n0p5v';  // Title, subtitle and link (if exists) container
var userId = 0;

let waitUntilExists = async (parentNode, className, timeoutTime) => {  // if timeoutTime === -1 -> wait forever 
	const sleepTime = 500
	var counter = 0;
	while ((timeoutTime !== -1 && counter*sleepTime < timeoutTime) || !parentNode.getElementsByClassName(className).length) {
		await new Promise(r => setTimeout(r, sleepTime));
		counter++;
	}
}

let tryOpenMeetLink = (parentNode, linkClass, open) => {
	if (parentNode.getElementsByClassName(linkClass).length !== 0) {
		var links = Array.prototype.slice.call(parentNode.getElementsByClassName(linkClass));
		links.forEach(link => {
                        if (!link.firstChild) return;
                        if (!link.firstChild.data) return;
			if (open)
                        	window.open(link.firstChild.data+`?authuser=${userId}`);
			else  // Debugging purposes
				console.log(link.firstChild.data);
                });
        }
}

let observer = new MutationObserver(mutationRecords => {
	// console.log(mutationRecords);
	mutationRecords.forEach(mutationRecord => {
		if (mutationRecord.type !== 'childList') return;
		if (!mutationRecord.addedNodes) return;
		mutationRecord.addedNodes.forEach(node => {
			// console.log(node);
			tryOpenMeetLink(node, linkDivClass, true);
		});
	});
});


let getting = browser.storage.sync.get("userId");
getting.then(item => {
	userId = item.userId;
}, error => {
	console.log(`An error occured: ${error}`);
});


// console.log("start");
waitUntilExists(document, mainCardClass, -1).then(() => {
	var targets = Array.prototype.slice.call(document.getElementsByClassName(mainCardClass));
	// console.log(targets);
	targets.forEach(target => {
		waitUntilExists(target, containerClass, -1).then(() => {
			waitUntilExists(target, linkDivClass, 500).then(() => {
				tryOpenMeetLink(target, linkDivClass, true);  // If the link is already there -> try to open it
				observer.observe(target, {  // Add observer anyway (in case it changes)
					childList: true,
					characterData: true,
					attributes: false,
					subtree: true
				});
			});
		});
	});
});
