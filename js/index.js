/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};
/*
  Función que inicializa el elemento Slider
*/
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
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
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
/*
| Funcion que obtiene las opciones de los Selects de la busqueda personalizada  
*/
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
                //refreshView(data);
                console.log(data);
            } else {
                alert('No existen opciones para el selector :' + select);
            }
        },
        error: (err) => console.log(err)
    });
}
/*
  Funcion que renderiza y agrega las opciones de los Selects de la busqueda personalizada
*/
function renderOptionsSelect(selector, items) {
    let getsel = $('#select' + selector);
    items.forEach(item => getsel.append(`<option value="${item}">${item}</option>`));
}
/*
  Funcion que inicializa los Selects de la busqueda personalizada segun los items del Archivo JSON
*/
function initSelects() {
    setOptionsSelect('Ciudad');
    setOptionsSelect('Tipo');
}

initSlider();
initSelects();
//playVideoOnScroll();