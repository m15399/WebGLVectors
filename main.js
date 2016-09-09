
var line1 = Line.Create();

var Particle = (function(){

    var proto = {};

    proto.Create = function(){
        var o = Object.create(proto);
        o.x = o.y = 0;

        o.life = 1;

        var v = 10;
        o.xv = v * (Math.random() - .5);
        o.yv = v * (Math.random() - .5);
        return o;
    }

    proto.Update = function(dt){
        this.x += this.xv * dt;
        this.y += this.yv * dt;

        this.life -= dt;
    }

    proto.Draw = function(){
        Shapes.Square(this.x, this.y);
    }

    return proto;

})();

var lastTime = performance.now() - 1;
var framesThisSec = 0;

var particles = [];

function CountFps(){
    console.log('FPS: ' + framesThisSec);
    framesThisSec = 0;
}

function Update(timestamp){
    var dt = (timestamp - lastTime) / 1000.0;
    lastTime = timestamp;

    ClearGL();

    particles.push(Particle.Create());

    for(var i = 0; i < particles.length; i++){
        particles[i].Update(dt);
        particles[i].Draw();

        if(particles[i].life <= 0){
            var last = particles.pop();
            if(i < particles.length){
                particles[i] = last;
                i--;
            }
        }
    }


    framesThisSec++;
    window.requestAnimationFrame(Update);
}

function main(){
    InitShaders();

    window.setInterval(CountFps, 1000);

    Update(performance.now());
}

(function(){ main(); })();
