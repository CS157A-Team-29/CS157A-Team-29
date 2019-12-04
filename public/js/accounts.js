
let accountsTexts = document.getElementsByClassName("accountText");

function goToAccountPage(username) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/account");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
    username: username,
  }
  console.log(credentials);
  xhr.send(JSON.stringify(credentials));

  xhr.responseType = "text";
  xhr.onload = function() {
	response = JSON.parse(xhr.response);
	for (let i = 0; i < accountsTexts.length; i++) {
	  $("span").each(function () {
        $(this).remove();
      });
	}
	let accountName = document.createElement("h2");
	accountName.innerHTML = "Account: " + username;
	document.body.appendChild(accountName);

	let accountOwns = document.createElement("h4");
	accountOwns.innerHTML = "Owns: ";
	document.body.appendChild(accountOwns);

	for (let i = 0; i < response[0].length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = "\t" + response[0][i].Title;
  	  document.body.appendChild(text);
	}

	let contribuesTo = document.createElement("h4");
	contribuesTo.innerHTML = "Contributes to: ";
	document.body.appendChild(contribuesTo);

	for (let i = 0; i < response[1].length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = " " + response[1][i].Title;
  	  document.body.appendChild(text);
	}

	let stars = document.createElement("h4");
	stars.innerHTML = "Stars: ";
	document.body.appendChild(stars);

	for (let i = 0; i < response[2].length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = " " + response[2][i].Title;
  	  document.body.appendChild(text);
	}

	let follows = document.createElement("h4");
	follows.innerHTML = "Follows: ";
	document.body.appendChild(follows);

	for (let i = 0; i < response[3].length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = "\t" + response[3][i].username2;
  	  document.body.appendChild(text);
	}

	let backButton = document.createElement("input");
	backButton.type = "button";
	backButton.value = "back";
	backButton.addEventListener('click', function() {
	  window.location.href = "http://localhost:1337/accounts";
	});
	document.body.appendChild(backButton);
  };
}

for (let i = 0; i < accountsTexts.length; i++) {
  accountsTexts[i].addEventListener('click', function() {goToAccountPage(accountsTexts[i].id);});
}
