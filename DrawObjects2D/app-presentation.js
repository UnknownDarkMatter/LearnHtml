
//gestion du redimentionnement de la zone de dessin

//pageY : google -> What is the difference between screenX/Y, clientX/Y and pageX/Y?



var isMouseDownRedimensionGauche = false;
var isMouseDownRedimensionDroite = false;
var isMouseDownRedimensionHaut = false;
var isMouseDownRedimensionBas = false;
$(window).mouseup(function(event){
    isMouseDownRedimensionGauche = false;
    isMouseDownRedimensionDroite = false;
    isMouseDownRedimensionHaut = false;
    isMouseDownRedimensionBas = false;
});
$(window).mousemove(function(event){
    if(isMouseDownRedimensionGauche){
        zoneDessinWidth = zoneDessinWidth + (zoneDessinLeft - event.clientX)*2;
        zoneDessinLeft = event.clientX;
        
        if(event.pageX <= 5){
            $('.container').width($('.container').width() + 100);
        }

        $('.zone-dessin').width(zoneDessinWidth);
    }
    else if(isMouseDownRedimensionDroite){
        zoneDessinWidth = zoneDessinWidth - (zoneDessinLeft - event.clientX)*2;
        zoneDessinLeft = event.clientX;

        if(event.pageX >= $('.container').width() - 5){
            $('.container').width($('.container').width() + 100);
            var left = $(document).outerWidth() - $(window).width();
            $('body, html').scrollLeft(left);
        }
    
        $('.zone-dessin').width(zoneDessinWidth);
    }
    else if(isMouseDownRedimensionHaut){
        zoneDessinHeight = zoneDessinHeight + (zoneDessinTop - event.clientY)*2;
        zoneDessinTop = event.clientY;
 
        $('.zone-dessin').height(zoneDessinHeight);
    }
    else if(isMouseDownRedimensionBas){
        zoneDessinHeight = zoneDessinHeight - (zoneDessinTop - event.clientY)*2;
        zoneDessinTop = event.clientY;

        if(event.pageY >= $('.container').height() - 5){
            $('.container').height($('.container').height() + 20);
            window.scrollTo(0, document.body.scrollHeight);
        }

        $('.zone-dessin').height(zoneDessinHeight);
    }
});
$('.redimension-gauche').mousedown(function(event){
    zoneDessinLeft = event.clientX;
    isMouseDownRedimensionGauche = true;
});
$('.redimension-droite').mousedown(function(event){
    zoneDessinLeft = event.clientX;
    isMouseDownRedimensionDroite = true;
});
$('.redimension-haut').mousedown(function(event){
    zoneDessinTop = event.clientY;
    isMouseDownRedimensionHaut = true;
});
$('.redimension-bas').mousedown(function(event){
    zoneDessinTop = event.clientY;
    isMouseDownRedimensionBas = true;
});
