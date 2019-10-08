var express = require('express');
var mysql = require('mysql');
var app = express();

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
  connection.query("select * from emp", function(error,rows,fields){
    if(!!error){
      console.log('Error in query');
    }
    else{
      console.log('Connection Successful');
      console.log(rows)
      console.log(fields)
    }
  });
});

app.listen(1337);
