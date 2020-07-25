//global.x=3;

var r=10;
const pi=3.14;
var area=pi*r*r;
//module.exports=area;


function getArea(r){
    return 3.14 * r*r;
}

//module.exports=getArea;

module.exports.fun=getArea;
module.exports.obj={ r:r, a:area  };
module.exports.area=area;
module.exports.month=["jan","feb","mar"];


