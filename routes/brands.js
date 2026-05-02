var express = require('express');
const pool = require('./pool');
const upload = require('./multer');
var router = express.Router()

/* GET home page. */
router.post('/submit_brand',upload.single('logo'), function (req, res, next) {
    try {
        pool.query('insert into brands (brandname,categoryid,logo) values(?,?,?)', [req.body.brandname, req.body.categoryid, req.file.filename], function (error, result) {
            if (error) {
                res.status(200).json({ status: true, message: 'Database error,pls contact database admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'Brand Submitted Successfully' })
            }
        })

    }
    catch (e) {
        console.log("server error ",e)
        res.status(200).json({ status: false, message: 'Server Error...' })
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

router.post('/fetch_brands_by_category', function (req, res, next) {
    try {
        pool.query('select * from brands where categoryid=?',[req.body.categoryid], function (error, result) {
            if (error) {
                res.status(200).json({ status: true, message: 'Database error,pls contact database admin' })
            }
            else {
                console.log("Brands LIst: ",result)
                res.status(200).json({ status: true, data:result, message: 'success' })
            }
        })

    }
    catch (e) {
        console.log("server error ",e)
        res.status(200).json({ status: false, message: 'Server Error...' })
    }

});


router.post('/edit_brand', function (req, res, next) {
    try {
        pool.query('update brands set brandname=?,categoryid=? where brandid=?', [req.body.brandname, req.body.categoryid, req.body.brandid], function (error, result) {
            if (error) {
                res.status(200).json({ status: true, message: 'Database error,pls contact database admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'Brand Updated Successfully' })
            }
        })

    }
    catch (e) {
        console.log("server error ",e)
        res.status(200).json({ status: false, message: 'Server Error...' })
    }

});


router.post('/delete_brand', function (req, res, next) {
    try {
        pool.query('delete from brands where brandid=?', [req.body.brandid], function (error, result) {
            if (error) {
                res.status(200).json({ status: true, message: 'Database error,pls contact database admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'Brand Deleted Successfully' })
            }
        })

    }
    catch (e) {
        console.log("server error ",e)
        res.status(200).json({ status: false, message: 'Server Error...' })
    }

});

router.post('/edit_brand_logo',upload.single('logo'), function (req, res, next) {
    try {
        pool.query('update brands set logo=? where brandid=?', [req.file.filename, req.body.brandid], function (error, result) {
            if (error) {
                res.status(200).json({ status: true, message: 'Database error,pls contact database admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'logo Updated Successfully' })
            }
        })

    }
    catch (e) {
        console.log("server error ",e)
        res.status(200).json({ status: false, message: 'Server Error...' })
    }

});


module.exports = router;
