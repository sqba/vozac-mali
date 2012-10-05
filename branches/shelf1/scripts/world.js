function createFrame()
{
	var line_width = 2;

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


createFrame();

// Obstacles - test
createBox(myWorld, 80, 80, 20, 20, false, 'static');
createBox(myWorld, c_width-80-20, 80, 20, 20, false, 'static');
createBox(myWorld, 80, c_height-80, 20, 20, false, 'static');
createBox(myWorld, c_width-80-20, c_height-80, 20, 20, false, 'static');


serializeWorld();

