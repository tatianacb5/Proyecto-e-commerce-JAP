//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
    .then(respuesta=>respuesta.json())
    .then(datos=> {
        for (let i=0; i < datos.length; i++) {
         let contenido = ` 
            <tr>
            <td><h4>` + datos[i].name + `</h4> </td>
            <img src="` + datos[i].imgSrc + `" alt="` + datos[i].description + `" class="img-thumbnail" width="230" height="230"/>
            <td> ` + datos[i].description + ` </td>
            <small class="text-muted">` + datos[i].soldCount + ` artículos</small>
            </tr>

        `
            document.getElementById('products').innerHTML+=contenido
        }

    })
    .catch(error=> alert('error:'  +error)); 

});