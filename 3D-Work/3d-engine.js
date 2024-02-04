
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Triangle {
  constructor(point1, point2, point3) {
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
  }

  draw(){
    var top = $('#triangle-2-y').val();
    var left = $('#triangle-1-x').val();
    var borderBottom = $('#triangle-1-y').val() - top;
    var borderLeft = $('#triangle-2-x').val() - left;
    var borderRight = $('#triangle-3-x').val() - $('#triangle-2-x').val();
    var borderTop = 0;

    var html = '<div style="position:absolute;left:' + left + 'px;top:' + top + 'px;';
    html+='height:0px;width:0px;';
    html+='border-style: solid;';
    html+='border-width: ' + borderTop + 'px ' + borderRight + 'px ' + borderBottom + 'px ' + borderLeft + 'px;';
    html+='border-color: blue green gold red;';
    html+='transform: rotate(0deg);';
    html+='';
    html+='"></div>';
    var newHtmlElement = $(html);

    $('body').append(newHtmlElement);
  }
}


