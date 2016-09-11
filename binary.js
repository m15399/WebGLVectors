
ArrayBuffer.prototype.toBase64 = function(){
    var ints = new Uint8Array(this);
    var s = '';
    for(var i = 0; i < ints.length; i++){
        s += String.fromCharCode(ints[i]);
    }
    return btoa(s);
}

ArrayBuffer.fromBase64 = function(b64){
    var s = atob(b64);
    var ints = new Uint8Array(s.length);
    for(var i = 0; i < s.length; i++){
        ints[i] = s.charCodeAt(i);
    }
    return ints.buffer;
}

Float32Array.prototype.toBase64 = function(){
    return this.buffer.toBase64();
}

Float32Array.fromBase64 = function(b64){
    var floats = new Float32Array(ArrayBuffer.fromBase64(b64));
    return floats;
}
