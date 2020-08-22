const express=require('express');

let router=express.Router();

router.use(function timeLog (req, res, next) {
    console.log('Admin login at: ', Date.now())
    next();
});

router.get("/",(req,res)=>{
    res.status(200).send("hello admin");
});
router.get("/edit",(req,res)=>{
    res.status(200).send(" admin edit");
});
router.get("/add",(req,res)=>{
    res.status(200).send(" admin can add data");
});
router.get("/logout",(req,res)=>{
    res.status(200).send(" admin logout");
});

module.exports=router;
