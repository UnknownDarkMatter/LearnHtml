
/////////////////////////////////////////////////////////////
//      logique de la presentation
//          - crée les objets dessinés dans le DOM (Document Object Model), cad de html affiché
//          - gère les événements déclenchés par les actions de l'utilisateur dans la page
/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
//      declaration des variables
/////////////////////////////////////////////////////////////

var isMouseDownRedimensionGauche = false;
var isMouseDownRedimensionDroite = false;
var isMouseDownRedimensionHaut = false;
var isMouseDownRedimensionBas = false;


var dessinObjectCompteur = 0;//permet de generer l'id des objets dessinés grace a la fonction dessinObjectCompteurToId
var dessinObjetEnAction = '';//memorise l'objet en cours de déplacement par un clickdown, mousemove et mouseup
var dessinObjetEnActionLeft = 0;//coordonnées left et top lors du mouseDown afin de calculer le deplacement relatif lors du mousemove
var dessinObjetEnActionTop = 0;

/////////////////////////////////////////////////////////////
//      gestion du redimentionnement de la zone de dessin
/////////////////////////////////////////////////////////////

//pageY : google -> What is the difference between screenX/Y, clientX/Y and pageX/Y?

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

/////////////////////////////////////////////////////////////
//      gestion du dessinage des objets à dessiner
/////////////////////////////////////////////////////////////

function dessinObjectCompteurToId(compteur){
    return "dessin-object-" + compteur;
}
function dessinLigneDebutCompteurToId(compteur){
    return "dessin-ligne-debut-" + compteur;
}
function dessinLigneFinCompteurToId(compteur){
    return "dessin-ligne-fin-" + compteur;
}

$(window).mouseup(function(event){
    dessinObjetEnAction = '';
});

function liaisonEvenementsActions(newElement){

    newElement.mousedown(function(event){
        dessinObjetEnAction = $(this).attr('id');
        var dejaDeplaceLeft = $('#' + dessinObjetEnAction).position().left - $('.zone-dessin').position().left;
        var dejaDeplaceTop = $('#' + dessinObjetEnAction).position().top - $('.zone-dessin').position().top;
        dessinObjetEnActionLeft = event.clientX - dejaDeplaceLeft;
        dessinObjetEnActionTop = event.clientY - dejaDeplaceTop;
    });
    newElement.mousemove(function(event){
        if(dessinObjetEnAction != ''){
            var left = event.clientX - dessinObjetEnActionLeft + $('.zone-dessin').position().left;
            var top = event.clientY - dessinObjetEnActionTop + $('.zone-dessin').position().top;
            $('#' + dessinObjetEnAction).css('left', left);
            $('#' + dessinObjetEnAction).css('top', top);
        }
    });

}

$('#outil-rectangle').click(function(){
    dessinObjectCompteur++;
    var html = "<div id='" + dessinObjectCompteurToId(dessinObjectCompteur) + "' ";
    html+= "class='dessin-object' ";
    html+= "style='height:100px;width:100px;border:solid 1px blue;position: absolute;background-color: lightblue; '";
    html+= "></div>";
    var newElement = $(html);
    $('.zone-dessin').append(newElement);
    liaisonEvenementsActions(newElement);
});

$('#outil-cercle').click(function(){
    dessinObjectCompteur++;
    var html = "<div id='" + dessinObjectCompteurToId(dessinObjectCompteur) + "' ";
    html+= "class='dessin-object' ";
    html+= "style='display:inline-block;border-radius:50%;height:100px;width:100px;border:solid 1px blue;position: absolute;background-color: lightblue; '";
    html+= "></div>";
    var newElement = $(html);
    $('.zone-dessin').append(newElement);
    liaisonEvenementsActions(newElement);
});


$('#outil-ligne').click(function(){
    dessinObjectCompteur++;
    var html = "<div id='" + dessinObjectCompteurToId(dessinObjectCompteur) + "' ";
    html+= "class='dessin-object dessin-object-ligne' ";
    html+= "style='display:flex;justify-content: space-between;align-items: center;width:200px;border:solid 1px blue;position: absolute;background-color: blue;transform:rotate(0deg);'>";
    html+= "";
    html+= "<div class='ligne-debut' id='" + dessinLigneDebutCompteurToId(dessinObjectCompteur) + "' style='border-radius:50%;height:50px;width:50px;'></div>";
    html+= "<div class='ligne-fin' id='" + dessinLigneFinCompteurToId(dessinObjectCompteur) + "'  style='border-radius:50%;height:50px;width:50px;'></div>";
    html+= "";
    html+= "</div>";
    var newElement = $(html);
    $('.zone-dessin').append(newElement);

    newElement.mousedown(function(event){
        dessinObjetEnAction = $(this).attr('id');
        var dejaDeplaceLeft = $('#' + dessinObjetEnAction).position().left - $('.zone-dessin').position().left;
        var dejaDeplaceTop = $('#' + dessinObjetEnAction).position().top - $('.zone-dessin').position().top;
        dessinObjetEnActionLeft = event.clientX - dejaDeplaceLeft;
        dessinObjetEnActionTop = event.clientY - dejaDeplaceTop;
    });
    newElement.mousemove(function(event){
        if(dessinObjetEnAction != ''){
            var left = event.clientX - dessinObjetEnActionLeft + $('.zone-dessin').position().left;
            var top = event.clientY - dessinObjetEnActionTop + $('.zone-dessin').position().top;
            $('#' + dessinObjetEnAction).css('left', left);
            $('#' + dessinObjetEnAction).css('top', top);
        }
    });

    $('.ligne-debut', newElement).mousedown(function(event){
        var elementDebut = $(this);
        var elementFin = $('.ligne-fin', $(this).parent());
        var xDebut = elementDebut.position().left + (elementDebut.outerWidth())/2;
        var yDebut = elementDebut.position().top + (elementDebut.outerHeight())/2;

        dessinObjetEnAction = elementDebut.attr('id');
        dessinObjetEnActionLeft = xDebut - event.clientX;
        dessinObjetEnActionTop = yDebut - event.clientY;
        event.stopPropagation();
    });
    $('.ligne-debut', newElement).mousemove(function(event){
        if(dessinObjetEnAction != ''){
            var elementDebut = $(this);
            var elementFin = $('.ligne-fin', $(this).parent());
            var xDebut = event.clientX + dessinObjetEnActionLeft;
            var yDebut = event.clientY + dessinObjetEnActionTop;
            var xFin = elementFin.position().left + (elementFin.outerWidth())/2;
            var yFin = elementFin.position().top + (elementFin.outerHeight())/2;

            var angleRotation = calculateAngle(xDebut, yDebut, xFin, yFin);
            
            newElement.css('transform', "rotate(" + angleRotation + "deg)");
            event.stopPropagation();
        }
    });

    function calculateAngle(xDebut, yDebut, xFin, yFin){
        var x = (xDebut - xFin);
        x = x < 0 ? -x : x;
        var y = (yDebut - yFin);
        //y = y < 0 ? -y : y;
        var angle = -Math.atan2(y, x)*(180/Math.PI);
        return angle;
    }


});




