

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


//Desafio carrusel

function mostrarImagenes(array){

    let imagen = "";

        imagen += `

        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="` + array[0] + `" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="` + array[1] + `" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="` + array[2] + `" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
    <img src="` + array[3] + `" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
  <img src="` + array[4] + `" class="d-block w-100" alt="...">
</div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  `
        document.getElementById("imagenes").innerHTML += imagen;
    
}


document.addEventListener("DOMContentLoaded", function relacionados(){
    fetch(PRODUCTS_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let related; 

        related=  ` 
        <div><strong>`+ datos[1].name +`</strong></div>
        <img src="`+ datos[1].imgSrc+`" width="300px" height="200px"> 
        <div><strong>`+ datos[3].name +`</strong></div>
        <img src="`+ datos[3].imgSrc +`"  width="300px" height="200px"> 

        `
            document.getElementById("relacionados").innerHTML += related;
        } )

    .catch(error=> alert('error:'  +error)); 
})