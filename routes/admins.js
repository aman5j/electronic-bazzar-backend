var express = require('express');
const pool = require('./pool');
var router = express.Router();

/* GET users listing. */
router.post('/check_admin_login', function(req, res, next) {
    pool.query('select * from admins where (emailid=? or mobileno=?) and password=?',[req.body.emailid, req.body.emailid, req.body.password], function(error, result){
        if(error)
            res.status(200).json({status:false, message:'Database Error'})
        else 
        {
            if(result.length==1)
                res.status(200).json({status:true, data:result[0], message: 'success'})
            else 
                res.status(200).json({status:false, message: 'invalid emailid/mobileno/password'})
        }
    })
});

module.exports = router;

