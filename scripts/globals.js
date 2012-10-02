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



