
//////////////////////////////////////////////////////
// Constants
var MAX_STEER_ANGLE = Math.PI/3;
var STEER_SPEED = 1.5;
var HORSEPOWERS = 200;
var CAR_STARTING_POS = new b2Vec2(c_width/2,c_height/2);

var KEY_LEFT    = 37;
var KEY_UP      = 38;
var KEY_RIGHT   = 39;
var KEY_DOWN    = 40;
var SPACE_BAR   = 32;

var leftRearWheelPosition = new b2Vec2(-1.4,1.90);
var rightRearWheelPosition = new b2Vec2(1.4,1.9);
var leftFrontWheelPosition = new b2Vec2(-1.4,-1.9);
var rightFrontWheelPosition = new b2Vec2(1.4,-1.9);
//////////////////////////////////////////////////////


function Car()
{
    this.chassis = null;
    this.leftWheel = null;
    this.rightWheel = null;
    this.leftRearWheel = null;
    this.rightRearWheel = null;
    this.leftJoint = null;
    this.rightJoint = null;

    this.engineSpeed = 0;
    this.steeringAngle = 0;

    this.snd_engine_start = new Audio("audio/engine.wav");
    this.snd_engine_start.volume = 0.1;
    this.snd_engine_gas = new Audio("audio/burnout.wav");
    this.snd_engine_gas.volume = 0.1;

    this.createCar();

    this.snd_engine_start.play();
}

//////////////////////////////////////////////////////
Car.prototype.onKeyDown = function(e)
{
    switch(e.which)
    {
        case KEY_LEFT:
            this.steeringAngle = -MAX_STEER_ANGLE;
		    break;
        case KEY_UP:
		    //chassis.WakeUp();
            this.chassis.SetAwake(true);
		    this.engineSpeed = -HORSEPOWERS;
		    break;
        case KEY_RIGHT:
		    this.steeringAngle = MAX_STEER_ANGLE;
		    break;
        case KEY_DOWN:
            this.snd_engine_gas.play();
		    this.engineSpeed = HORSEPOWERS;
		    break;
            break;
    }
};

//////////////////////////////////////////////////////
Car.prototype.onKeyUp = function(e)
{
    switch(e.which)
    {
        case KEY_LEFT:
        case KEY_RIGHT:
    		this.steeringAngle = 0;
		    break;
        case KEY_UP:
        case KEY_DOWN:
    		this.engineSpeed = 0;
            this.snd_engine_gas.pause();
		    break;
        case SPACE_BAR:
            {
                var pos = this.chassis.GetTransform().position;
                console.log(pos);
                myBombs.AddAt(pos.x, pos.y /*,1000*/);
            }
    }
}

//////////////////////////////////////////////////////
Car.prototype.createChassis = function()
{
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 1;
    bodyDef.angularDamping = 10;
    bodyDef.position = CAR_STARTING_POS.Copy()

    var body = myWorld.CreateBody(bodyDef);

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    fixDef.shape = new b2PolygonShape();
    fixDef.shape.type = b2Body.b2_dynamicBody;
    fixDef.shape.density = 1;
    fixDef.shape.SetAsBox(1.5,2.5);
    body.CreateFixture(fixDef);
//    body.SetMassFromShapes();

    body.SetUserData('chassis');

    return body;
}

//////////////////////////////////////////////////////
Car.prototype.createWheel = function(car, pos)
{
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position = CAR_STARTING_POS.Copy();
    bodyDef.position.Add(pos);

    var body = myWorld.CreateBody(bodyDef);

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    fixDef.shape = new b2PolygonShape();
    fixDef.shape.type = b2Body.b2_dynamicBody;
    fixDef.shape.density = 1;
    fixDef.shape.SetAsBox(0.2,0.5);
    body.CreateFixture(fixDef);
//    body.SetMassFromShapes();

    body.SetUserData('wheel');

    return body;
}

