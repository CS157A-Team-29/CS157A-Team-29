let express = require("express");
let mysql = require("mysql");
let path = require("path");
let bodyParser = require("body-parser"); // body-parser for handling post requests
let passwordHash = require("password-hash"); // Don't store plaintext passwords in database. Though we are sending plaintext passwords over http...
let app = express();
let currentuser = "aaronsmith"; // default user

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/public/images/", express.static("./public/images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let database = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cs157a", // Enter the name of your database
  password: "MyNewPass" // Enter your password
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

// Load login/signup page by default
app.get("/create", function(req, res) {
  res.render("createSet");
});

app.post("/createStudySet", function(req, res) {
  let checkQuery =
    'SELECT * FROM studyset WHERE setID = "' + req.body.setID + '";';

  database.query(checkQuery, function(error, result) {
    if (error) {
      console.log("Error in check studyset query");
      console.log(error);
    } else {
      let query =
        'INSERT INTO studyset (setID, Title, permissions, owner) VALUES("' +
        req.body.setID +
        '","' +
        req.body.setName +
        '","' +
        "public" +
        '","' +
        "aaronsmith" +
        '");';
      database.query(query, function(error, result) {
        if (error) {
          console.log("Error in insert create query");
          console.log(error);
        } else {
          res.send("valid");
        }
      });
    }
  });
});

// Login to the platform. Check database for valid username and password.
app.post("/login", function(req, res) {
  let query =
    'SELECT * FROM accounts WHERE username = "' + req.body.username + '";';
  //+ "\" AND password = \"" + passwordHash.generate(req.body.password) + "\"";
  database.query(query, function(error, result) {
    if (error) {
      console.log("Error in login query");
    } else {
      if (
        result.length === 1 &&
        passwordHash.verify(req.body.password, result[0].password)
      ) {
        // If this is true, then our query returned a row in the database, i.e. the username/password combination is correct.
        console.log("Logging in as " + req.body.username);
		currentuser = req.body.username;
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
  let query =
    'INSERT INTO accounts (username, email, password) VALUES("' +
    req.body.username +
    '","' +
    req.body.email +
    '","' +
    passwordHash.generate(req.body.password) +
    '");';
  database.query(query, function(error, result) {
    if (error) {
      console.log("Error in signup query");
      console.log(error);
    } else {
      res.send("valid");
    }
  });
});

// View studysetdata
app.post("/studysetdata", function(req, res) {
	console.log("Fetching study set data for: " + req.body.studysetName);
  let query = `SELECT * FROM studyset WHERE Title = "` + req.body.studysetName + `";`;
  database.query(query, function(error, result) {
    if (error) {
      console.log("Error in studyset query");
      console.log(error);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

// View folder details
app.post("/folderdata", function(req, res) {
  console.log("Fetching folder data for: " + req.body.foldername);
  let query = `SELECT title, owner FROM studyset, contains WHERE contains.setID = studyset.setID AND contains.folderid = `
  			+ `(SELECT folderID FROM folders WHERE title = "` + req.body.foldername + `");`;
  database.query(query, function(error, result) {
    if (error) {
      console.log("Error in folder query");
      console.log(error);
    } else {
      res.send(JSON.stringify(result));
	}
  });
});

// View an individual account
app.post("/account", function(req, res) {
  console.log("Fetching account data for: " + req.body.username);
  let query = `SELECT title, 'studyset' as type FROM studyset WHERE owner = "` + req.body.username
  			+ `" UNION SELECT title, 'folder' as type FROM folders WHERE owner = "` + req.body.username + `";`;
  let finalResult = [];
  database.query(query, function(error, result1) {
    if (error) {
      console.log("Error in account query id 1");
      console.log(error);
    } else {
	  finalResult.push(result1);
	  let query = 'SELECT Title FROM studyset, contributes WHERE contributes.setID = studyset.setID AND username = "' + req.body.username + '";';
	  database.query(query, function(error, result2) {
		if (error) {
		  console.log("Error in account query id 2");
		  console.log(error);
	    } else {
		  finalResult.push(result2);
		  let query = `SELECT title, 'studyset' as type FROM studyset, starsstudyset WHERE studyset.setid = starsstudyset.setid AND username = "` + req.body.username
		  			+ `" UNION SELECT title, 'folder' as type FROM folders, starsfolders WHERE folders.folderid = starsfolders.folderid AND username = "` + req.body.username + `";`;
		  database.query(query, function(error, result3) {
			if (error) {
			  console.log("Error in account query id 3");
			  console.log(error);
		    } else {
			  finalResult.push(result3);
			  let query = 'SELECT username2 FROM follows WHERE username1 = "' + req.body.username + '";';
			  database.query(query, function(error, result4) {
				if (error) {
				  console.log("Error in account query id 4");
				  console.log(error);
			    } else {
				  finalResult.push(result4);
				  console.log(finalResult);
				  res.send(JSON.stringify(finalResult));
			    }
			  });
		    }
		  });
	    }
	  });
    }
  });
});

// Checks if the username is in the database. If it isn't, returns "valid" to the client.
app.post("/checkIfUsernameValid", function(req, res) {
  let query =
    'SELECT * FROM accounts WHERE username = "' + req.body.username + '";';
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
  database.query("SELECT * FROM Accounts", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("landing", { rows: result });
      console.log(result);
    }
  });
});

app.get("/accounts", function(req, res) {
  database.query("SELECT * FROM Accounts", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("accounts", { rows: result });
    }
  });
});

app.get("/studyset", function(req, res) {
  database.query("SELECT * FROM StudySet", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("study-set", { rows: result });
    }
  });
});

app.get("/folders", function(req, res) {
  database.query("SELECT * FROM Folders", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("folders", { rows: result });
    }
  });
});

app.get("/flashcards", function(req, res) {
  database.query("SELECT * FROM Flashcard", function(error, result) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("flashcards", { rows: result });
      console.log(result);
    }
  });
});

app.get("/practice-test", function(req, res) {
  database.query("SELECT * FROM Flashcard ORDER BY RAND()", function(
    error,
    result
  ) {
    if (error) {
      console.log("Error in query");
    } else {
      res.render("practice", { rows: result });
      console.log(result);
    }
  });
});

app.get("/myaccount", function(req, res) {
  res.render("myaccount", {username: currentuser} );
});


let port = 1337;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
