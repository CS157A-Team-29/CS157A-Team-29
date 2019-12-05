
let studysetTexts = document.getElementsByClassName("studysetText");

function goToFolderPage(studysetName) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/studysetdata");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
    studysetName: studysetName,
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
	backButton.value = "back to studysets";
	backButton.addEventListener('click', function() {
	  window.location.href = "http://localhost:1337/studyset";
	});
	document.getElementById("container").prepend(backButton);

	let viewFlashcardsButton = document.createElement("input");
	viewFlashcardsButton.type = "button";
	viewFlashcardsButton.value = "View Flashcards";
	viewFlashcardsButton.addEventListener('click', function() {
	  window.location.href = "http://localhost:1337/flashcards";
	});
	document.getElementById("container").prepend(viewFlashcardsButton);

	let ownerText = document.createElement("p");
	ownerText.innerHTML = "Owner : " + response[0].owner;
	document.getElementById("container").prepend(ownerText);

	let studysetText = document.createElement("h2");
	studysetText.innerHTML = "Studyset : " + studysetName;
	document.getElementById("container").prepend(studysetText);

  };
}

for (let i = 0; i < studysetTexts.length; i++) {
  studysetTexts[i].addEventListener('click', function() {goToFolderPage(studysetTexts[i].id);});
}
