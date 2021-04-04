document.getElementById("start-btn").addEventListener("click", () => {
	browser.runtime.sendMessage({command: "start"}).then(response => {
		if (response.status === "started") {
			document.getElementById("start-btn").style.backgroundColor = "green";
			document.getElementById("start-btn").innerHTML = "Done!";
		} else if (response.status === "running") {
			document.getElementById("start-btn").style.backgroundColor = "orange";
                        document.getElementById("start-btn").innerHTML = "Already running";
		}
	});
});
