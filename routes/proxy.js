var router = require('express').Router();
var _ = require('lodash');
var http = require('http');

/* GET data */
router.all('/', function(req, res) {
  if (req.method === "POST") {
    req.query = req.body;
  }

  console.log('From request: ', req.query);

  var keys = Object.keys(req.query),
    query = req.query[keys[0]] || keys[0];

  if (keys.length !== 1 || !query) {
    res.send(400, "Error: Expected one request parameter");
    return;
  }

  var options = {
    hostname: 'localhost',
    port: 9080,
    path: '/PCW/service/proxy',
    method: 'POST',
    headers: _.extend(_.omit(req.headers, 'content-length'), { 'Content-Type' : 'application/json; charset=utf-8' })
  };

  var proxy_req = http.request(options, function (proxy_res) {
    console.log('started receiving response: ');
    //proxy_res.pipe(res, { end: true });
    var body = '';
    proxy_res.on("data", function(chunk) {
      body += chunk;
    });

    proxy_res.on("end", function() {
      console.log('finished receiving response: ');
      console.log('From SCEPTRE: ' + body);
      res.send(body);
    });
  });

  console.log('To SCEPTRE: ' + query);
  proxy_req.end(query);

});

module.exports = router;
