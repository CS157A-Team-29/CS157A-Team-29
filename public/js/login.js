// Keep track of commonly used document elements.
let docElements = {
  form: document.getElementById("logInForm"),
  username: document.getElementById("username"),
  password: document.getElementById("password")
}


// Function to attempt to login. Sends post request to server with the username and password
function logIn() {
  console.log("Logging in");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/login");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let userName = docElements.username.value;
  let credentials = {
    username: docElements.username.value,
	password: docElements.password.value
  }
  xhr.send(JSON.stringify(credentials));

  xhr.responseType = "text";
  xhr.onload = function() {
	if (xhr.response === "valid") {
	  // true if useername/password combination succeeded
	  // Redirect to landing page once signed in
	  window.location.href = "http://localhost:1337/landing";
    } else {
	  if (document.getElementById("errorMessage") === null) { // Make sure we don't make duplicates
		let message = document.createElement("p");
    	message.innerHTML = "Username/Password combination failed";
    	message.id = "errorMessage";
    	document.getElementById("logInForm").appendChild(message);
	  }
    }
  };
}


// Function to attempt to sign up. Sends post request to server with the email, username, and password.
function signUp() {
  console.log("Signing up");
  // Make sure input is valid
  if (docElements.passwordValid === false) {
	console.log("Password invalid");
	return;
  } else if (docElements.emailValid === false) {
 	console.log("Email invalid");
	return;
  } else if (docElements.usernameValid === false) {
	console.log("Username invalid");
  	return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1337/signup");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let credentials = {
	email: docElements.email.value,
    username: docElements.username.value,
    password: docElements.password.value,
  }
  console.log(credentials);
  xhr.send(JSON.stringify(credentials));

  xhr.responseType = "text";
  xhr.onload = function() {
	if (xhr.response === "valid") {
	  // true if creating new account was successful
	  // Redirect to landing page once signed in
	  window.location.href = "http://localhost:1337/landing";
    }
  };
}


// Switches the form to sign up page instead of login.
// Also updates form based on user input, to display if fields are valid.
function switchToSignUp() {
  if (document.getElementById("errorMessage") !== null) {
	document.getElementById("errorMessage").outerHTML = "";
  }

  let emailTextField = document.createElement("input");
  emailTextField.className = "fadeIn first";
  emailTextField.placeholder = "email";
  emailTextField.name = "login";
  emailTextField.type = "text";
  emailTextField.id = "email";
  docElements.email = emailTextField;
  let repeatPasswordTextField = document.createElement("input");
  repeatPasswordTextField.className = "fadeIn second";
  repeatPasswordTextField.placeholder = "repeat password";
  repeatPasswordTextField.name = "login";
  repeatPasswordTextField.type = "password";
  repeatPasswordTextField.id = "repeatPassword"
  docElements.repeatPassword = repeatPasswordTextField;
  let signUpButton = document.createElement("input");
  signUpButton.className = "fadeIn third";
  signUpButton.value = "sign up";
  signUpButton.id = "signUpButton";
  signUpButton.type = "button";
  signUpButton.addEventListener('click', signUp);
  let emailStatusSymbol = document.createElement("span");
  emailStatusSymbol.id = "emailStatusSymbol";
  emailStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
  let usernameStatusSymbol = document.createElement("span");
  usernameStatusSymbol.id = "usernameStatusSymbol";
  usernameStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
  let passwordStatusSymbol = document.createElement("span");
  passwordStatusSymbol.id = "passwordStatusSymbol";
  passwordStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
  let repeatPasswordStatusSymbol = document.createElement("span");
  repeatPasswordStatusSymbol.id = "repeatPasswordStatusSymbol";
  repeatPasswordStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";

  docElements.form.removeChild(document.getElementById("switchToSignUpButton"));
  docElements.form.removeChild(document.getElementById("logInButton"));
  docElements.form.insertBefore(emailTextField, docElements.username);
  docElements.form.appendChild(repeatPasswordTextField);
  docElements.form.appendChild(signUpButton);
  docElements.form.insertBefore(emailStatusSymbol, docElements.username);
  docElements.form.insertBefore(usernameStatusSymbol, docElements.password);
  docElements.form.insertBefore(passwordStatusSymbol, docElements.repeatPassword);
  docElements.form.insertBefore(repeatPasswordStatusSymbol, signUpButton);

  docElements.emailValid = false;
  docElements.usernameValid = false;
  docElements.passwordValid = false;

  // Constantly checks if email is valid
  docElements.email.oninput = function() {
    // Use this regex to test if email is valid. Found at: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(docElements.email.value).toLowerCase())) {
	  emailStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-ok\"></span>";
	  docElements.emailValid = true;
    } else {
	  emailStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
	  docElements.emailValid = false;
    }
  }

  // Constantly checks username input to see if it's valid
  docElements.username.oninput = function() {
	// Check if username is valid by querying database
	let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:1337/checkIfUsernameValid");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	let data = {
	  username: docElements.username.value
	}
	xhr.send(JSON.stringify(data));
    xhr.responseType = "text";
    xhr.onload = function() {
	  // Put an icon after username indicating if it's valid or not.
  	  if (xhr.response === "valid") {
  	    // true if username doesn't already exist in the database
		usernameStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-ok\"></span>";
		docElements.usernameValid = true;
	  } else if (xhr.response === "invalid") {
		// true if username already exists in the database
		usernameStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
		docElements.usernameValid = false;
	  }
    };
  }

  // Constantly checks if password input is valid. Should be 5 characters long or more.
  docElements.password.oninput = function() {
    if (docElements.password.value.length >= 5) {
	  passwordStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-ok\"></span>";
    } else {
	  passwordStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
    }
  }

  // Constantly checks if repeat password input is valid. Should match the password from the first password field
  docElements.repeatPassword.oninput = function() {
    if (docElements.repeatPassword.value.length >= 5 && docElements.repeatPassword.value === docElements.password.value) {
	  repeatPasswordStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-ok\"></span>";
	  docElements.passwordValid = true;
    } else {
	  repeatPasswordStatusSymbol.innerHTML = "<span class=\"glyphicon glyphicon-remove\"></span>";
	  docElements.passwordValid = false;
    }
  }
}


// Assign our functions to run on button press.
document.querySelector("#logInButton").addEventListener('click', logIn);
document.querySelector("#switchToSignUpButton").addEventListener('click', switchToSignUp);
