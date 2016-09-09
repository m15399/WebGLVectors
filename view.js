
var View = (function(){
    var o = {};

    o.eye = vec3.fromValues(0, 0, 10);
    o.center = vec3.fromValues(0, 0, 0);
    o.up = vec3.fromValues(0, 1, 0);


    o.RecalculateView = function(){
        this.PMatrix = mat4.create();
        this.VMatrix = mat4.create();
        this.PVMatrix = mat4.create();

        mat4.perspective(this.PMatrix, glMatrix.toRadian(60), canvas.width/canvas.height, .1, 100);

        mat4.lookAt(this.VMatrix, this.eye, this.center, this.up);

        mat4.multiply(this.PVMatrix, this.PMatrix, this.VMatrix);
    }

    return o;
})();
