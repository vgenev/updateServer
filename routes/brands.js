/**
 * Created by vgene_000 on 2/17/2015.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
//var path = require('path');

router.param('type', function(req, res, next, type) {
    if ((type == 'main') || (type == 'pos'))
    {
        req.fType = type;
        next();
    }
    else {
        next(new Error('type not supported'));
    }
});

router.get('/get-update/:type/:ver/:chunk.bin', function(req, res, next) {
//pos.bb.1079.bin
    var pathfs = '../public/' + req.fType+'.'+req.brand+'.'+req.params.ver+'.bin';
    var chunk = req.params.chunk;
    var chunkSize = 4096;
    //var sendBuf = new Buffer(chunkSize);

    fs.readFile(pathfs, function(err, file){
        if (err) console.log(err);
        else
        {
            var startFrom = chunk * chunkSize;
//                if (startFrom >= file.length) {
//                    var err1 = new Error();
//                    err1.status = 404;
//                    return next(err1);
//                }
            var endAt = startFrom + chunkSize;

            if (endAt >= file.length)
            {
                endAt == file.length;
                res.append('Last-Chunk', 'true');
            }
            var sendBuf = file.slice(startFrom, endAt);
            res.send(sendBuf);
        }
    });
});

module.exports = router;
