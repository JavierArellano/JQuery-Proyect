var cont = 0;
$(document).ready(function(){
    $("#buscar").click(function(){
        nueva_busqueda();
        let texto_buscar = $("input").val();
        $.getJSON("http://www.omdbapi.com/?s="+texto_buscar, function(pelis){
            for (peli of pelis.Search){
                inserta_pelis(peli);
            }
        });
    });
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height()-10) {
            obtener_datos();
        }
    });
    
});
function obtener_datos(){
    cont++;
    let texto_buscar = $("input").val();
    $.getJSON("http://www.omdbapi.com/?s="+texto_buscar+"&page="+cont, function(pelis){
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
    $("#contenedor").append($("<div id='tarjeta'><img src="+pelis.Poster+"><p>"+pelis.Title+"</p><p>"+pelis.Year+"</p></div>"));
}