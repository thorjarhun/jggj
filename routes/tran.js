var router = require('express').Router();
var _ = require('lodash');
var sceptre = require('../lib/sceptre');
var request = require('request');

/* Process a generic transaction object */
router.all('/', function(req, res) {
  if (req.method === "POST") {
    req.query = req.body;
  }
  console.log('From request: ', req.query);

  var query = sceptre.parseJSON(req.query);
  console.log('To SCEPTRE: ' + query);

  var options = {
    url: 'http://localhost:9080/PCW/rest/api/proxy',
    method: 'POST',
    body: query
  };

  request(options, function (err, proxy_res, body) {
    if (err) throw new Error(err);
    console.log('From SCEPTRE: ' + body);
    var temp = sceptre.buildJSON(req.query['transaction-code'] || req.query['TRANSACTION-CODE'], body);
    res.send(temp);
  });

});

module.exports = router;