
let folderTexts = document.getElementsByClassName("folderText");

function goToFolderPage(foldername) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/folderdata");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
    foldername: foldername,
  }
  xhr.send(JSON.stringify(credentials));

  xhr.responseType = "text";
  xhr.onload = function() {
	response = JSON.parse(xhr.response);

	$("span").each(function () {
	  $(this).remove();
	});
	$("br").each(function () {
	  $(this).remove();
	});

	let backButton = document.createElement("input");
	backButton.type = "button";
	backButton.value = "back to folders";
	backButton.addEventListener('click', function() {
	  window.location.href = "http://localhost:1337/folders";
	});
	document.getElementById("container").prepend(backButton);

	for (let i = 0; i < response.length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = "Studyset: " + response[i].title + ", owned by: " + response[i].owner;
  	  document.getElementById("container").prepend(text);
	}

	let folderName = document.createElement("h2");
	folderName.innerHTML = "Folder: " + foldername;
	document.getElementById("container").prepend(folderName);

  };
}

for (let i = 0; i < folderTexts.length; i++) {
  folderTexts[i].addEventListener('click', function() {goToFolderPage(folderTexts[i].id);});
}
