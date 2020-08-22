const express=require('express');

let router=express.Router();


router.get("/",(req,res)=>{
    res.status(200).send("hello user");
});
router.get("/edit",(req,res)=>{
    res.status(200).send(" user edit");
});
router.get("/add",(req,res)=>{
    res.status(200).send(" user can add data");
});
router.get("/logout",(req,res)=>{
    res.status(200).send(" user logout");
});

module.exports=router;
