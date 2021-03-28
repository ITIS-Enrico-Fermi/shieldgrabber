"use strict";

const mainCardClass = "qyN25";
const linkDivClass = "QRiHXd";

let tryOpenMeetLink = (parentNode, linkClass, open) => {
	if (parentNode.getElementsByClassName(linkClass).length !== 0) {
		var links = Array.prototype.slice.call(parentNode.getElementsByClassName(linkClass));
		links.forEach(link => {
                        if (!link.firstChild) return;
                        if (!link.firstChild.data) return;
			if (open)
                        	window.open(link.firstChild.data);
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

var targets = Array.prototype.slice.call(document.getElementsByClassName(mainCardClass));
// console.log(targets);
targets.forEach(target => {
	tryOpenMeetLink(target, linkDivClass, false);  // If the link is already there -> try to open it
	observer.observe(target, {  // Add observer anyway (in case it changes)
		childList: true,
		characterData: true,
		attributes: false,
		subtree: true
	});
});

