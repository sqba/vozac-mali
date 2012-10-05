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


function degrees_to_radians(deg)
{
	return deg * (Math.PI/180);
}


var SCALE = 10;
var FPS = 30;
var SOUND_VOLUME = 0.3;

var DEBUG=1;


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



/*
//////////////////////////////////////////////////////
// Canvas
var game_canvas = document.getElementById('game_canvas');
var game_context = game_canvas.getContext('2d');
var ppm = 20;
var c_width = game_canvas.width/ppm;
var c_height = game_context.height/ppm;
game_context.setTransform(ppm, 0, 0, -ppm, 0, game_context.height);  
//////////////////////////////////////////////////////
*/


//////////////////////////////////////////////////////
// debug draw
var debug_canvas = document.getElementById('debug_canvas');
var debug_context = debug_canvas.getContext('2d');
var c_width = debug_canvas.width;
var c_height = debug_canvas.height;
var debug_scale = 1;

if(DEBUG)
{
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(debug_context);
    debugDraw.SetDrawScale(debug_scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
//    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_centerOfMassBit);
    myWorld.SetDebugDraw(debugDraw);
}
//////////////////////////////////////////////////////

