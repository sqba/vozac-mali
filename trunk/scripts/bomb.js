
//////////////////////////////////////////////////////
// Constants
var BOMB_RADIUS = 1;
var TIMER_INTERVAL = 3 * 1000;
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
function Bomb(x, y)
{
    this.x = x;
    this.y = y;
    this.body = null;
    this.create(x, y);
    setTimeout(this.explode, TIMER_INTERVAL);

}

Bomb.prototype.create = function(x, y)
{
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position = new b2Vec2(x, y);
    //bodyDef.position.Add(pos);

    body = myWorld.CreateBody(bodyDef);

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    fixDef.shape = new b2CircleShape(BOMB_RADIUS);
    fixDef.shape.type = b2Body.b2_dynamicBody;
    fixDef.shape.density = 1;
    //fixDef.shape.SetAsBox(1,1);
    body.CreateFixture(fixDef);
}

//////////////////////////////////////////////////////
Bomb.prototype.explode = function()
{
    var xf = this.body.m_xf;
    world.DestroyBody(this.body);
    console.log(xf);
    myExplosions.AddAt(xf.position.x, xf.position.y);
}


//////////////////////////////////////////////////////
function Bombs()
{
    this.bombs = [];
}

//////////////////////////////////////////////////////
Bombs.prototype.AddAt = function(x, y)
{
    var bomb = new Bomb(x, y);
    this.bombs.push(bomb);
}

//////////////////////////////////////////////////////
/*Bombs.prototype.Update = function()
{
    for(var i = 0; i < this.bombs.length; i++)
    {
        var bomb = this.bombs[i];
        bomb.Update();
    }
}*/

//////////////////////////////////////////////////////
Bombs.prototype.Draw = function(ctx)
{
    /*for(var i = 0; i < this.bombs.length; i++)
    {
        var bomb = this.bombs[i];
        bomb.Draw(ctx);
    }*/
}


