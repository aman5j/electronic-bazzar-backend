var express = require('express');
const pool = require('./pool');
const upload = require('./multer');
var router = express.Router();

/* GET home page. */

router.get('/fetch_all_banners', function(req, res, next) {
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

router.get('/display_all_category',function(req,res,next){
    try{
      pool.query('select * from category',function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
          res.status(200).json({data:result,status:true,message:'Success'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
  
  })

router.post('/display_all_products_by_status', function(req, res, next) {
  try{
      pool.query('select P.*, (select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=P.brandid) as brandname, (select Ps.productname from products Ps where Ps.productid=P.productid) as productname, (select Ps.picture from products Ps where Ps.productid=P.productid) as productpicture from productdetails P where P.status=? ',[req.body.status], function(error,result){
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


router.post('/display_all_products_for_menu', function(req, res, next) {
  try{
      pool.query('select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=P.brandid) as brandname from products P where P.categoryid=?',[req.body.categoryid],function(error,result){
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

router.get('/fetch_brands', function (req, res, next) {
  try {
      pool.query('select B.*, (select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brands B', function (error, result) {
          if (error) {
              res.status(200).json({ status: true, message: 'Database error,pls contact database admin' })
          }
          else {
              res.status(200).json({ status: true, data:result, message: 'success' })
          }
      })

  }
  catch (e) {
      console.log("server error ",e)
      res.status(200).json({ status: false, message: 'Server Error...' })
  }

});

router.get('/display_all_brands',function(req,res,next){
    try{
      pool.query('select * from brands group by brandname',function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
          res.status(200).json({data:result,status:true,message:'Success'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
  
  })

  router.post('/fetch_productdetails_by_productid', function(req, res, next) {
    try{
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=P.brandid) as brandname, (select Ps.productname from products Ps where Ps.productid=P.productid) as productname from productdetails P where P.productid=?',[req.body.productid],function(error,result){
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

router.post('/display_productdetails_by_id', function(req, res, next) {
  try{
      pool.query('select P.*, (select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=P.brandid) as brandname, (select Ps.productname from products Ps where Ps.productid=P.productid) as productname, (select Ps.picture from products Ps where Ps.productid=P.productid) as productpicture from productdetails P where P.productdetailsid=? ',[req.body.productdetailsid], function(error,result){
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

router.post('/order_submit', function(req, res, next) {
    try{
        console.log(req.body)
        var q='insert into  orders (orderdate, productdetailsid, qty, paymentstatus, deliverystatus, mobileno, emailid, username, address) values ? '
        pool.query(q,[ req.body.cart.map((item)=>{
            console.log("hi")
            return [
                new Date(), 
                item.productdetailsid, 
                item.qty, 
                req.body.paymentstatus, 
                'Undelivered', 
                req.body.user.mobileno, 
                req.body.user.emailid, 
                req.body.user.username, 
                req.body.user.address
            ];
        }),
    ]
        , function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {
                res.status(200).json({status:true, message:'Order Submitted Successfully'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
  });
  

router.post('/product_filter', function(req, res, next) {
    try{
        // var q=`select P.*, PD.* from productdetails PD, products P where PD.productid=P.productid and PD.modelno like '%${req.body.text}%' or P.productname like '%${req.body.text}%' `
        var q=`select P.productname,P.picture as mainpicture, PD.*, B.* from productdetails PD, products P, brands B where B.brandid=P.brandid and B.brandid=PD.brandid and  B.categoryid=P.categoryid and B.categoryid=PD.categoryid and PD.productid=P.productid and (PD.modelno like '%${req.body.text}%' or P.productname like '%${req.body.text}%' or B.brandname like '%${req.body.text}%') `
        console.log(q)
        pool.query(q,[req.body.text], function(error,result){
            if(error)
            {   console.log("Database Error:",error)
                res.status(200).json({status:false,message:'Database Error, pls contact database admin'})
            }
            else 
            {   console.log(result)
                res.status(200).json({status:true, data:result, message:'success'})
            }
        })
    }
    catch(e)
    {   console.log("Server Error:",e)
        res.status(200).json({status:false,message:'Server Error...'})
    }
});
  

module.exports = router;
