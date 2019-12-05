
let accountsTexts = document.getElementsByClassName("accountText");

function goToAccountPage(username) {
  let xhr1 = new XMLHttpRequest();
  xhr1.open("POST", "http://localhost:1337/account");
  xhr1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
    username: username,
  }
  console.log(credentials);
  xhr1.send(JSON.stringify(credentials));

  xhr1.responseType = "text";
  xhr1.onload = function() {
	response = JSON.parse(xhr1.response);
	$("span").each(function () {
	  $(this).remove();
	});
	$("br").each(function () {
	  $(this).remove();
	});
	let backButton = document.createElement("input");
	backButton.type = "button";
	backButton.value = "back to accounts";
	backButton.addEventListener('click', function() {
	  window.location.href = "http://localhost:1337/accounts";
	});
	document.getElementById("container").prepend(backButton);


	let xhr2 = new XMLHttpRequest();
	xhr2.open("POST", "http://localhost:1337/isfollowing");
	xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	let credentials = {
	  username: username,
	}
	xhr2.send(JSON.stringify(credentials));

	xhr2.responseType = "text";
	xhr2.onload = function() {
	  if (xhr2.response === "no") {
  	    let followButton = document.createElement("input");
  		followButton.type = "button";
  		followButton.value = "follow " + username;
  		followButton.addEventListener('click', function() {
  		  let xhr3 = new XMLHttpRequest();
  	  	  xhr3.open("POST", "http://localhost:1337/followaccount");
  	  	  xhr3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	  	  let credentials = {
  	  	    username: username,
  	  	  }
  	  	  xhr3.send(JSON.stringify(credentials));

  	  	  xhr3.responseType = "text";
  	  	  xhr3.onload = function() {
  			if (xhr3.response === "done") {
  			  document.getElementById("container").removeChild(followButton);
  			}
  		  };
  		});
  		document.getElementById("container").append(followButton);
	  } else if (xhr2.response === "yes") {
      	let unfollowButton = document.createElement("input");
      	unfollowButton.type = "button";
      	unfollowButton.value = "unfollow " + username;
      	unfollowButton.addEventListener('click', function() {
      	  let xhr3 = new XMLHttpRequest();
      	  xhr3.open("POST", "http://localhost:1337/unfollowaccount");
      	  xhr3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      	  let credentials = {
      	  	 username: username,
      	  }
      	  xhr3.send(JSON.stringify(credentials));

      	  xhr3.responseType = "text";
      	  xhr3.onload = function() {
      	    if (xhr3.response === "done") {
      		  document.getElementById("container").removeChild(unfollowButton);
      	    }
          };
      	});
        document.getElementById("container").append(unfollowButton);

	  }
	};

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

	//stars
	for (let i = 0; i < response[2].length; i++) {
	  let anchor = document.createElement("a");
	  anchor.href = "#";
	  let text = document.createElement("p");
	  let pretext = response[2][i].type;
	  anchor.append(text);
  	  text.innerHTML = pretext + ": " + response[2][i].title;
  	  document.getElementById("container").prepend(anchor);
	  anchor.addEventListener('click', function() {
		if (response[2][i].type === "folder") {
		  window.location.href = "http://localhost:1337/folders";
	    } else if (response[2][i].type === "studyset") {
		  window.location.href = "http://localhost:1337/studyset";
	    }
		// TODO make page redirect to the exact studyset/folder
	  });
	}

	let stars = document.createElement("h3");
	stars.innerHTML = "Stars: ";
	document.getElementById("container").prepend(stars);

	//contributes (only studysets, not folders)
	for (let i = 0; i < response[1].length; i++) {
	  let anchor = document.createElement("a");
  	  anchor.href = "#";
	  let text = document.createElement("p");
  	  text.innerHTML = "studyset: " + response[1][i].Title;
	  anchor.append(text);
  	  document.getElementById("container").prepend(anchor);
	  anchor.addEventListener('click', function() {
		window.location.href = "http://localhost:1337/studyset";
		// TODO make page redirect to the exact studyset/folder
	  });
	}

	let contribuesTo = document.createElement("h3");
	contribuesTo.innerHTML = "Contributes to: ";
	document.getElementById("container").prepend(contribuesTo);

	//owns
	for (let i = 0; i < response[0].length; i++) {
	  let anchor = document.createElement("a");
	  anchor.href = "#";
	  let text = document.createElement("p");
	  let pretext = response[0][i].type;
  	  text.innerHTML = pretext + ": " + response[0][i].title;
	  anchor.append(text);
  	  document.getElementById("container").prepend(anchor);
	  anchor.addEventListener('click', function() {
		if (response[0][i].type === "folder") {
		  window.location.href = "http://localhost:1337/folders";
	    } else if (response[0][i].type === "studyset") {
		  window.location.href = "http://localhost:1337/studyset";
	    }
		// TODO make page redirect to the exact studyset/folder
	  });
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
