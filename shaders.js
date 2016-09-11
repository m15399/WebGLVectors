
var Shaders = {};

function InitShaders(){
    Shaders['shader'] = CreateShaderProgram('shader');
}

function GetShader(name){
    return Shaders[name];
}

function CreateShaderProgram(name){

    function CompileShader(id){
        var shaderScript = document.getElementById(id);
        if(!shaderScript){
            console.log('Couldn\'t find shader: ' + id);
            return null;
        }

        var source = shaderScript.text;
        var type;

        if(shaderScript.type == 'x-shader/x-fragment'){
            type = gl.FRAGMENT_SHADER;
        } else if (shaderScript.type == 'x-shader/x-vertex') {
            type = gl.VERTEX_SHADER;
        } else {
            console.log('Couldn\'t identify type of shader: ' + id);
            return null;
        }

        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);

        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }


    var vert = CompileShader(name + '-vs');
    var frag = CompileShader(name + '-fs');

    var prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);

    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
        alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
    }

    gl.useProgram(prog);

    prog.vPosLoc = gl.getAttribLocation(prog, 'vPos');
    gl.enableVertexAttribArray(prog.vPosLoc);

    prog.ProgressLoc = gl.getAttribLocation(prog, 'progress');
    gl.enableVertexAttribArray(prog.ProgressLoc);

    prog.PVMatrixLoc = gl.getUniformLocation(prog, 'PVMatrix');
    prog.MMatrixLoc = gl.getUniformLocation(prog, 'MMatrix');
    prog.timeLoc = gl.getUniformLocation(prog, 'time');
    prog.lineDistLoc = gl.getUniformLocation(prog, 'lineDist');

    return prog;
}
