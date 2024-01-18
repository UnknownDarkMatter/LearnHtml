
//gestion du redimentionnement de la zone de dessin
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
        $('.zone-dessin').width(zoneDessinWidth + 'px');
    }
    else if(isMouseDownRedimensionDroite){
        zoneDessinWidth = zoneDessinWidth - (zoneDessinLeft - event.clientX)*2;
        zoneDessinLeft = event.clientX;

        if(event.clientX >= $('.contenu').width() - 10){
            zoneDessinWidth+=200;
        }
    
        $('.zone-dessin').width(zoneDessinWidth + 'px');
    }
    else if(isMouseDownRedimensionHaut){
        zoneDessinHeight = zoneDessinHeight + (zoneDessinTop - event.clientY)*2;
        zoneDessinTop = event.clientY;
        $('.zone-dessin').height(zoneDessinHeight + 'px');
    }
    else if(isMouseDownRedimensionBas){
        zoneDessinHeight = zoneDessinHeight - (zoneDessinTop - event.clientY)*2;
        zoneDessinTop = event.clientY;
        $('.zone-dessin').height(zoneDessinHeight + 'px');
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
