let saveOptions = e => {
	e.preventDefault();
	browser.storage.sync.set({
		userId: document.querySelector("#user-id").value
	});
}

let restoreOptions = () => {
	let setCurrentChoice = r => {
		document.querySelector("#user-id").value = r.userId || 0;
	}

	let onError = e => {
		console.log(`An error occured: ${e}`);
	}

	let getting = browser.storage.sync.get("userId");
	getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

