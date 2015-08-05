var trans = require('../lib/sceptre');
var http = require('http');
var _ = require('lodash');
var request = require('request');
var express = require('express');
var router = express.Router();

/* Process a generic transaction object */
router.all('/', function(req, res) {
  if (req.method === "POST") {
    req.query = req.body;
  }
  console.log('From request: ', req.query);

  var query = trans.parseJSON(req.query);
  console.log('To SCEPTRE: ' + query);

  var options = {
    url: 'http://localhost:9080/PCW/rest/api/proxy',
    method: 'POST',
    body: query
  };

  request(options, function (err, proxy_res, body) {
    if (err) throw new Error(err);
    console.log('From SCEPTRE: ' + body);
    var temp = trans.buildJSON(req.query['transaction-code'], body);
    res.send(temp);
  });

});

module.exports = router;