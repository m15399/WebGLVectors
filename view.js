
var View = (function(){
    var View = {};

    View.eye = vec3.fromValues(0, 0, 10);
    View.center = vec3.fromValues(0, 0, 0);
    View.up = vec3.fromValues(0, 1, 0);


    View.RecalculateView = function(){
        this.PMatrix = mat4.create();
        this.VMatrix = mat4.create();
        this.PVMatrix = mat4.create();

        mat4.perspective(this.PMatrix, glMatrix.toRadian(60), canvas.width/canvas.height, .1, 100);

        mat4.lookAt(this.VMatrix, this.eye, this.center, this.up);

        mat4.multiply(this.PVMatrix, this.PMatrix, this.VMatrix);
    }

    View.z = function(z){
        if(z !== undefined){
            vec3.set(this.eye, this.eye[0], this.eye[1], z);
            this.RecalculateView();
        }
        return this.eye[2];
    }

    View.dz = function(dz){
        this.z(this.z() + dz);
    }

    return View;
})();
