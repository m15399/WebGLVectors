
var line1 = Line.Create();


function draw(timestamp){
    ClearGL();

    vec3.set(line1.loc, 0, 0, 0);
    line1.rot = 0;
    line1.Draw();
    vec3.set(line1.loc, 0, 2, 0);
    line1.Draw();
    line1.rot = 90;
    vec3.set(line1.loc, -1, 1, 0);
    line1.Draw();
    vec3.set(line1.loc, 1, 1, 0);
    line1.Draw();

    window.requestAnimationFrame(draw);
}

function main(){
    InitShaders();

    draw();
}

(function(){ main(); })();
