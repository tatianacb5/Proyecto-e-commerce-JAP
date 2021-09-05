//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let maximo;
let minimo;
let buscador; 
const masRelevantes =  "masRelevantes";
const precioMayor = "precioMayor";
const precioMenor = "precioMenor";

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
    .then(respuesta=>respuesta.json())
     .then(datos=> 
    {
         show(datos);
    })
    .catch(error=> alert('error:'  +error)); 

}) 

function show(json){
    
    document.getElementById("products").innerHTML="";  

    for(let i = 0; i < json.length; i ++ ) {
            let lista =  ` 
            <tr>
            <td><h4>` + json[i].name + `</h4> </td>
            <img src="` + json[i].imgSrc + `" alt="` + json[i].description + `" class="img-thumbnail" width="230" height="230"/>
            <td> ` + json[i].description + ` </td>
            <td> ` + json[i].cost + ` USD </td>
            <small class="text-muted">` + json[i].soldCount + ` artículos</small>
            </tr> 
            `

          document.getElementById("products").innerHTML+=lista  
    }
}

function validador(dato){

    if ((dato != "") && (parseInt(dato) >= 0 )&& (dato != undefined)){
     return true;
    }
    else {
        return false;
    }
}


function listarEnPantalla(){
    minimo = document.getElementById("preciomin").value;
    maximo = document.getElementById("preciomax").value;
    document.getElementById('products').innerHTML="";

if(validador(minimo)&&validador(maximo)){
        fetch(PRODUCTS_URL)
        .then(respuesta=>respuesta.json())
        .then(datos=> {
            for (let i=0; i < datos.length; i++){
                if ( (datos[i].cost >= minimo) && (datos[i].cost <= maximo)){
                    let contenido = ` 
                    <tr>
                    <td><h4>` + datos[i].name + `</h4> </td>
                    <img src="` + datos[i].imgSrc + `" alt="` + datos[i].description + `" class="img-thumbnail" width="230" height="230"/>
                    <td> ` + datos[i].description + ` </td>
                    <td> ` + datos[i].cost + ` USD </td>
                    <small class="text-muted">` + datos[i].soldCount + ` artículos</small>
                    </tr>
                `
                    document.getElementById('products').innerHTML+=contenido
                }      
            }
        })
        .catch(error=> alert('error:'  +error)); 
    }
}



function orden(json, asignacion){
        if(asignacion === "masRelevantes"){
            json.sort(function(a, b) {
                if ( a.soldCount > b.soldCount ){ return -1; }
                if ( a.soldCount < b.soldCount ){ return 1; }
                return 0;
          
            })
        } else if (asignacion === "precioMayor"){
            json.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
          
            })

        } else if (asignacion === "precioMenor") { 
            json.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
          
            })
         }
     return json;
}

function relevantes(){
    fetch(PRODUCTS_URL)
    .then(respuesta=>respuesta.json())
    .then(datos=> { 
     let json_Ordenado = orden(datos, masRelevantes)

     show(json_Ordenado)
    })
    .catch(error=> alert('error:'  +error)); 

}

function organizar(){
    fetch(PRODUCTS_URL)
    .then(respuesta=>respuesta.json())
    .then(datos=> { 
     let json_Ordenado = orden(datos, precioMayor)
     show(json_Ordenado)
    })
    .catch(error=> alert('error:'  +error)); 

}

     

function organizarDesc() {
    
    fetch(PRODUCTS_URL)
    .then(respuesta=>respuesta.json())
    .then(datos=> 
    {  
        let json_Ordenado = orden(datos, precioMenor)
        show(json_Ordenado)
        
    })
    .catch(error=> alert('error:'  +error)); 

}
   
   
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lupa").addEventListener('input', function () {

        buscador = document.getElementById("lupa").value;
        filtro(buscador);
    });
})

  
 function filtro(buscador){
    

         document.getElementById("products").innerHTML="";  
        fetch(PRODUCTS_URL)
        .then(respuesta=>respuesta.json())
        .then(json=> {
        for(let i = 0; i < json.length; i ++ ){
                
            if(buscador != undefined && (json[i].name.toLowerCase().includes(buscador.toLowerCase()) || json[i].description.toLowerCase().includes(buscador.toLowerCase()))){ 
               

                let elementos = 
                ` 
                <tr>
                <td><h4>` + json[i].name + `</h4> </td>
                <img src="` + json[i].imgSrc + `" alt="` + json[i].description + `" class="img-thumbnail" width="230" height="230"/>
                <td> ` + json[i].description + ` </td>
                <td> ` + json[i].cost + ` USD </td>
                <small class="text-muted">` + json[i].soldCount + ` artículos</small>
                </tr> 
                `
                document.getElementById("products").innerHTML+=elementos  
               
            }   
        }
        })
        .catch(error=> alert('error:'  +error)); 

 }