/*
function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	createGround(world);
	createBox(world, 0, 125, 10, 250);
	createBox(world, 500, 125, 10, 250);
	return world;
}

function createGround(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(1000, 50);
	groundSd.restitution = 0.2;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(-500, 340);
	return world.CreateBody(groundBd)
}

function createBall(world, x, y, r)
{
	var ballSd = new b2CircleDef();
	ballSd.density = 1.0;
	ballSd.radius = 20;
	ballSd.restitution = 1.0;
	ballSd.friction = 0;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
}
*/
function createFrame()
{
    var line_width = 2/ppm;

    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(c_width, line_width);

    // bottom
    bodyDef.position.Set(0, c_height - line_width);
    myWorld.CreateBody(bodyDef).CreateFixture(fixDef);

    // top
    bodyDef.position.Set(0, line_width);
    myWorld.CreateBody(bodyDef).CreateFixture(fixDef);

    fixDef.shape.SetAsBox(line_width, c_height);

    // left
    bodyDef.position.Set(0, 0);
    myWorld.CreateBody(bodyDef).CreateFixture(fixDef);

    // right
    bodyDef.position.Set(c_width - line_width, 0);
    myWorld.CreateBody(bodyDef).CreateFixture(fixDef);
}

function createBox(world, x, y, width, height, fixed)
{
//    console.log("createBox("+x+", "+y+", "+width+", "+height+")");

    //bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(width/2, height/2);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    world.CreateBody(bodyDef).CreateFixture(fixDef);
}

