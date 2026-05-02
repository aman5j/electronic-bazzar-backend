var express = require('express');
const pool = require('./pool');
const upload = require('./multer');
var router = express.Router();

/* GET home page. */
router.post('/submit_banners',upload.any(), function(req, res, next) {
  try{
    var filenames = req.files.map((file,index)=> file.filename)
    pool.query('insert into banner (files) values (?)',[filenames+''],function(error,result){
        if(error)
        {
            console.log("Database Error",error)
            res.status(200).json({status:false, message:'Database Error, Pls contact database admin'})
        }
        else 
        {
            res.status(200).json({status:true, message:'Banners Submitted Successfully'})
        }
    })
  }
  catch(e)
  {
    console.log("Server Erros:",e)
    res.status(200).json({status:false, message:'Server Error...'})
  }
});

router.post('/fetch_all_banner', function(req, res, next) {
  try{
    pool.query('select * from banner',function(error,result){
        if(error)
        {
            console.log("Database Error",error)
            res.status(200).json({status:false, message:'Database Error, Pls contact database admin'})
        }
        else 
        {
            res.status(200).json({data:result, status:true, message:'success'})
        }
    })
  }
  catch(e)
  {
    console.log("Server Erros:",e)
    res.status(200).json({status:false, message:'Server Error...'})
  }
});


module.exports = router;
