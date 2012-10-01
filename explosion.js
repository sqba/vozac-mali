var EXPLOSION_SPEED = 500; //500;
var explosionParticles = [];

var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;

var particle_radius = 0.1;//0.1;


function explode(x, y)
{
    var fixDef = new b2FixtureDef;
    fixDef.density = 50;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.0;

    for(var i = 0; i < 40; i++)
    {
        var a = Math.PI/5*i;
        var vx = Math.cos(a);
        var vy = Math.sin(a);
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
        explosionParticles.push(body);
    }
    var snd_explosion = new Audio("audio/explosion-02.wav"); // buffers automatically when created
    snd_explosion.play();
}


function DrawExplosion(ctx)
{
    ctx.fillStyle = 'red';
    for(var i = 0; i < explosionParticles.length; i++)
    {
        var body = explosionParticles[i];
        var t = body.m_xf;
        ctx.translate(t.position.x, t.position.y)
        ctx.beginPath();
        ctx.arc(0, 0, particle_radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
        ctx.translate(-t.position.x, -t.position.y)
    }
}


$(canvas).click(function (e)
{
    var o = $(canvas).offset();
    var x = (e.pageX-o.left);
    if(!DEBUG)
        var y = (canvas.height-e.pageY+o.top);
    else
        var y = (e.pageY-o.top);
    explode(x/ppm, y/ppm);
});

