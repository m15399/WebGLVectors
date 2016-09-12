
var line1 = Line.Create();

var Particle = (function(){

    var proto = {};

    proto.Create = function(){
        var o = Object.create(proto);
        o.x = 0;
        o.y = -.5;

        o.life = 2;

        var v = 5;
        o.xv = v * (Math.random() - .5);
        o.yv = v / 2 * (Math.random() - .5);
        return o;
    }

    proto.Update = function(dt){
        this.x += this.xv * dt;
        this.y += this.yv * dt;

        this.life -= dt;
    }

    proto.Draw = function(){
        var size = .3;
        Shapes.Square(this.x, this.y, size, size);
    }

    return proto;

})();

var lastUpdateTime = performance.now()-1;
var framesThisSec = 0;

var particles = [];

function CountFps(){
    console.log('FPS: ' + framesThisSec);
    framesThisSec = 0;
}

function MainLoop(timestamp){
    var dt = (timestamp - lastUpdateTime) / 1000.0;
    if(dt > 1.0 / 24){
        Update(dt);
        lastUpdateTime = timestamp;
    }

    Draw();

    framesThisSec++;
    window.requestAnimationFrame(MainLoop);
}

function Update(dt){
    particles.push(Particle.Create());

    for(var i = 0; i < particles.length; i++){
        particles[i].Update(dt);

        if(particles[i].life <= 0){
            var last = particles.pop();
            if(i < particles.length){
                particles[i] = last;
                i--;
            }
        }
    }

}

function Draw(){
    ClearGL();
    Line.ResetBeam();

    // Shapes.Square(-3, 0, 1, 1);
    // Shapes.Square(3, 0, 1, 1);
    var w = Math.sin(performance.now() / 1000);
    var h = 1.3;
    // w = 1;
    if(Math.random() < .35){
        Shapes.Square(0, 2, w, h);
        var d = .03;
        Shapes.Square(d, 2 + d, w, h);
    }
    Line.ResetBeam();

    for(var i = 0; i < particles.length; i++){
        // Line.ResetBeam();
        particles[i].Draw();
    }

    Line.ResetBeam();
    Shapes.Square(0, -2, 2.4, .5);



}

function main(){
    InitShaders();

    window.setInterval(CountFps, 1000);

    MainLoop(performance.now());
}

(function(){ main(); })();
