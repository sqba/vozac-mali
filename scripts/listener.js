var listener = new Box2D.Dynamics.b2ContactListener;

listener.BeginContact = function(contact)
{
/*
    var bodyA = contact.GetFixtureA().GetBody();
    var bodyB = contact.GetFixtureB().GetBody();
    var dataA = bodyA.GetUserData();
    var dataB = bodyB.GetUserData();
    console.log(dataA);
    console.log(dataB);
    if(dataA && dataB && dataA.explode)
    {
        dataA.explode();
    }
    if(dataA && dataB && dataB.explode)
    {
        dataB.explode();
    }
*/
}
listener.EndContact = function(contact) {
    //console.log(contact.GetFixtureA().GetBody().GetUserData());
}
listener.PostSolve = function(contact, impulse) {
    
}
listener.PreSolve = function(contact, oldManifold) {

}
myWorld.SetContactListener(listener);
