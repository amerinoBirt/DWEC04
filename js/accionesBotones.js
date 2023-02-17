'use strict'

function vincularBotones() {
    // Obtenemos los botones y los checkbox
    const btnDesmarcar = document.getElementById('btnDesmarcar');
    const btnMarcarTodo = document.getElementById('btnMarcarTodo');
    const checkboxes = document.querySelector('#datos').querySelectorAll('input[type=checkbox]');


    // Agregamos el evento click al botón
    document.getElementById("btnDesmarcar").addEventListener("click", function() {
        // IDs de los checkbox a desmarcar
        var ids = ["IPC233186", "IPC233184", "IPC233183", "IPC233178", "IPC233177", "IPC233127", "IPC233129", "IPC233123", "IPC233113", 
        "IPC233122", "IPC233112", "IPC233121", "IPC233119", "IPC233118", "IPC233117", "IPC233115", "IPC233114", "IPC233108", "IPC233107", 
        "IPC233106", "IPC233104", "IPC233103", "IPC233102", "IPC233101", "IPC233100", "IPC233099", "IPC233097", "IPC233096", "IPC233095", 
        "IPC233093", "IPC233092", "IPC233091", "IPC233086", "IPC233085", "IPC233081", "IPC233078", "IPC233073", "IPC233079", "IPC233072", 
        "IPC233071", "IPC233068", "IPC233067", "IPC233066", "IPC233065", "IPC233064", "IPC233062", "IPC233061", "IPC233057", "IPC233056", 
        "IPC233054", "IPC233054", "IPC233050", "IPC233049", "IPC233047", "IPC233046", "IPC233045", "IPC233041", "IPC233039", "IPC233038", 
        "IPC233037", "IPC233035", "IPC233033", "IPC233032", "IPC233029", "IPC233028", "IPC233027", "IPC233026", "IPC233025", "IPC233024", 
        "IPC233022", "IPC233021", "IPC233020", "IPC233015", "IPC233014", "IPC233013", "IPC233012", "IPC233011", 
        "IPC233010", "IPC233009", "IPC233008", "IPC233007", "IPC233006", "IPC233005", "IPC233003", "IPC232996", "IPC232993", "IPC232992", 
        "IPC232990", "IPC232987", "IPC232985", "IPC232981", "IPC232977", "IPC232965", "IPC232964", "IPC232963", "IPC232959", 
        "IPC232957", "IPC232956", "IPC232955", "IPC232954", "IPC232953", "IPC232952", "IPC232951", "IPC232949", "IPC232947", "IPC232946", 
        "IPC232945", "IPC232944", "IPC232942", "IPC232939", "IPC232938", "IPC232937", "IPC232936", "IPC232935", "IPC232934", "IPC232933", 
        "IPC232931", "IPC232930", "IPC232929", "IPC232928", "IPC232927", "IPC232926", "IPC232925", "IPC232924", "IPC232923", "IPC232922", 
        "IPC232921", "IPC232920", "IPC232918", "IPC232917", "IPC232916", "IPC232915", "IPC232913", "IPC232912", "IPC232910", "IPC232908", 
        "IPC232907", "IPC232903", "IPC232902", "IPC232900", "IPC232899", "IPC232897", "IPC232896", "IPC232895", "IPC232894"];
    
        // Desmarca los checkbox correspondientes y pone los textos en negrita
        ids.forEach(function(id) {
            document.getElementById(id).checked = false;
            document.querySelectorAll('label[for="' + id + '"]').forEach(label => label.classList.add('fw-bold-shadow'));
        });
    });

    // Agregamos evento de clic al botón "Marcar todo"
    btnMarcarTodo.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
        if (!checkbox.checked) {
            // Marcar el checkbox si no está marcado y quitar los textos en negrita
            checkbox.checked = true;
            document.querySelectorAll('label[for="' + checkbox.id + '"]').forEach(label => label.classList.remove('fw-bold-shadow'));
        }
    });
    });
}

