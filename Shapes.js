
var Shapes = {};

(function(){

    var o = {};

    var quickline = Line.Create();

    Shapes.Line = function(x, y, x2, y2){
        var dx = x2 - x;
        var dy = y2 - y;

        var len = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx);

        var l = quickline;
        vec3.set(l.loc, x + dx/2, y + dy/2, 0);
        l.rot = angle / Math.PI * 180;
        vec3.set(l.scale, len, l.scale[1], l.scale[2]);

        l.Draw();
    }

    Shapes.Square = function(x, y){
        Shapes.Line(x-1, y-1, x-1, y+1);
        Shapes.Line(x-1, y+1, x+1, y+1);
        Shapes.Line(x+1, y+1, x+1, y-1);
        Shapes.Line(x+1, y-1, x-1, y-1);
    }

})();
