var express = require('express');
const upload = require('./multer');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.post('/submit_product',upload.single('picture'), function(req, res, next) {
    try{
        pool.query('insert into products (categoryid, brandid, productname, picture) values (?,?,?,?)',[req.body.categoryid,req.body.brandid,req.body.productname,req.file.filename],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'Product Add Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.get('/fetch_products', function(req, res, next) {
    try{
        pool.query('select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=P.brandid) as brandname from products P',function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,data:result,message:'Product Add Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.post('/fetch_products_by_category_and_brand', function(req, res, next) {
    try{
        pool.query('select * from products where categoryid=? and brandid=?',[req.body.categoryid, req.body.brandid],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {   console.log("Product List:",result)
                res.status(200).json({status:true,data:result,message:'Product Add Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.post('/edit_product', function(req, res, next) {
    try{
        pool.query('update products set categoryid=?, brandid=?, productname=? where productid=?',[req.body.categoryid, req.body.brandid, req.body.productname,req.body.productid],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'Product Updated Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.post('/delete_product', function(req, res, next) {
    try{
        pool.query('delete from products where productid=?',[req.body.productid],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'Product Deleted Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});

router.post('/edit_product_picture',upload.single('picture'), function(req, res, next) {
    try{
        pool.query('update products set picture=? where productid=?',[req.file.filename, req.body.productid],function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true,message:'Picture Updated Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});


module.exports = router;
