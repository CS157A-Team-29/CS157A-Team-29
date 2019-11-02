
// Function sends post request to server with the username and password
function logIn() {
  console.log("Logging in");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/login");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
    username: document.getElementById("username").value,
	password: document.getElementById("password").value
  }
  xhr.send(JSON.stringify(credentials));
}

function signUp() {
  console.log("Signing up");
  if (document.getElementById("password").value !== document.getElementById("repeatPassword").value) {
	console.log("passwords do not match");
	return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/signup");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
	email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  }
  xhr.send(JSON.stringify(credentials));
}

function switchToSignUp() {
	let emailTextField = document.createElement("input");
	emailTextField.className = "fadeIn first";
	emailTextField.placeholder = "email";
	emailTextField.name = "login";
	emailTextField.type = "text";
	emailTextField.id = "email"
	document.getElementById("username").className = "fadeIn second";
	document.getElementById("password").className = "fadeIn third";
	let repeatPasswordTextField = document.createElement("input");
	repeatPasswordTextField.className = "fadeIn fourth";
	repeatPasswordTextField.placeholder = "repeat password";
	repeatPasswordTextField.name = "login";
	repeatPasswordTextField.type = "password";
	repeatPasswordTextField.id = "repeatPassword"
	let signUpButton = document.createElement("input");
	signUpButton.className = "fadeIn fifth";
	signUpButton.value = "sign up";
	signUpButton.id = "signUpButton";
	signUpButton.type = "button";
	signUpButton.addEventListener('click', signUp);

	let form = document.getElementById("logInForm");
	form.removeChild(document.getElementById("switchToSignUpButton"));
	form.removeChild(document.getElementById("logInButton"));
	form.insertBefore(emailTextField, document.getElementById("username"));
	form.appendChild(repeatPasswordTextField);
	form.appendChild(signUpButton);
}

document.querySelector("#logInButton").addEventListener('click', logIn);
document.querySelector("#switchToSignUpButton").addEventListener('click', switchToSignUp);
