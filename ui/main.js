// Counter code
var button = document.getElementById('counter');

button.onclick = function() {
     
     //CREATE A REQUEST OBJECT
     var request = new XMLHttpRequest();
     // Capture the response and store it in a variable
     request.onreadystatechage = function() 
     {
         if (request.readyState --- XMLHttpRequest.DONE)
         {
             //take some action
              if(request.status === 200)
              {
                  var counter = request.responseText;
                  var span = document.getElementById('count');
                  span.innerHTML=counter.toString();
              }    
         }
             //NOtdone et
             
     };
     //MAKE THE REQUEST
     request.open('GET')
    
};