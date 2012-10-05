
//////////////////////////////////////////////////////
// Constants
var MAX_STEER_ANGLE = degrees_to_radians(50);
var STEER_SPEED = 5.5;
var HORSEPOWERS = 200;

var KEY_LEFT    = 37;
var KEY_UP      = 38;
var KEY_RIGHT   = 39;
var KEY_DOWN    = 40;
var SPACE_BAR   = 32;

var CAR_STARTING_POS = new b2Vec2(c_width/2,c_height/2);
var LEFT_FRONT_WHEEL_POSITION = new b2Vec2(-1.4*SCALE,-1.9*SCALE);
var RIGHT_FRONT_WHEEL_POSITION = new b2Vec2(1.4*SCALE,-1.9*SCALE);
var LEFT_REAR_WHEEL_POSITION = new b2Vec2(-1.4*SCALE,1.90*SCALE);
var RIGHT_REAR_WHEEL_POSITION = new b2Vec2(1.4*SCALE,1.9*SCALE);
//////////////////////////////////////////////////////






//////////////////////////////////////////////////////
function Car()
{
	this.body = null;
	this.wheels = [];

	this.engineSpeed = 0;
	this.steeringAngle = 0;

	var snd_engine_start = new Audio("audio/engine.wav");
	snd_engine_start.volume = SOUND_VOLUME;

	this.snd_engine_gas = new Audio("audio/burnout.wav");
	this.snd_engine_gas.volume = SOUND_VOLUME;

	this.body = this.createBody();

	this.wheels.push(new Wheel(LEFT_FRONT_WHEEL_POSITION, this.body, true, true));
	this.wheels.push(new Wheel(RIGHT_FRONT_WHEEL_POSITION, this.body, true, true));
	this.wheels.push(new Wheel(LEFT_REAR_WHEEL_POSITION, this.body, false, false));
	this.wheels.push(new Wheel(RIGHT_REAR_WHEEL_POSITION, this.body, false, false));

	snd_engine_start.play();
}

//////////////////////////////////////////////////////
Car.prototype.createBody = function()
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.linearDamping = 0.1;
	bodyDef.angularDamping = 0.1;
	bodyDef.position = CAR_STARTING_POS.Copy()

	var body = myWorld.CreateBody(bodyDef);

	var fixDef = new b2FixtureDef;
	fixDef.density = 1 / SCALE;
	fixDef.friction = 1.1;
	fixDef.restitution = 0.1;

	fixDef.shape = new b2PolygonShape();
	fixDef.shape.type = b2Body.b2_dynamicBody;
	fixDef.shape.SetAsBox(1.5*SCALE,2.5*SCALE);
	body.CreateFixture(fixDef);

	body.SetUserData('car');

	return body;
}

//////////////////////////////////////////////////////
Car.prototype.Update = function()
{
	for(var i = 0; i < this.wheels.length; i++)
	{
		var wheel = this.wheels[i];
		wheel.Update(this.engineSpeed, this.steeringAngle);
	}

	if(this.engineSpeed != 0)
		this.snd_engine_gas.play();
}

//////////////////////////////////////////////////////
Car.prototype.dropBomb = function()
{
	var pos = this.body.GetTransform().position;
	myBombs.AddAt(pos.x, pos.y /*,1000*/);
}

//////////////////////////////////////////////////////
Car.prototype.gas = function()
{
	//body.WakeUp();
	this.body.SetAwake(true);
	this.engineSpeed = -HORSEPOWERS;
}

//////////////////////////////////////////////////////
Car.prototype.brake = function()
{
	this.body.SetAwake(false);
	this.snd_engine_gas.play();
	this.engineSpeed = HORSEPOWERS;
}

//////////////////////////////////////////////////////
Car.prototype.turnLeft = function()
{
	this.steeringAngle = -MAX_STEER_ANGLE;
}

//////////////////////////////////////////////////////
Car.prototype.turnRight = function()
{
	this.steeringAngle = MAX_STEER_ANGLE;
}

//////////////////////////////////////////////////////
Car.prototype.onKeyDown = function(e)
{
	switch(e.which)
	{
		case KEY_LEFT:
			this.turnLeft();
			break;
		case KEY_UP:
			this.gas();
			break;
		case KEY_RIGHT:
			this.turnRight();
			break;
		case KEY_DOWN:
			this.brake();
			break;
	}
};

//////////////////////////////////////////////////////
Car.prototype.onKeyUp = function(e)
{
//	console.log(e.which);
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
			this.dropBomb();
			break;
	}
}

