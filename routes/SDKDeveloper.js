var express = require('express');
var router = express.Router();
var verifyToken = require('./VerifyToken');
var Register=require('../Controllers/SDK Developer/Developer');
const fileUpload = require("express-fileupload");

router.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);

router.post('/register',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.registration(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});

router.post('/verify',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.verify(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
})
router.post('/login',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.login(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});

router.post('/fetch',verifyToken,function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.fetch(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});
router.post('/update',verifyToken,function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.update(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});
router.post('/delete',verifyToken,function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.delete(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});

router.post('/forgotpassword',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.forgotpassword(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});
router.post('/resetpassword',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.resetpassword(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});
router.post('/changepassword',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Register.changePassword(req.body,(result) => {
            console.log('result',result.status);
            if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
});

module.exports=router;

