
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
	let backButton = document.createElement("input");
	backButton.type = "button";
	backButton.value = "back to accounts";
	backButton.addEventListener('click', function() {
	  window.location.href = "http://localhost:1337/accounts";
	});
	document.getElementById("container").prepend(backButton);

	for (let i = 0; i < response[3].length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = "user: ";
	  let anchor = document.createElement("a");
	  anchor.innerHTML = response[3][i].username2;
	  anchor.href = "#";
	  anchor.addEventListener('click', function() {
		document.getElementById("container").innerHTML = "";
  	    goToAccountPage(response[3][i].username2);
  	  });
	  text.appendChild(anchor);
  	  document.getElementById("container").prepend(text);
	}

	let follows = document.createElement("h3");
	follows.innerHTML = "Follows: ";
	document.getElementById("container").prepend(follows);

	for (let i = 0; i < response[2].length; i++) {
	  let text = document.createElement("p");
	  let pretext = response[2][i].type;
  	  text.innerHTML = pretext + ": " + response[2][i].title;
  	  document.getElementById("container").prepend(text);
	}

	let stars = document.createElement("h3");
	stars.innerHTML = "Stars: ";
	document.getElementById("container").prepend(stars);

	for (let i = 0; i < response[1].length; i++) {
	  let text = document.createElement("p");
  	  text.innerHTML = "studyset: " + response[1][i].Title;
  	  document.getElementById("container").prepend(text);
	}

	let contribuesTo = document.createElement("h3");
	contribuesTo.innerHTML = "Contributes to: ";
	document.getElementById("container").prepend(contribuesTo);

	for (let i = 0; i < response[0].length; i++) {
	  let text = document.createElement("p");
	  let pretext = response[0][i].type;
  	  text.innerHTML = pretext + ": " + response[0][i].title;
  	  document.getElementById("container").prepend(text);
	}

	let accountOwns = document.createElement("h3");
	accountOwns.innerHTML = "Owns: ";
	document.getElementById("container").prepend(accountOwns);

	let accountName = document.createElement("h2");
	accountName.innerHTML = "Account: " + username;
	document.getElementById("container").prepend(accountName);

  };
}

for (let i = 0; i < accountsTexts.length; i++) {
  accountsTexts[i].addEventListener('click', function() {goToAccountPage(accountsTexts[i].id);});
}
