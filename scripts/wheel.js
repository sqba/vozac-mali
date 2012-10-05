
//////////////////////////////////////////////////////
function Wheel(pos, chassis, steer, power)
{
	this.chassis = chassis;
	this.steer = steer;
	this.power = power;

	var bodyDef = new b2BodyDef();
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position = chassis.GetTransform().position.Copy();
	bodyDef.position.Add(pos);
	this.body = myWorld.CreateBody(bodyDef);

	var fixDef = new b2FixtureDef;
	fixDef.density = 1 / SCALE;
	fixDef.friction = 0.9;
	fixDef.restitution = 0.1;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.type = b2Body.b2_dynamicBody;
	fixDef.shape.SetAsBox(0.2*SCALE,0.5*SCALE);
	this.body.CreateFixture(fixDef);

	this.body.SetUserData('wheel');

	if( steer )
	{
		this.joint = this.createRevoluteJoint(chassis);
	}
	else
	{
		this.createPrismaticJoint(chassis);
		// calling createRevoluteJoint cause interesting effect of broken wheels
	}
}

//////////////////////////////////////////////////////
//This function applies a "friction" in a direction orthogonal to the body's axis.
Wheel.prototype.killOrthogonalVelocity = function()
{
	var localPoint = new b2Vec2(0,0);
	var velocity = this.body.GetLinearVelocityFromLocalPoint(localPoint);

	var sidewaysAxis = this.body.GetTransform().R.col2.Copy();
	sidewaysAxis.Multiply(b2Math.Dot(velocity, sidewaysAxis))

	this.body.SetLinearVelocity(sidewaysAxis);
}

Wheel.prototype.killLateralVelocity = function()
{
	// Killing lateral velocity
	var currentRightNormal = this.body.GetWorldVector( new b2Vec2(1,0) );
	var lateralVelocity = currentRightNormal.Multiply(b2Math.Dot( currentRightNormal, this.body.GetLinearVelocity() ));

	var impulse = this.body.GetMass() * -lateralVelocity;
	this.body.ApplyImpulse( impulse, this.body.GetWorldCenter() );
}
/*
Wheel.prototype.getLateralVelocity = function()
{
	var currentRightNormal = this.body.GetWorldVector( new b2Vec2(1,0) );
	var lateralVelocity = b2Math.Dot( currentRightNormal, this.body.GetLinearVelocity() ) * currentRightNormal;
	return lateralVelocity;
}
Wheel.prototype.getForwardVelocity = function()
{
	var currentForwardNormal = this.body.GetWorldVector( new b2Vec2(0,1) );
	var forwardVelocity = b2Math.Dot( currentForwardNormal, this.body.GetLinearVelocity() ); * currentForwardNormal;
	return forwardVelocity;
}
*/
//////////////////////////////////////////////////////
Wheel.prototype.Update = function(engineSpeed, steeringAngle)
{
	this.killOrthogonalVelocity();

	if( this.power )
	{
		// Driving
		var direction = this.body.GetTransform().R.col2.Copy();
		direction.Multiply(engineSpeed);
		//this.body.ApplyForce(direction, this.body.GetPosition());
		this.body.SetLinearVelocity(direction);
	}

	if( this.steer )
	{
		// Steering
		var mspeed = steeringAngle - this.joint.GetJointAngle();
		this.joint.SetMotorSpeed(mspeed * STEER_SPEED);
	}

//	console.log("Wheel velocity: " + this.getForwardVelocity());
}

//////////////////////////////////////////////////////
Wheel.prototype.createRevoluteJoint = function(chassis, motor)
{
	var jointDef = new b2RevoluteJointDef();
	jointDef.Initialize(chassis, this.body, this.body.GetWorldCenter());
//	jointDef.enableLimit = true;
//	jointDef.lowerAngle = degrees_to_radians(-45);
//	jointDef.upperAngle =  degrees_to_radians(45);

	jointDef.enableMotor = true;
	jointDef.maxMotorTorque = 100;

	return myWorld.CreateJoint(jointDef);
}

//////////////////////////////////////////////////////
Wheel.prototype.createPrismaticJoint = function(chassis, motor)
{
	var jointDef = new b2PrismaticJointDef();
	jointDef.Initialize(chassis, this.body, this.body.GetWorldCenter(), new b2Vec2(1,0));
	jointDef.enableLimit = true;
	jointDef.lowerTranslation = jointDef.upperTranslation = 0;

	return myWorld.CreateJoint(jointDef);
}

