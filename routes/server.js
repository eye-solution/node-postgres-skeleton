var express = require('express');
var router = express.Router();
var config = require('../lib/config');
var request = require('../lib/request');
var meta = require('../controllers/server/meta');

router.all('/test', function(req, res) {
  res.send({
    query: req.query,
    body: req.body,
    params: req.params,
    headers: req.headers,
    files: req.files
  });
})

router.all('/hello', meta.hello);

module.exports = router;
