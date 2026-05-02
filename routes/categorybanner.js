var express = require('express');
const pool = require('./pool');
const upload = require('./multer');
var router = express.Router();

/* GET home page. */
router.post('/submit_categorybanners',upload.any(), function(req, res, next) {
  try{
    var filenames = req.files.map((file)=> file.filename)
    pool.query('insert into categorybanner (categoryid, brandid, files) values (?,?,?)',[req.body.categoryid, req.body.brandid, filenames+''],function(error,result){
        if(error)
        {
            console.log("Database Error:",error)
            res.status(200).json({status:false, message:'Database error, pls contact database admin'})
        }
        else 
        {
            res.status(200).json({status:true, message:'category Banners Submitted Successfully'})
        }
    })
  }
  catch(e)
  {
    console.log("server Error:",e)
    res.status(200).json({status:false, message:'Server Error'})
  }
});

module.exports = router;
