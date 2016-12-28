
//Submit username/password to login

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
       //Creat a request object
       var request = new XMLHttpRequest();
       
       // Catputre the response and store in variable
       
    if (request.readyState ===XMLHttpRequst.DONE){
    // take some action
    if (request.readyState === 200){
       // Capture a list of names and render it as a list
       console.log('user logged in');
       alert('Logged in successfully');
     }else if(request.status ===403){
         alert('Username/password is incorrect');
     }
     else if(request.status ===500){
           alert('something went wrong o the server');
     }
    
     }
     // not done yet
   };

    //Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://http://rohitkanyal.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:}));
};