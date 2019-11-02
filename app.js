let express = require("express");
let mysql = require("mysql");
let path = require("path");
let bodyParser = require("body-parser"); // body-parser for handling post requests
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
  password: "MyNewPass" // Enter your password
});

database.connect(function(error) {
  if (error) {
 	console.log(error);
  } else {
	console.log("Connected to database");
  }
});

// Load login/signup page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/html/login.html"));
});

app.post("/login", function(req, res) {
  console.log(req.body.username + " logging in");
});

app.post("/signup", function(req, res) {
  console.log(req.body.username + " signing up");
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
