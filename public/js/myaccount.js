
let username = document.getElementsByClassName("accountusername")[0].id;
let topElement = document.getElementById(username);
console.log(topElement);


let xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:1337/account");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

let credentials = {
  username: username,
}
xhr.send(JSON.stringify(credentials));

xhr.responseType = "text";
xhr.onload = function() {
response = JSON.parse(xhr.response);

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
	  document.getElementById("container").after(topElement, text);
}

let follows = document.createElement("h3");
follows.innerHTML = "Follow: ";
document.getElementById("container").after(topElement, follows);

for (let i = 0; i < response[2].length; i++) {
  let text = document.createElement("p");
  let pretext = response[2][i].type;
	  text.innerHTML = pretext + ": " + response[2][i].title;
	  document.getElementById("container").after(topElement, text);
}

let stars = document.createElement("h3");
stars.innerHTML = "Starred: ";
document.getElementById("container").after(topElement, stars);

for (let i = 0; i < response[1].length; i++) {
  let text = document.createElement("p");
	  text.innerHTML = "studyset: " + response[1][i].Title;
	  document.getElementById("container").after(topElement, text);
}

let contribuesTo = document.createElement("h3");
contribuesTo.innerHTML = "Contributer: ";
document.getElementById("container").after(topElement, contribuesTo);

for (let i = 0; i < response[0].length; i++) {
  let text = document.createElement("p");
  let pretext = response[0][i].type;
	  text.innerHTML = pretext + ": " + response[0][i].title;
	  document.getElementById("container").after(topElement, text);
}

let accountOwns = document.createElement("h3");
accountOwns.innerHTML = "You Own: ";
document.getElementById("container").after(topElement, accountOwns);

};
