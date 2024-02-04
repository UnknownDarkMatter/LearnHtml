

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Triangle {
  constructor(point1, point2, point3, color) {
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.color = color;
  }

  draw(){
    var angleRotation = Utils.angleRotation(this.point1, this.point3);
    console.log('angle rotation :' + angleRotation);
    var point1 = new Point(this.point1.x, this.point1.y);
    var point2 = new Point(this.point2.x, this.point2.y);
    var point3 = new Point(this.point3.x, this.point3.y);

    var centreRotation = Utils.centreTriangle(point1, point2, point3, angleRotation);
    console.log('centre rotation x=' + centreRotation.x + ',y=' + centreRotation.y);

    point1 = Utils.inverseRotation(point1, -angleRotation, centreRotation);
    point2 = Utils.inverseRotation(point2, -angleRotation, centreRotation);
    point3 = Utils.inverseRotation(point3, -angleRotation, centreRotation);

    var top = point2.y;
    var left = point1.x;
    var borderBottom = point1.y - top;
    var borderLeft = point2.x - left;
    var borderRight = point3.x - point2.x;
    var borderTop = 0;

    var html = '<div style="position:absolute;left:' + left + 'px;top:' + top + 'px;';
    html+='height:0px;width:0px;';
    html+='border-style: solid;';
    html+='border-width: ' + borderTop + 'px ' + borderRight + 'px ' + borderBottom + 'px ' + borderLeft + 'px;';
    html+='border-color: transparent green ' + this.color + ' red;';
    html+='transform: rotate(' + Math.round(angleRotation) + 'deg);';
    html+='';
    html+='"></div>';
    var newHtmlElement = $(html);

    $('body').append(newHtmlElement);
  }
}

class Utils{
    static centreTriangle(p1, p2, p3, angleDeg){
        var angleRad = angleDeg / (180 / Math.PI);
        //droite p1 - p3
        var a = (p1.y - p3.y)/(p1.x - p3.x);
        var b = p1.y - a*p1.x;
        //distance p2 à la droite p1-p3
        var d = (Math.abs(p2.y - (a * p2.x) - b))/(Math.sqrt(1 + (a*a)));

        var xmin = p1.x;
        var xmax = p3.x + d * Math.sin(angleRad);

        var ymax = p1.y;
        var ymin = p3.y - d * Math.cos(angleRad);

        var x = Math.round(xmin + (xmax - xmin) / 2);
        var y = Math.round(ymin + (ymax - ymin) / 2);
        return new Point(x, y);
    }

    static angleRotation(point1, point3){
        var hypothesuse = Math.sqrt(((point3.y - point1.y) * (point3.y - point1.y)) 
        + ((point3.x - point1.x) * (point3.x - point1.x)));
        var coteAdjacent = Math.abs(point3.x - point1.x);
        var angle = Math.acos(coteAdjacent/hypothesuse) * (180 / Math.PI);
        if(point1.y > point3.y){
            angle = -angle;
        }
        return angle;
    }

    static inverseRotation(p, a, c){
        //rotation pour un point P(xp, yp) autour d’un centre C(xc, yc) d’un angle a
        var xp = c.x + (p.x - c.x) * Math.cos(a/(180 / Math.PI)) - (p.y - c.y) * Math.sin(a/(180 / Math.PI));
        var yp = c.y + (p.x - c.x) * Math.sin(a/(180 / Math.PI)) + (p.y - c.y) * Math.cos(a/(180 / Math.PI));
        return new Point(xp, yp);
    }

}