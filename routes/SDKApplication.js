var express = require('express');
var router = express.Router();
var verifyToken = require('./VerifyToken');
var Application=require('../Controllers/SDKApplication/SDKApplication');

router.post('/insert',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Application.insert(req.body,(result) => {
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
router.post('/config', (req,res) => {

    if(typeof req.body === 'undefined'){
        res.json({response:'0',message:'no content to process your request'});
    }else {
        Application.AddApplication(req.body, (result) => {
            console.log('callback response...', result);
            res.json(result);
        });
    }

});
router.post('/projectdelete',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Application.delete(req.body,(result) => {
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
router.post('/androidprojecctdelete',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Application.androiddelete(req.body,(result) => {
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
router.post('/iosconfig',function(req,res,next){
    if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{
        Application.iosconfig(req.body,(result) => {
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
module.exports = router;