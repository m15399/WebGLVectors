
var Line = {};

Line.Create = (function(){
    var proto = {};

    proto.shaderName = 'shader';
    proto.loc = null;
    proto.rot = null;
    proto.scale = null;

    var vertices = [
        .5, .5, 0,    .5,
        -.5, .5, 0,   0,
        .5, -.5, 0,   .5,
        -.5, -.5, 0,  0
    ];
    var vertices32 = new Float32Array(vertices);

    proto.InitBuffers = function(){
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices32, gl.STATIC_DRAW);
    }

    proto.Draw = function(){
        var MMatrix = mat4.create();

        mat4.translate(MMatrix, MMatrix, this.loc);
        mat4.rotateZ(MMatrix, MMatrix, glMatrix.toRadian(this.rot));
        mat4.scale(MMatrix, MMatrix, this.scale);

        var prog = GetShader(this.shaderName);

        gl.useProgram(prog);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.vertexAttribPointer(prog.vPosLoc, 3, gl.FLOAT, false, 4 * 4, 0);
        gl.vertexAttribPointer(prog.ProgressLoc, 1, gl.FLOAT, false, 4 * 4, 3 * 4);

        gl.uniformMatrix4fv(prog.PVMatrixLoc, false, View.PVMatrix);
        gl.uniformMatrix4fv(prog.MMatrixLoc, false, MMatrix);
        gl.uniform1f(prog.screenHeightLoc, canvas.height);

        var time = Date.now()/1000.0;
        time = time - Math.floor(time);
        gl.uniform1f(prog.timeLoc, time);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    return function(){
        var o = Object.create(proto);

        o.loc = vec3.create();
        o.rot = 0;
        o.scale = vec3.create();
        vec3.set(o.scale, 1, .02, 1);

        o.InitBuffers();
        return o;
    }
})();
