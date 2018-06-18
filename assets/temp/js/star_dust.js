new p5();

var particles_a = [];
var particles_b = [];
var particles_c = [];
var noiseScale = int(random(500,1000));
var nums = map(noiseScale,500,1000,100,300);
var nums_2 = map(noiseScale,500,1000,50,150);
var noiseScale = int(random(500,1000));

var R,G,B;
var alpha;
var view_mode = false;
var loop_status = true;

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0)
	canvas.style('z-index','-1')
    clear();
    colorSet();
    background(random(30,90),random(60,120),random(90,136));

    for(var i = 0; i < nums; i++) {
        particles_a[i] = new Particle(random(0, width),random(0,height/3),view_mode);
        particles_c[i] = new Particle(random(0, width),random(2*height/3,height),view_mode);
    }


    for (var i = 0; i < nums_2; i++) {
        particles_b[i] = new Particle(random(0, width), random(height / 3, 2 * height / 3), view_mode);
    }

    

    blendMode(ADD)
    alpha = int(random(20,32))
    
}


function draw() {
    noStroke();
    smooth();

    for (var k = 0; k < 5; k++) {

        for (var i = 0; i < nums; i++) {
            var radius = map(i, 0, nums, 1, 2);

            fill(R, G, B, alpha);
            particles_a[i].move();
            particles_a[i].display(radius);
            particles_a[i].checkEdge();

            fill(R, G, B, alpha * random(0.5, 0.7));
            particles_c[i].move();
            particles_c[i].display(radius);
            particles_c[i].checkEdge();
        }

        for (var i = 0; i < nums_2; i++) {
            fill(R, G, B, alpha * random(0.7, 1));
            particles_b[i].move();
            particles_b[i].display(radius);
            particles_b[i].checkEdge();
    }
}
    
}


function colorSet() {
    mode = int(random(1,5));
    if (mode = 1) {
         R = map(random(1),0,1,0,255);
         G = map(random(1),0,1,64,255);
         B = map(random(1),0,1,128,255);
    } else if (mode = 2) {
        base = int(random(64));
        R = 3*base;
        G = 2*base;
        B = base;
    } else if (mode = 3) {
        base = int(random(128));
        R = 1.5*base;
        G = 0.5*base;
        B = base;
    } else {
        base = int(random(32));
        R = 3*base;
        G = 2*base;
        B = base;
    }
    
    alpha = int(random(21,30));
    
}


function Particle(x, y, mode){
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
    this.speed = map(alpha,15,36,10,15);


	this.move = function(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}