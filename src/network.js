const netList = require('network-list');


// netList.scanEach({}, (err, obj) => {
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log(obj); // device object
//     }
// });


netList.scan({}, (err, arr) => {
    console.log(arr); // array with all devices
});
