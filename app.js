let express = require("express");
let mysql = require("mysql");
let path = require("path");
let bodyParser = require("body-parser"); // body-parser for handling post requests
let passwordHash = require("password-hash"); // Don't store plaintext passwords in database. Though we are sending plaintext passwords over http...
let app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/public/images/", express.static("./public/images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let database = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cs157a", // Enter the name of your database
  password: "testPass" // Enter your password
});

database.connect(function(error) {
  if (error) {
	console.log("Error connecting to database");
 	console.log(error);
  } else {
	console.log("Connected to database");
  }
});

// Load login/signup page by default
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/html/login.html"));
});

// Login to the platform. Check database for valid username and password.
app.post("/login", function(req, res) {
  let query = "SELECT * FROM accounts WHERE username = \"" + req.body.username + "\";";
  			//+ "\" AND password = \"" + passwordHash.generate(req.body.password) + "\"";
  database.query(query, function(error, result) {
	if (error) {
      console.log("Error in login query");
    } else {
	   if (result.length === 1 && passwordHash.verify(req.body.password, result[0].password)) {
		 // If this is true, then our query returned a row in the database, i.e. the username/password combination is correct.
		 console.log("Logging in as " + req.body.username);
		 res.send("valid");
	   } else {
		 // Else username/password combination not in the database.
		 res.send("invalid");
	   }
    }
  });
});

// Sign up for the platform. Check data and database so that a valid account can be created.
app.post("/signup", function(req, res) {
  let query = "INSERT INTO accounts (username, email, password) VALUES(\"" + req.body.username + "\",\""
  			+ req.body.email + "\",\"" + passwordHash.generate(req.body.password) + "\");";
  database.query(query, function(error, result) {
  	if (error) {
      console.log("Error in signup query");
	  console.log(error);
    } else {
	  res.send("valid");
    }
  });
});

// Checks if the username is in the database. If it isn't, returns "valid" to the client.
app.post("/checkIfUsernameValid", function(req, res) {
  let query = "SELECT * FROM accounts WHERE username = \"" + req.body.username + "\";";
  database.query(query, function(error, result) {
    if (error) {
      console.log("Error in checkIfUsernameValid query");
	} else {
	  if (result.length === 1) {
	    // If this is true, then our query returned a row in the database
	    res.send("invalid");
	  } else {
		// Else username not in the database
		res.send("valid");
	  }
	}
  });
});

// Load landing page
app.get("/landing", function(req, res) {
  database.query("select * from Accounts", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("landing", { rows: result });
      console.log(result);
    }
  });
});

app.get("/accounts", function(req, res) {
  database.query("select * from Accounts", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("accounts", { rows: result });
      console.log(result);
    }
  });
});

app.get("/studyset", function(req, res) {
  database.query("select * from StudySet", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("study-set", { rows: result });
      console.log(result);
    }
  });
});

app.get("/folders", function(req, res) {
  database.query("select * from Folders", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("folders", { rows: result });
      console.log(result);
    }
  });
});

app.get("/flashcards", function(req, res) {
  database.query("select * from Flashcard", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("flashcards", { rows: result });
      console.log(result);
    }
  });
});


let port = 1337;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
