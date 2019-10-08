var express = require('express');
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'P1p3d-sql', //Enter your password
  database:'cs157a' //Enter the name of your database
});

connection.connect(function(error){
  if(!!error){
    console.log(error);
  }
  else{
    console.log('Connected');
  }
});

app.get('/',function(req,res){
  connection.query("select * from Accounts", function(error,result){
    if(!!error){
      console.log('Error in query');
    }
    else{
      res.render("landing",{rows:result});
      console.log(result);
    }
  });
});

app.get('/accounts',function(req,res){
  connection.query("select * from Accounts", function(error,result){
    if(!!error){
      console.log('Error in query');
    }
    else{
      res.render("accounts",{rows:result});
      console.log(result);
    }
  });
});

app.get('/studyset',function(req,res){
  connection.query("select * from StudySet", function(error,result){
    if(!!error){
      console.log('Error in query');
    }
    else{
      res.render("study-set",{rows:result});
      console.log(result);
    }
  });
});

app.get('/folders',function(req,res){
  connection.query("select * from Folders", function(error,result){
    if(!!error){
      console.log('Error in query');
    }
    else{
      res.render("folders",{rows:result});
      console.log(result);
    }
  });
});

app.get('/flashcards',function(req,res){
  connection.query("select * from Flashcard", function(error,result){
    if(!!error){
      console.log('Error in query');
    }
    else{
      res.render("flashcards",{rows:result});
      console.log(result);
    }
  });
});



app.listen(1337);