//////////////////////////////////////////////////////
Car.prototype.createRevoluteJoint = function(car, wheel, motor)
{
    var jointDef = new b2RevoluteJointDef();
    jointDef.Initialize(car, wheel, wheel.GetWorldCenter());
    jointDef.enableMotor = true;
    jointDef.maxMotorTorque = 100;
    joint = myWorld.CreateJoint(jointDef);
    return joint;
}

//////////////////////////////////////////////////////
Car.prototype.createPrismaticJoint = function(car, wheel, motor)
{
    var jointDef = new b2PrismaticJointDef();
    jointDef.Initialize(car, wheel, wheel.GetWorldCenter(), new b2Vec2(1,0));
    jointDef.enableLimit = true;
    jointDef.lowerTranslation = jointDef.upperTranslation = 0;
    joint = myWorld.CreateJoint(jointDef);
    return joint;
}

//////////////////////////////////////////////////////
Car.prototype.createCar = function()
{ 
    this.chassis = this.createChassis();

    this.leftWheel = this.createWheel(this.chassis, leftFrontWheelPosition );
    this.leftJoint = this.createRevoluteJoint(this.chassis, this.leftWheel);

    this.rightWheel = this.createWheel(this.chassis, rightFrontWheelPosition );
    this.rightJoint = this.createRevoluteJoint(this.chassis, this.rightWheel);

    this.leftRearWheel = this.createWheel(this.chassis, leftRearWheelPosition );
    this.createPrismaticJoint(this.chassis, this.leftRearWheel); // calling createRevoluteJoint cause interesting effect of broken wheels

    this.rightRearWheel = this.createWheel(this.chassis, rightRearWheelPosition );
    this.createPrismaticJoint(this.chassis, this.rightRearWheel); // calling createRevoluteJoint cause interesting effect of broken wheels
}

//////////////////////////////////////////////////////
//This function applies a "friction" in a direction orthogonal to the body's axis.
Car.prototype.killOrthogonalVelocity = function(targetBody)
{
	var localPoint = new b2Vec2(0,0);
	var velocity = targetBody.GetLinearVelocityFromLocalPoint(localPoint);
 
	var sidewaysAxis = targetBody.GetTransform().R.col2.Copy();
	sidewaysAxis.Multiply(b2Math.Dot(velocity,sidewaysAxis))

	targetBody.SetLinearVelocity(sidewaysAxis);
}

//////////////////////////////////////////////////////
Car.prototype.Update = function()
{
	//killOrthogonalVelocity( chassis );
	this.killOrthogonalVelocity( this.leftWheel );
	this.killOrthogonalVelocity( this.rightWheel );
	this.killOrthogonalVelocity( this.leftRearWheel );
	this.killOrthogonalVelocity( this.rightRearWheel );

	//Driving
	var ldirection = this.leftWheel.GetTransform().R.col2.Copy();
	ldirection.Multiply(this.engineSpeed/ppm);
	//leftWheel.ApplyForce(ldirection, leftWheel.GetPosition());
    this.leftWheel.SetLinearVelocity(ldirection);
	var rdirection = this.rightWheel.GetTransform().R.col2.Copy()
	rdirection.Multiply(this.engineSpeed/ppm);
	//rightWheel.ApplyForce(rdirection, rightWheel.GetPosition());
    this.rightWheel.SetLinearVelocity(rdirection);

	//Steering
	var mspeedl = this.steeringAngle - this.leftJoint.GetJointAngle();
	this.leftJoint.SetMotorSpeed(mspeedl * STEER_SPEED);
	var mspeedr = this.steeringAngle - this.rightJoint.GetJointAngle();
	this.rightJoint.SetMotorSpeed(mspeedr * STEER_SPEED);

    if(this.engineSpeed != 0)
        this.snd_engine_gas.play();

//    console.log("mspeedl: "+mspeedl);
//    console.log("mspeedr: "+mspeedr);
//    console.log("steeringAngle: "+steeringAngle);
//    console.log("engineSpeed: "+engineSpeed);
}

