//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    let profile = localStorage.getItem('UserAct');
    if(profile){

        profile = JSON.parse(profile);
    
       
    document.getElementById("name").placeholder = profile.name
    document.getElementById("email").placeholder = profile.email
    document.getElementById("age").placeholder = profile.age
    document.getElementById("phone").placeholder = profile.phone
        
      }

});



function actualizarPerfil (){

    let actualizo = {
        name : document.getElementById("name").value, 
        email: document.getElementById("email").value,
        age : document.getElementById("age").value, 
        phone: document.getElementById("phone").value
    }

    if(actualizo.name=='')
    { actualizo.name=document.getElementById("name").placeholder}
    if(actualizo.email==''){actualizo.email=document.getElementById("email").placeholder}
    if(actualizo.age==''){actualizo.age=document.getElementById("age").placeholder}
    if(actualizo.phone==''){actualizo.phone=document.getElementById("phone").placeholder}

    let datos_actualizados = JSON.stringify(actualizo);

    localStorage.setItem("UserAct", datos_actualizados);
  
} 


