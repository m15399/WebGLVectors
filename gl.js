
var gl;
var canvas;

function SetPointSize(size){

}

function ClearGL(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function FitCanvasToWindow(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);

    CalculatePVMatrix();
}

(function StartWebGL(){
    document.body.style.margin = 0;
    document.body.style.border = 0;
    document.body.style.overflow = 'hidden';

    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    gl = canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');

    if(!gl){
        alert('Unable to initialize WebGL, your browser may not support it');
    }

    FitCanvasToWindow();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    gl.clearColor(0, 0, 0, 1);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    ClearGL();

})();
