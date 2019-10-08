var express = require('express');
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'', //Enter your password
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
  connection.query("select * from emp", function(error,result){
    if(!!error){
      console.log('Error in query');
    }
    else{
      res.render("landing",{rows:result});
      console.log(result);
    }
  });
});

app.listen(1337);
