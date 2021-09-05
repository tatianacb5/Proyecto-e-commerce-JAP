

function ingresoUsuario(){

    document.getElementById("user").value;
    document.getElementById("clave").value; 
  
    if(user.value === '' || clave.value === ''){
      alert ("debes completar todos los campos");
      return false;
  
    } else {      
        window.location = "inicio.html"
    }
    guardarDatos();
  }
  

  function guardarDatos() {

    let UserLogged = {
       usuario : document.getElementById("user").value, 
       contraseña: document.getElementById("clave").value 
      };

      let datos_usuarios = JSON.stringify(UserLogged);

      localStorage.setItem("UserLogged", datos_usuarios);

  }

  //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  let userLogged = localStorage.getItem('UserLogged');
  let infoUser = document.getElementById("infouser")
  
  if(userLogged){

    userLogged = JSON.parse(userLogged);

    infoUser.innerHTML = infoUser.innerHTML + userLogged.usuario;

    infoUser.style = "display: inline-block";

  }

});