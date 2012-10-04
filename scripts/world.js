
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


//////////////////////////////////////////////////////
var myCar = new Car();
var myExplosions = new Explosions();
var myBombs = new Bombs;
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
$(document).keydown(function onKeyDown(e)
{
    if(32 == e.which)
    {
        StartPause();
    }
    else
        myCar.onKeyDown(e);
});

$(document).keyup(function onKeyUp(e){
    myCar.onKeyUp(e);
});

$(canvas).click(function (e)
{
    var o = $(canvas).offset();
    var x = (e.pageX-o.left);
    if(!DEBUG)
        var y = (canvas.height-e.pageY+o.top);
    else
        var y = (e.pageY-o.top);
    //myExplosions.AddAt(x/ppm, y/ppm);
    myBombs.AddAt(x/ppm, y/ppm);
});
//////////////////////////////////////////////////////


var runIntervalId = null;
StartPause();
//////////////////////////////////////////////////////
function StartPause()
{
    if( runIntervalId )
    {
        clearInterval(runIntervalId);
        runIntervalId = null;
    }
    else
    {
        runIntervalId = window.setInterval(update, 1000 / 60);
    }
}
function update()
{
    //world.Step(1 / 30, 10, 10);
    myWorld.Step(1/30, 8);

    myCar.Update();
    myExplosions.Update();
//    myBombs.Update();

//    world.ClearForces();

    if(!DEBUG)
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, c_width, c_height);

        myExplosions.Draw(ctx);
        //DrawCar(ctx);
    }
    else
    {
        world.DrawDebugData();
    }
}
//////////////////////////////////////////////////////



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


createFrame();

// Obstacles - test
createBox(myWorld, 8, 8, 2, 2, false, 'static');
createBox(myWorld, c_width-8-2, 8, 2, 2, false, 'static');
createBox(myWorld, 8, c_height-8, 2, 2, false, 'static');
createBox(myWorld, c_width-8-2, c_height-8, 2, 2, false, 'static');


serializeWorld();


