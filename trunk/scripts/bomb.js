
//////////////////////////////////////////////////////
// Constants
var BOMB_RADIUS = 0.5;
var TIMER_INTERVAL = 3 * 1000;
//////////////////////////////////////////////////////


    var listener = new Box2D.Dynamics.b2ContactListener;
    //listener.PostSolve = this.contact;

    listener.BeginContact = function(contact) {
        console.log(contact.GetFixtureA().GetBody().GetUserData());
    }

    listener.EndContact = function(contact) {
        console.log(contact.GetFixtureA().GetBody().GetUserData());
    }

    
//////////////////////////////////////////////////////
function Bomb(x, y, interval)
{
    this.body = this.create(x, y);

    if(TIMER_INTERVAL > 0)
    {
        if(null == interval)
            interval = TIMER_INTERVAL;

        this.runIntervalId = setTimeout(this.onTimeout, interval, this);
    }

//    this.body.SetUserData(this.runIntervalId);
//    console.log(this.body.GetUserData());

//    this.body.SetUserData(this);
}

Bomb.prototype.contact = function(contact, impulse)
{
    if(contact)
    {
        console.log(contact);
        this.explode();
    }
}

Bomb.prototype.onTimeout = function(obj)
{
//    console.log(obj);
    var body = obj.body;
//    console.log(body.GetUserData());
    var pos = body.GetTransform().position;
    myWorld.DestroyBody(body);
    myExplosions.AddAt(pos.x, pos.y);
   // clearTimeout(this.runIntervalId);
}

Bomb.prototype.explode = function()
{
    this.runIntervalId = setTimeout(this.onTimeout, 1, this);
}

Bomb.prototype.create = function(x, y)
{
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position = new b2Vec2(x, y);
    //bodyDef.position.Add(pos);

    body = myWorld.CreateBody(bodyDef);
    body.SetUserData(this);

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    fixDef.shape = new b2CircleShape(BOMB_RADIUS);
    fixDef.shape.type = b2Body.b2_dynamicBody;
    fixDef.shape.density = 1;
    body.CreateFixture(fixDef);

    return body;
}

//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
function Bombs()
{
    this.bombs = [];
}

//////////////////////////////////////////////////////
Bombs.prototype.AddAt = function(x, y, interval)
{
    var bomb = new Bomb(x, y, interval);
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


