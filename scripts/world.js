
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


var myCar = new Car();
var myExplosions = new Explosions();

$(document).keydown(function onKeyDown(e)
{
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
    myExplosions.Explode(x/ppm, y/ppm);
});


function update()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c_width, c_height);

    //world.Step(1 / 30, 10, 10);
    myWorld.Step(1/30, 8);

    myCar.Update();
    myExplosions.Update();

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





