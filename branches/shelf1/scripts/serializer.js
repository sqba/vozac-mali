function serializeWorld(world, context) {
	/*for (var j = myWorld.m_jointList; j; j = j.m_next) {
		//drawJoint(j, context);
	}*/
	for (var b = myWorld.m_bodyList; b; b = b.m_next) {
//        if(b.m_fixtureCount > 0)// && b.m_fixtureList && b2Body.b2_dynamicBody == b.m_fixtureList.m_shape.m_type)
//            console.log(b.m_fixtureList.m_shape.m_type);
        {
//            console.log(b);
            //b.m_xf.position.x += 10;
            //if(b.m_xf)
            //    b.SetTransform(b2Vec2(10, 10), 0);
//            console.log(b.GetUserData()+"(x: "+b.m_xf.position.x+", y: "+b.m_xf.position.y+")");
//            if("wheel" == b.GetUserData() || "chassis" == b.GetUserData())
//            {
//                var xf = b.GetTransform();
//                xf.position.x += 10;
//                b.SetTransform(xf);
//            }
		    /*for (var s = b.Shapes; s != null; s = s.GetNext()) {
                console.log("x: "+s..position.x+", y: "+s.position.y);
			    //drawShape(s, context);
		    }*/
        }
	}
}
/*
function replacer(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
    }
    return value;
}

var myJSONText = JSON.stringify(myWorld, replacer);
*/

