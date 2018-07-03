//  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página //
$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};
//  Función que inicializa el elemento Slider //
function initSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 200,
        to: 80000,
        step: 100,
        prefix: "$"
    });
}
//  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll //
function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            if (scrollActual > ultimoScroll) {
                video.play();
            } else {
                //this.rewind(1.0, video, intervalRewind);
                video.play();
            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            video.pause();
        }, 10)
}
//  Funcion que obtiene las opciones de los Selects de la busqueda personalizada //
function setOptionsSelect(select) {
    let selector = new FormData();
    selector.append('selector', select);
    $.ajax({
        url: './php/index.php',
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: selector,
        success: (data) => {
            if (data) {
                renderOptionsSelect(select, data);
            } else {
                alert('No existen opciones para el selector :' + select);
            }
        },
        error: (err) => console.log(err)
    });
}
//  Funcion que renderiza y agrega las opciones de los Selects de la busqueda personalizada //
function renderOptionsSelect(selector, items) {
    let getsel = $('#select' + selector);
    getsel.material_select();
    getsel.on('contentChanged', function() { $(this).material_select() });
    items.forEach(item => getsel.append(`<option value="${item}">${item}</option>`));
    getsel.trigger('contentChanged');
}
//  Funcion que realiza las peticiones de datos POST AJAX hacia el servidor con codigo PHP //
function ajaxRequestData(searchOption) {
    return $.ajax({
        url: './php/buscador.php',
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: searchOption
    });
}
//  Funcion que renderiza y agrega los items de vivienda-propiedad como resultado de las busquedas //
function renderItems(item) {
    let itemsList = $('.colContenido');
    itemsList.append(
        `<div class="card itemMostrado"><img src="./img/home.jpg">
            <div class="card-stacked"><p>
                <b>Direccion: </b>${item.Direccion}</br>
                <b>Ciudad: </b>${item.Ciudad}</br>
                <b>Teléfono: </b>${item.Telefono}</br>
                <b>Código Postal: </b>${item.Codigo_Postal}</br>
                <b>Tipo: </b>${item.Tipo}</br>
                <b>Precio: </b><span class="precioTexto">${item.Precio}</span></p>
            </div>
        </div>`);
}
// Funcion que realiza el barrido de items de vivienda en cada una de las busquedas realizadas //
function sweepItems() {
    let itemsList = $('.colContenido');
    if (itemsList.children().length > 1) {
        itemsList.children('.itemMostrado').remove();
    }
}
//  Inicializador de los Selects y Slider de la busqueda personalizada segun los items del Archivo JSON //
function initInputSearch() {
    setOptionsSelect('Ciudad');
    setOptionsSelect('Tipo');
    initSlider();
}
//  Inicializacion de los Elementos de la busqueda personalizada //
initInputSearch()
playVideoOnScroll();
// ---------------------------------------------------------------------------------------------------------- //
//  Funciones de ejecucion para los eventos de acciones de los botones de busqueda [Mostrar Todos] y [Buscar] //
$(function() {
    $('#mostrarTodos').on('click', function(evt) {
        evt.preventDefault();
        let searchType = new FormData();
        searchType.append('custom', false);
        ajaxRequestData(searchType)
            .done(data => {
                sweepItems();
                data.forEach(item => renderItems(item));
            }).fail(error => console.log(error));
    });
    $('#formulario').submit(function(evt) {
        evt.preventDefault();
        let cdad_opc = $('#selectCiudad').val();
        let tipo_opc = $('#selectTipo').val();
        let rango = $('#rangoPrecio').prop("value").split(";");
        let searchType = new FormData();
        searchType.append('custom', true);
        searchType.append('cdad', cdad_opc);
        searchType.append('tipo', tipo_opc);
        searchType.append('preciobj', rango[0]);
        searchType.append('precioat', rango[1]);
        ajaxRequestData(searchType)
            .done(data => {
                sweepItems();
                data.forEach(item => renderItems(item));
            }).fail(error => console.log(error));
    });
});