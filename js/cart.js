

const JSON_OTRO = 'https://japdevdep.github.io/ecommerce-api/cart/654.json'

document.addEventListener("DOMContentLoaded", function(e){
    fetch(JSON_OTRO)
    .then(respuesta => respuesta.json())
    .then(datos =>{

        for(let i = 0; i < datos.articles.length; i ++ ){

            let articulos =

            `    
            <div class="container">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src=" `+ datos.articles[i].src+`" class="card-img" alt="pino">
                </div>
                <div class="col-md-8">
                  <div class="card-body" >
                  <tr>
                  <td><h4>` + datos.articles[i].name + `</h4> </td>    
                  <td><p>Precio por unidad: ` + datos.articles[i].unitCost + `</p> </td>    
                  <td><p>Moneda:  ` + datos.articles[i].currency + `</p> </td> 
                   <div>    
                    <button type="button" class="btn btn-light" onclick="restarItem( ` + i+ ','+ datos.articles[i].unitCost + ','+ "'"+ datos.articles[i].currency +"'" + `)">-</button>
                    <input value="1" id= `+ i +` >  
        
                    <button type="button" class="btn btn-light" onclick="sumarItem( ` + i+ ','+ datos.articles[i].unitCost+ ','+ "'"+ datos.articles[i].currency +"'"  +`)">+</button>
                  </div>  
                  </div>
                  </div>
                  </div>
              </div>
          </div>

            ` 
            document.getElementById("art").innerHTML+=articulos
            calculoInicial(i, datos.articles[i].unitCost, datos.articles[i].currency);
 }
        
    })

    .catch(error=> alert('error:'  +error)); 

});

//calculo de los datos de entrada
 function calculoInicial(item, vCost, moneda){
if(moneda=='USD'){
    let saldoEnPesos=vCost*40
    let items = document.getElementById(item).value 
    let numero = parseInt(items)*saldoEnPesos
    let valor_actual=document.getElementById('subtotal').innerText;
    document.getElementById('subtotal').innerHTML= parseInt(valor_actual)+numero; 
    calcularEnvios();
    calculaTotal();
}
else{
    let items = document.getElementById(item).value 
    let numero = parseInt(items)*vCost
    let valor_actual=document.getElementById('subtotal').innerText;
    document.getElementById('subtotal').innerHTML= parseInt(valor_actual)+numero; 
    calcularEnvios();
    calculaTotal();
}
}


function sumarItem(itemId, unitCost, moneda)
{
    let obtener=document.getElementById('subtotal').innerText
    var cambiarle_valor= document.getElementById(itemId)
    if(moneda=='USD'){
            let saldoEnPesos=unitCost*40
        
        if( cambiarle_valor.value == 0 )
        {
            cambiarle_valor.value ++
            let resultado=parseInt(obtener)+saldoEnPesos;
            document.getElementById('subtotal').innerHTML = resultado
        }
        else {

            cambiarle_valor.value ++
            let resultado=parseInt(obtener)+saldoEnPesos ;
            document.getElementById('subtotal').innerHTML = resultado
        }
    }
    else{
        if( cambiarle_valor.value == 0 )
        {
        cambiarle_valor.value ++
         let resultado=parseInt(obtener)+unitCost;
         document.getElementById('subtotal').innerHTML = resultado
        }
     else 
     {

        cambiarle_valor.value ++
        let resultado=parseInt(obtener)+unitCost ;
        document.getElementById('subtotal').innerHTML = resultado
     }
    }
        
    calcularEnvios();
    calculaTotal();
}

function restarItem(itemId, unitCost,moneda)
{
    let obtener=document.getElementById('subtotal').innerText
    var cambiarle_valor= document.getElementById(itemId)
    if(moneda=='USD'){
        let saldoEnPesos=unitCost*40
    

    if( cambiarle_valor.value > 0 )
     {
        cambiarle_valor.value --
        let resultado=parseInt(obtener)-saldoEnPesos ;
        document.getElementById('subtotal').innerHTML = resultado
     }
        
    }
    else{
        if( cambiarle_valor.value > 0 )
        {
           cambiarle_valor.value --
           let resultado=parseInt(obtener)-unitCost ;
           document.getElementById('subtotal').innerHTML = resultado
        }
    }
    calcularEnvios();
    calculaTotal();
}


//calcula costos envio en base a la cantidad
function calcularEnvios(){
    let subtotal = document.getElementById('subtotal').innerText
    let envioP = document.getElementById('envio').value
        if (envioP === 'value1') {
           let resultado= ((15*subtotal)/100).toFixed(2);
           document.getElementById('porcentaje').innerText=resultado;
   
       } else if (envioP === 'value2'){
   
           let resultado= ((7*subtotal)/100).toFixed(2);
           document.getElementById('porcentaje').innerText=resultado;
   
       } else {
   
           let resultado= ((5*subtotal)/100).toFixed(2);
           document.getElementById('porcentaje').innerText=resultado;
       }

}

// 'escucha' el cambio en el select y llama funcion de calculo de costo de envío
document.getElementById('envio').addEventListener("change", function(){
    calcularEnvios();
    calculaTotal();
})


function finalizarCompra() {
    let selecciontransfer = document.getElementById('check1').checked
    let seleccioncredito = document.getElementById('check2').checked
    document.getElementById('envio').value
    document.getElementById('direccion').value
    document.getElementById('pais').value

       if((selecciontransfer || seleccioncredito) && envio.value != '' && direccion.value != '' &&
       pais.value != ''){

        document.getElementById('alert').innerHTML =
        `     
        <div class="alert alert-success" role="alert">
        ¡Compra realizada con éxito!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
        </div> `
       }

       else {   
           document.getElementById('alert').innerHTML =
       `
       <div class="alert alert-danger" role="alert">
           Debes completar todos los campos para finalizar la compra
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
      </div>`}

}


//suma el subtotal más envío
function calculaTotal(){

    let gasto = document.getElementById('subtotal').innerHTML
    let envio = document.getElementById('porcentaje').innerHTML


        let total = parseInt(gasto) + parseInt(envio) 

        document.getElementById('total').innerHTML = total

}


