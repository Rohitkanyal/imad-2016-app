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
//Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
    //Make a request to the serer and send the name
    
    
    // Capture a list of names and render it as a list
    var names =['name1','name2','name3','name4'];
    var list ='';
    for (var i=0;i<names.length;i++){
        list+-'<li>'+names[i]+'</li>';
    }
    var ul =document.getElementById()'namelist';
    ul.innerHTML =list;
};
