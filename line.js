
var Line = (function(){

    var _Line = {};

    _Line.lineWidth = .03;
    _Line.unitsPerLine = 8;
    _Line.speed = 50; // 6 / 4

    var proto = {};

    proto.shaderName = 'shader';
    proto.loc = null;
    proto.rot = null;
    proto.scale = null;

    var vertices = [
        .5, .5, 0,    1,
        -.5, .5, 0,   0,
        .5, -.5, 0,   1,
        -.5, -.5, 0,  0
    ];
    var vertices32 = new Float32Array(vertices);

    _Line.Create = function(){
        var o = Object.create(proto);

        o.loc = vec3.fromValues(0, 0, 0);
        o.rot = 0;
        o.scale = vec3.fromValues(1, 1, 1);

        o.InitBuffers();
        return o;
    }

    proto.InitBuffers = function(){
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices32, gl.STATIC_DRAW);
    }

    var lineDist = 0;

    _Line.ResetBeam = function(){
        lineDist = 0;
        Line.time = performance.now() / 1000.0;
    }

    proto.Draw = function(){
        var MMatrix = mat4.create();

        mat4.translate(MMatrix, MMatrix, this.loc);
        mat4.rotateZ(MMatrix, MMatrix, glMatrix.toRadian(this.rot));

        var newScale = vec3.fromValues(
            this.scale[0], this.scale[1] * Line.lineWidth, this.scale[2]
        );

        mat4.scale(MMatrix, MMatrix, newScale);

        var prog = GetShader(this.shaderName);

        gl.useProgram(prog);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.vertexAttribPointer(prog.vPosLoc, 3, gl.FLOAT, false, 4 * 4, 0);
        gl.vertexAttribPointer(prog.ProgressLoc, 1, gl.FLOAT, false, 4 * 4, 3 * 4);

        gl.uniformMatrix4fv(prog.PVMatrixLoc, false, View.PVMatrix);
        gl.uniformMatrix4fv(prog.MMatrixLoc, false, MMatrix);

        var lineLen = this.scale[0] / Line.unitsPerLine;
        var startTime = Line.time * (Line.speed / Line.unitsPerLine) + lineDist;
        var endTime = startTime - lineLen;

        gl.uniform1f(prog.startTimeLoc, startTime);
        gl.uniform1f(prog.endTimeLoc, endTime);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        lineDist -= lineLen;
    }

    return _Line;
})();
