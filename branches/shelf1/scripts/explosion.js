
//////////////////////////////////////////////////////
// Constants
var EXPLOSION_SPEED = 5000*SCALE;
var NUM_PARTICLES = 20;
var PARTICLE_RADIUS = 0.5;
var EXPLOSION_LENGTH = 1*FPS;
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
function Explosion(x, y)
{
	this.explosionParticles = [];
	this.decay_counter = 0;
	this.explode(x, y);
}

//////////////////////////////////////////////////////
Explosion.prototype.explode = function(x, y)
{
	var snd_explosion = new Audio("audio/explosion-02.wav"); // buffers automatically when created
	snd_explosion.volume = SOUND_VOLUME;
	snd_explosion.play();

	var fixDef = new b2FixtureDef;
	fixDef.density = 500;
	fixDef.friction = 0;//Math.random();
	fixDef.restitution = 0;//Math.random();

	for(var i = 0; i < NUM_PARTICLES; i++)
	{
		var a = Math.PI/(NUM_PARTICLES/2)*i;
		var vx = Math.cos(a);
		var vy = Math.sin(a);
		//var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(x+vx, y+vy);
		bodyDef.isBullet = true;
		var body = myWorld.CreateBody(bodyDef);
		fixDef.shape = new b2CircleShape(PARTICLE_RADIUS);
		body.CreateFixture(fixDef);
		body.ApplyImpulse({x:vx*EXPLOSION_SPEED, y:vy*EXPLOSION_SPEED}, {x:x, y:y});
		//body.w = 1.0;
		//body.h = 1.0;
		this.explosionParticles.push(body);
	}
	this.decay_counter = 0;
}

//////////////////////////////////////////////////////
Explosion.prototype.Update = function()
{
	if(this.decay_counter < EXPLOSION_LENGTH)
	{
		this.decay_counter++;
	}
	else
	{
		for(var i = 0; i < this.explosionParticles.length; i++)
		{
			var body = this.explosionParticles[i];
			world.DestroyBody(body);
			this.explosionParticles.splice(this.explosionParticles.indexOf(body), 1);
		}
	}
}

//////////////////////////////////////////////////////
Explosion.prototype.Draw = function(ctx)
{
	ctx.fillStyle = 'red';
	if(this.decay_counter < EXPLOSION_LENGTH)
	{
		for(var i = 0; i < this.explosionParticles.length; i++)
		{
			var body = this.explosionParticles[i];
			var t = body.m_xf;
			ctx.translate(t.position.x, t.position.y)
			ctx.beginPath();
			ctx.arc(0, 0, PARTICLE_RADIUS, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
			ctx.translate(-t.position.x, -t.position.y)
		}
	}
}


//////////////////////////////////////////////////////
function Explosions()
{
	this.explosions = [];
}

//////////////////////////////////////////////////////
Explosions.prototype.AddAt = function(x, y)
{
	var explosion = new Explosion(x, y);
	this.explosions.push(explosion);
}

//////////////////////////////////////////////////////
Explosions.prototype.Update = function()
{
	for(var i = 0; i < this.explosions.length; i++)
	{
		var explosion = this.explosions[i];
		explosion.Update();
	}
}

//////////////////////////////////////////////////////
Explosions.prototype.Draw = function(ctx)
{
	for(var i = 0; i < this.explosions.length; i++)
	{
		var explosion = this.explosions[i];
		explosion.Draw(ctx);
	}
}


