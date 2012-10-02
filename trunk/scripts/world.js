
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
var b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
var b2Math = Box2D.Common.Math.b2Math;

var DEBUG=1;

//////////////////////////////////////////////////////
// Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ppm = 20;
var c_width = canvas.width/ppm;
var c_height = canvas.height/ppm;
if(!DEBUG)
    ctx.setTransform(ppm, 0, 0, -ppm, 0, canvas.height);  
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// World
var myWorld;
var gravity = new b2Vec2(0.0, 0.0);
myWorld = new b2World(gravity , true);
window.world = myWorld;
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// Fixture and body
var fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.5;
fixDef.restitution = 0.2;
var bodyDef = new b2BodyDef;
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// debug draw
if(DEBUG)
{
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(ppm);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
//    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_centerOfMassBit);
    myWorld.SetDebugDraw(debugDraw);
}
//////////////////////////////////////////////////////


function update()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c_width, c_height);

    //world.Step(1 / 30, 10, 10);
    myWorld.Step(1/30, 8);

    update_car();
    update_explosions();

    world.DrawDebugData();

//    world.ClearForces();

    if(!DEBUG)
    {
        DrawExplosion(ctx);
        //DrawCar(ctx);
    }
};


window.setInterval(update, 1000 / 60);


createFrame();

// Obstacles - test
createBox(myWorld, 8, 8, 2, 2, false);
createBox(myWorld, c_width-8-2, 8, 2, 2, false);
createBox(myWorld, 8, c_height-8, 2, 2, false);
createBox(myWorld, c_width-8-2, c_height-8, 2, 2, false);





