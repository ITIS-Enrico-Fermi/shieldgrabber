document.getElementById("start-btn").addEventListener("click", () => {
	browser.runtime.sendMessage({command: "start"}).then(response => {
		if (response.status === "started") {
			document.getElementById("start-btn").style.backgroundColor = "green";
			document.getElementById("start-btn").innerHTML = "Done!";
			document.getElementById("warning").innerHTML = "Refresh the page if the counter isn't already started.";
		} else if (response.status === "running") {
			document.getElementById("start-btn").style.backgroundColor = "orange";
                        document.getElementById("start-btn").innerHTML = "Already running";
			document.getElementById("warning").innerHTML = "If the counter above is stuck, the background script hasn't been able to capture an useful request yet. Please, try to refresh Classroom's webpage.";
		}
	});
});

browser.runtime.onMessage.addListener(data => {
	if (data.requestsCounter)
		document.getElementById("requests-counter").innerHTML = data.requestsCounter;
});
