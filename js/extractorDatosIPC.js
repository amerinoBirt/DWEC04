//'use strict'

// variables iniciales de generación del periodo a consultar.
var anyoIni = "2000";
var mesIni = "01";
var anyoFin = new Date().getFullYear().toString(); // 2022
var mesFin = (new Date().getMonth() + 1).toString().padStart(2, '0'); // 12

var param = "date="
//var apiUrlDatosIPC = "https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/50905?date=20130101:20221201"
var apiUrlDatosIPC = "https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/50905?" + param.concat(anyoIni, mesIni, "01:", anyoFin, mesFin, "01");
var apiUrlPonderaciones = "http://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/50949";

var divDatos = document.querySelector('#datos');
var divUltimoIPC = document.querySelector('#ultimo');
var spanUltimoMes = document.querySelector('#ultimoMes');
var spanUltimoIPC = document.querySelector('#ultimoIPC');
var spanUltimos12IPC = document.querySelector('#ultimos12IPC');


// Ocultamos el DIV que informa de que los datos se están cargando
function ocultarCargando() {
    document.getElementById('divDeCarga').classList.add('d-none');
    document.getElementById('divDeContenido').classList.remove('d-none');
}


// Mostramos la información resúmen de las dos tarjetas
function mostrarTarjetas(datos) {
    let datoUltimoIPC = document.createElement('div');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let valorMes = meses[datos[0].Data[0].FK_Periodo - 1];
    
    spanUltimoMes.innerHTML = valorMes;
    spanUltimoIPC.innerHTML = datos[0].Data[0].Valor;

    let valorUltimos12IPC = 0;
    for (let m = 0; m < 12; m++) {
        valorUltimos12IPC += datos[0].Data[m].Valor;
    };
    spanUltimos12IPC.innerHTML = (valorUltimos12IPC / 12).toFixed(3); // entre 12 meses, con tres decimales
};


// Mostramos los datos sobre la gráfica
function mostrarDatos(datos) {
    // Para la creación de la gráfica iniciamos unas variables
    var dataPoints = [];
    var dataPointsAlt = [];
    var incremento = 30.523;  // vamos a crear una diferencia artificial entre dataPoints y dataPointsAlt
    datos[0].Data.forEach(unDato => {
        dataPoints.push({x: new Date(unDato.Anyo,unDato.FK_Periodo, 01), y: Number(unDato.Valor)});
        dataPointsAlt.push({x: new Date(unDato.Anyo,unDato.FK_Periodo, 01), y: Number(unDato.Valor + incremento)});
        incremento -= 0.111;
    });



    CanvasJS.addCultureInfo("es",
    {
       days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
       shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
       months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
       rangeSelector: {rangeText: "Rango", fromText: "Desde", toText: "Hasta"}
    });

    var stockChart = new CanvasJS.StockChart("chartContainer",{
        animationEnabled: true,
        title: {
            text: "Variación del precio de la cesta",
        },
        subtitles: [{
            text: "IPC alternativo en naranja"
        }],
        charts: [{ 
            data: [{        
                type: "line", //Change it to "spline", "area", "column"
                name: "IPC oficial",
                showInLegend: true,
                dataPoints: dataPoints
            }, 
            {        
                type: "line", //Change it to "spline", "area", "column"
                name: "IPC alternativo",
                showInLegend: true,
                dataPoints: dataPointsAlt,
                color: "orange"
            }]
        }],
        navigator: {
            slider: {
                minimum: new Date(anyoIni, mesIni, 01),
                maximum: new Date(anyoFin, mesFin, 01)
            }
        },
        culture: "es"        
    }); 

    stockChart.render();
}


// Mostramos la lista de subclases y sus ponderaciones.
function mostrarPonderaciones(subclases) {

    /*     datos.forEach(unDato => {   
        if (unDato.Nombre.includes("Índice.")) {             
            let datoParrafo = document.createElement('li');
            datoParrafo.innerHTML = unDato.Nombre.slice(16, -9);
            divDatos.appendChild(datoParrafo); 
        }   
    }); */

    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');

    subclases.forEach(unaSubclase => {   
        if (!unaSubclase.Nombre.includes("Índice general")) { 
            let row = document.createElement('tr');

            // Creamos la celda para el checkbox
            let checkboxCell = document.createElement('td');
            let nombreSubclase = unaSubclase.Nombre.slice(16, -15);
            let valorSubclase = unaSubclase.Data[0].Valor.toFixed(3);
            let codigoSubclase = unaSubclase.COD;
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = codigoSubclase;
            checkbox.name = "checkbox-" + nombreSubclase;
            checkbox.checked = true;
            checkbox.classList.add('mx-2');
                      
            // Creamos la celda para el nombre
            let nameCell = document.createElement('td');
            let nameLabel = document.createElement('label');
            nameLabel.htmlFor = checkbox.id;
            nameLabel.innerText = nombreSubclase;
          
            // Creamos la celda para el valor
            let valueCell = document.createElement('td');
            let valueLabel = document.createElement('label');
            valueLabel.htmlFor = checkbox.id;
            valueLabel.innerText = valorSubclase;
            valueLabel.classList.add('text-right');
            valueCell.style.textAlign = 'right';

            checkbox.addEventListener('change', function() {
                nameLabel.classList.toggle('fw-bold-shadow', !this.checked);
                valueLabel.classList.toggle('fw-bold-shadow', !this.checked);
            });

            checkboxCell.appendChild(checkbox);
            nameCell.appendChild(nameLabel);
            valueCell.appendChild(valueLabel);
          
            // Agregamos las celdas a la fila
            row.appendChild(checkboxCell);
            row.appendChild(nameCell);
            row.appendChild(valueCell);
          
            // Agregamos las celdas a la fila y la fila a la tabla
            tableBody.appendChild(row); 
        }
    }); 

    // Agregamos el cuerpo de la tabla al elemento <table>
    table.appendChild(tableBody);

    // Agregamos la tabla al div de datos
    divDatos.appendChild(table);

    // Ya podemos vincular los botones con los checkbox existentes
    vincularBotones();
}


// Consultamos los datos de las API y lanzamos las funciones correspondientes
async function consultarDatos() {
//    alert("Iniciamos consulta a la API")
    $.ajax({
        type: "GET",
        url: apiUrlDatosIPC,
        data: "",
        success: function(response){
//            alert("recibidos datos de la API")
            ocultarCargando();
            mostrarTarjetas(response);
            mostrarDatos(response);
            $.ajax({
                type: "GET",
                url: apiUrlPonderaciones,
                data: "",
                success: function(subclases){
                    mostrarPonderaciones(subclases);
                }
            });
        },
/*             error: function(error){
            alert("Error en la solicitud a la API: " + error);
        } */
    });


}