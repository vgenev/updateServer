//http://tsm-ip:9090/:brand/get-update/:type/:ver/:chunk.bin'

var express = require('express');
var router = express.Router();
var fs = require('fs');


router.param('brand', function(req, res, next, brand) {
    req.brand = brand;
    next(req);
});

/*
 */
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/get-ver', function (req, res) {
    var sn = req.body.sn;
    var vMain = req.body.vMain;
    var vPos= req.body.vPos;
    var brand = req.body.BB;
    var path = '../public/'+sn+'.json';

    fs.readFile(path, 'utf8', function (err, file){
        if (err) throw next(err);
        obj = JSON.parse(file);
        console.log(obj);
        res.send(obj.vMain+"\t"+obj.vPos+"\t"+obj.posHash);

    });
});

module.exports = router;
