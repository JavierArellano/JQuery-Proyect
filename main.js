var cont = 0;
var tipo = "";
$(document).ready(function(){
    $("#peli").click(function(){
        tipo = "&type=movie";
        nueva_busqueda();
        obtener_datos(tipo);
    });
    $("#serie").click(function(){
        tipo = "&type=series";
        nueva_busqueda();
        obtener_datos(tipo);
    })
    $("#buscar").click(function(){
        tipo = "";
        nueva_busqueda();
        let texto_buscar = $("input").val();
        $.getJSON("http://www.omdbapi.com/?s="+texto_buscar, function(pelis){
            for (peli of pelis.Search){
                inserta_pelis(peli);
            }
        });
    });
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height()-2) {
            obtener_datos();
        }
    });
    
});
function obtener_datos(){
    cont++;
    let texto_buscar = $("input").val();
    $.getJSON("http://www.omdbapi.com/?s="+texto_buscar+"&page="+cont+tipo, function(pelis){
        for (peli of pelis.Search){
            inserta_pelis(peli);
        }
    });
}
function nueva_busqueda(){
    cont=0;
    $("#contenedor").empty();
}
function inserta_pelis(pelis){
    hayimg(pelis);
    $("#contenedor").append($("<div id='tarjeta'><img src="+pelis.Poster+"><p>"+pelis.Title+"</p><p>"+pelis.Year+"</p></div>"));
}
function hayimg(peli) {
    if (peli.Poster == "N/A") {
        peli.Poster = "./supollo.jpg";
    }
}