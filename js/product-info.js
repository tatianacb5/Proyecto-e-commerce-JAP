

let AutoGuardado = localStorage.getItem('AutoMostrado');

document.addEventListener("DOMContentLoaded", function MostrarAuto()
{
 
 fetch(MOREPRODUCT_INFO_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let name;
        let contenido;

        for(let i=0; i < datos.length; i++){
            if ( AutoGuardado == datos[i].name )  { 

             contenido = ` 
            <tr>
            <td><h4>` + datos[i].name + `</h4> </td>
            <img src="` + datos[i].images + `" alt="` + datos[i].description + `" class="img-thumbnail" width="230" height="230"/>
            <td> ` + datos[i].description + ` </td>
            <td> ` + datos[i].cost + ` USD </td>
            <small class="text-muted">` + datos[i].soldCount + ` artículos</small>
            </tr>
        `
            document.getElementById("nombre").innerHTML+=datos[i].name; 
            document.getElementById("descripcion").innerHTML+=datos[i].description
            document.getElementById("precio").innerHTML+=datos[i].cost 
            document.getElementById("imagenes").innerHTML+='<img src="' + datos[i].images + '"'+ '/>'
            document.getElementById("vendidos").innerHTML+=datos[i].soldCount
            comments(i);
            mostrarImagenes(datos[i].images);
            
            }
        }}
   
    )
    .catch(error=> alert('error:'  +error)); 

} )


function comments(numero){

    document.getElementById("comentarios").innerHTML = "";
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(respuesta => respuesta.json())
    .then(datos =>{
 
            let comentar = `
            <div>`+ datos[numero].description +`</div>
            <div>Usuario: `+ datos[numero].user +`</div>
            <div>`+ datos[numero].dateTime +`</div>
            <div>`+ datos[numero].score +` <i class="active fa fa-star"></i>
            </div>

            `
            document.getElementById("comentarios").innerHTML += comentar
       
    

 })
    .catch(error=> alert('error:'  +error)); 
  
}



function mostrarImagenes(array){

    let imagen = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        imagen += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("imagenes").innerHTML = imagen;
    }
}