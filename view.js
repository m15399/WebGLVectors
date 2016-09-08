
var PMatrix;
var VMatrix;
var PVMatrix;

function CalculatePVMatrix(){
    PMatrix = mat4.create();
    VMatrix = mat4.create();
    PVMatrix = mat4.create();

    mat4.perspective(PMatrix, glMatrix.toRadian(60), canvas.width/canvas.height, .1, 100);

    var eye = vec3.create();
    vec3.set(eye, 0, 0, 10);

    var center = vec3.create();
    vec3.set(center, 0, 0, 0);

    var up = vec3.create();
    vec3.set(up, 0, 1, 0);

    mat4.lookAt(VMatrix, eye, center, up);

    mat4.multiply(PVMatrix, PMatrix, VMatrix);
}
