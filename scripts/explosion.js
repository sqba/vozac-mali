
//////////////////////////////////////////////////////
// Constants
var EXPLOSION_SPEED = 700/ppm; //500;
var NUM_PARTICLES = 20;

var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;

var particle_radius = 0.1;//0.1;
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
function Explosion()
{
    this.explosionParticles = [];
    this.decay_counter = 0;
}

//////////////////////////////////////////////////////
Explosion.prototype.Explode = function(x, y)
{
    var snd_explosion = new Audio("audio/explosion-02.wav"); // buffers automatically when created
    snd_explosion.play();

    var fixDef = new b2FixtureDef;
    fixDef.density = 50;
    fixDef.friction = Math.random();
    fixDef.restitution = Math.random();

    for(var i = 0; i < NUM_PARTICLES; i++)
    {
        var a = Math.PI/(NUM_PARTICLES/2)*i;
        var vx = Math.cos(a);// + Math.random();
        var vy = Math.sin(a);// + Math.random();
        //var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x+vx, y+vy);
        bodyDef.isBullet = true;
        var body = myWorld.CreateBody(bodyDef);
        fixDef.shape = new b2CircleShape(particle_radius);
        body.CreateFixture(fixDef);
        body.ApplyImpulse({x:vx*EXPLOSION_SPEED, y:vy*EXPLOSION_SPEED}, {x:x, y:y});
        body.w = 1.0;
        body.h = 1.0;
        this.explosionParticles.push(body);
    }
    this.decay_counter = 0;
}

//////////////////////////////////////////////////////
Explosion.prototype.DrawExplosion = function(ctx)
{
    ctx.fillStyle = 'red';
    if(this.decay_counter < 100)
    {
        for(var i = 0; i < this.explosionParticles.length; i++)
        {
            var body = this.explosionParticles[i];
            var t = body.m_xf;
            ctx.translate(t.position.x, t.position.y)
            ctx.beginPath();
            ctx.arc(0, 0, particle_radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
            ctx.translate(-t.position.x, -t.position.y)
        }
    }
}

//////////////////////////////////////////////////////
Explosion.prototype.Update = function()
{
    if(this.decay_counter < 10)
    {
        this.decay_counter++;
    }
    else
    {
        for(var i = 0; i < this.explosionParticles.length; i++)
        {
            var body = this.explosionParticles[i];
            world.DestroyBody(body);
        }
     }
}


//////////////////////////////////////////////////////
function Explosions()
{
    this.explosions = [];
}

//////////////////////////////////////////////////////
Explosions.prototype.Explode = function(x, y)
{
    var explosion = new Explosion();
    explosion.Explode(x, y);
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


