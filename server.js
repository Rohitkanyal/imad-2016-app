var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require ('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');

var config - {
    user:'rohitkanyal',
    database:'rohitkanyal',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRandomsecretValue',
    cookie:{maxAge:1000*60*60*24*30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash (input,salt){
          // how do we creat a hash?
          var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
          return ['pbkdf2', '10000',salt, hashed.toString('hex')].join('$');
    
}


app.get('/hash/:iput',function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
   //usrname,password
   //{"username": "rohit","password":"password"}
   //JSON
   var username =req.body.username;
   var password =req.body.password;
   
   var salt = crypt.randomBytes(128).toString('hex');
   var dbStrinng = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString], function(err,result){
      if(err){
       res.status(500).send(err.toString());
   } else{
       res.send('User successfully created' + username);
   } 
   });
});

app.post('/login',function(req,res){
  var username =req.body.username;
   var password =req.body.password;
   
   pool.query('SELECT * from "user" WHERE  username = $1',[username], function(err,result){
      if(err){
       res.status(500).send(err.toString());
         } else{
          if (result.rows.length ===0){
           res.send(403).send('username/password is invalid');
          }else{
           //Match the password
           var dbString =result.rows[0].password;
           var salt = dbString.split('$')[2];
           var hashedPassword = hash(password,salt);//creating hash based on password  submitted and the original salt
           if (hashedPassword ===dbString){
           
           // Set the sessionn id
           req.session.auth ={userId:result.rows[0].id};
           //set cookies m onthe server silde it maps
               
           res.send('Credentials correct');
           
           }else{
               res.send(403).send('username/password is invalid');
           }
               
           
       }
      
   }



app.get('/check-login',function (req,res)){
    if (req.session && req.session.outh && req.sesion.auth.userId){
        res.send('you are logged in:' + req.session.auth.userId.toString());
    }else{
        res.send('you are not logged in');
    }
});

var pool = new Pool(config)
app.get('/test-db',function(req,res){
//make a selected request
//return a response with the resultes
pool.query('SELECT * FROM test', function (err,result){
   if(err){
       res.status(500).send(err.toString());
   } else{
       res.send(JSON.stringify(result.row));
   }
});

});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
