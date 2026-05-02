var express = require('express');
var router = express.Router();
const upload = require('./multer');
const pool = require('./pool');


/* GET home page. */
router.post('/submit_productdetails',upload.any(), function(req, res, next) {
    try{
        // console.log("FILLEESSS",req.files)
        var filenames = req.files.map((file,index)=>  file.filename)
        pool.query('insert into productdetails (categoryid, brandid, productid, modelno, description, color, price, offerprice, stock, status, hsncode, picture) values (?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid, req.body.brandid, req.body.productid, req.body.modelno, req.body.description, req.body.color, req.body.price, req.body.offerprice, req.body.stock, req.body.status, req.body.hsncode, filenames+''],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'ProductDetails Submitted Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.get('/fetch_productdetails', function(req, res, next) {
    try{
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=P.brandid) as brandname, (select Ps.productname from products Ps where Ps.productid=P.productid) as productname from productdetails P',function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true, data:result, message:'success'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.post('/edit_productdetails', function(req, res, next) {
    try{
        pool.query('update productdetails set categoryid=?, brandid=?, productid=?, modelno=?, description=?, color=?, price=?, offerprice=?, stock=?, status=?, hsncode=? where productdetailsid=?',[req.body.categoryid, req.body.brandid, req.body.productid, req.body.modelno, req.body.description, req.body.color, req.body.price, req.body.offerprice, req.body.stock, req.body.status, req.body.hsncode, req.body.productdetailsid],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'ProductDetails Updated Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.post('/delete_productdetails', function(req, res, next) {
    try{
        pool.query('delete from productdetails where productdetailsid=?',[req.body.productdetailsid], function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'ProductDetails Deleted Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});



module.exports = router;
