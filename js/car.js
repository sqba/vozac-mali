
//////////////////////////////////////////////////////
// Variables
var MAX_STEER_ANGLE = Math.PI/3;
var STEER_SPEED = 1.5;
var HORSEPOWERS = 200;
var CAR_STARTING_POS = new b2Vec2(c_width/2,c_height/2);

var leftRearWheelPosition = new b2Vec2(-1.2,1.90);
var rightRearWheelPosition = new b2Vec2(1.2,1.9);
var leftFrontWheelPosition = new b2Vec2(-1.2,-1.9);
var rightFrontWheelPosition = new b2Vec2(1.2,-1.9);
 
var engineSpeed = 0;
var steeringAngle = 0;

var chassis;
var leftWheel;
var rightWheel;
var leftRearWheel;
var rightRearWheel;
var leftJoint;
var rightJoint;


var snd_engine_start = new Audio("audio/engine.wav"); // buffers automatically when created
var snd_engine_gas = new Audio("audio/burnout.wav"); // buffers automatically when created
snd_engine_start.play();


//////////////////////////////////////////////////////
var KEY_LEFT    = 37;
var KEY_UP      = 38;
var KEY_RIGHT   = 39;
var KEY_DOWN    = 40;
$(document).keydown(function onKeyDown(e)
{
    switch(e.which)
    {
        case KEY_LEFT:
            steeringAngle = -MAX_STEER_ANGLE;
		    break;
        case KEY_UP:
		    //chassis.WakeUp();
            chassis.SetAwake(true);
		    engineSpeed = -HORSEPOWERS;
		    break;
        case KEY_RIGHT:
		    steeringAngle = MAX_STEER_ANGLE;
		    break;
        case KEY_DOWN:
            snd_engine_gas.play();
		    engineSpeed = HORSEPOWERS;
		    break;
    }
});
 
$(document).keyup(function keyReleased_handler(e){
    switch(e.which)
    {
        case KEY_LEFT:
        case KEY_RIGHT:
    		steeringAngle = 0;
		    break;
        case KEY_UP:
        case KEY_DOWN:
    		engineSpeed = 0;
            snd_engine_gas.pause();
		    break;
    }
});
//////////////////////////////////////////////////////



function createChassis()
{
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 1;
    bodyDef.angularDamping = 10;
    bodyDef.position = CAR_STARTING_POS.Copy()

    var body = myWorld.CreateBody(bodyDef);
/*
    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;
*/
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.type = b2Body.b2_dynamicBody;
    fixDef.shape.density = 1;
    fixDef.shape.SetAsBox(1.5,2.5);
    body.CreateFixture(fixDef);
//    body.SetMassFromShapes();

    return body;
}

function createWheel(car, pos)
{
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position = CAR_STARTING_POS.Copy();
    bodyDef.position.Add(pos);

    var body = myWorld.CreateBody(bodyDef);
/*
    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;
*/
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.type = b2Body.b2_dynamicBody;
    fixDef.shape.density = 1;
    fixDef.shape.SetAsBox(0.2,0.5);
    body.CreateFixture(fixDef);
//    body.SetMassFromShapes();

    return body;
}

function createRevoluteJoint(car, wheel, motor)
{
    var jointDef = new b2RevoluteJointDef();
    jointDef.Initialize(car, wheel, wheel.GetWorldCenter());
    jointDef.enableMotor = true;
    jointDef.maxMotorTorque = 100;
    joint = myWorld.CreateJoint(jointDef);
    return joint;
}

function createPrismaticJoint(car, wheel, motor)
{
    var jointDef = new b2PrismaticJointDef();
    jointDef.Initialize(car, wheel, wheel.GetWorldCenter(), new b2Vec2(1,0));
    jointDef.enableLimit = true;
    jointDef.lowerTranslation = jointDef.upperTranslation = 0;
    joint = myWorld.CreateJoint(jointDef);
    return joint;
}

function createCar()
{ 
    chassis = createChassis();

    leftWheel = createWheel(chassis, leftFrontWheelPosition );
    leftJoint = createRevoluteJoint(chassis, leftWheel);

    rightWheel = createWheel(chassis, rightFrontWheelPosition );
    rightJoint = createRevoluteJoint(chassis, rightWheel);

    leftRearWheel = createWheel(chassis, leftRearWheelPosition );
    createPrismaticJoint(chassis, leftRearWheel); // calling createRevoluteJoint cause interesting effect of broken wheels

    rightRearWheel = createWheel(chassis, rightRearWheelPosition );
    createPrismaticJoint(chassis, rightRearWheel); // calling createRevoluteJoint cause interesting effect of broken wheels
}


//This function applies a "friction" in a direction orthogonal to the body's axis.
function killOrthogonalVelocity(targetBody)
{
	var localPoint = new b2Vec2(0,0);
	var velocity = targetBody.GetLinearVelocityFromLocalPoint(localPoint);
 
	var sidewaysAxis = targetBody.GetTransform().R.col2.Copy();
	sidewaysAxis.Multiply(b2Math.Dot(velocity,sidewaysAxis))

	targetBody.SetLinearVelocity(sidewaysAxis);
}

function update_car()
{
	//killOrthogonalVelocity( chassis );
	killOrthogonalVelocity( leftWheel );
	killOrthogonalVelocity( rightWheel );
	killOrthogonalVelocity( leftRearWheel );
	killOrthogonalVelocity( rightRearWheel );

	//Driving
	var ldirection = leftWheel.GetTransform().R.col2.Copy();
	ldirection.Multiply(engineSpeed/ppm);
	//leftWheel.ApplyForce(ldirection, leftWheel.GetPosition());
    leftWheel.SetLinearVelocity(ldirection);
	var rdirection = rightWheel.GetTransform().R.col2.Copy()
	rdirection.Multiply(engineSpeed/ppm);
	//rightWheel.ApplyForce(rdirection, rightWheel.GetPosition());
    rightWheel.SetLinearVelocity(rdirection);

	//Steering
	var mspeedl = steeringAngle - leftJoint.GetJointAngle();
	leftJoint.SetMotorSpeed(mspeedl * STEER_SPEED);
	var mspeedr = steeringAngle - rightJoint.GetJointAngle();
	rightJoint.SetMotorSpeed(mspeedr * STEER_SPEED);

    if(engineSpeed != 0)
        snd_engine_gas.play();

//    console.log("mspeedl: "+mspeedl);
//    console.log("mspeedr: "+mspeedr);
//    console.log("steeringAngle: "+steeringAngle);
//    console.log("engineSpeed: "+engineSpeed);
}

createCar();


