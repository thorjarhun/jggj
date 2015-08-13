var router = require('express').Router();
var callSceptre = require('../lib/sceptre-caller');
//var sceptreStream = require('../lib/sceptre-stream.js');
//var sceptre = require('../lib/sceptre');
//var request = require('request');

/* Process a generic transaction object */
router.all('/', function(req, res) {
  if (req.method === "POST") {
    req.query = req.body;
  }
  console.log('From request: ', req.query);

  callSceptre(req.query, function(err, data) {
    if (err) throw new Error(err);
    res.send(data);
  });

  /*
  // Aside: Look into JSONStream.stringifyObject
  var stream = require('stream');
  var s = new stream.Readable({objectMode: true});
  s._read = function noop() {};
  //s.push(JSON.stringify(req.query));
  s.push(req.query);
  s.push(null);

  var a = s.pipe(sceptreStream());
  // .pipe(res);
  console.dir(a);
  res.send(a);
  //*/

  /*
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
    //console.log(temp);
    res.send(temp);
    //var fs = require('fs');
    //fs.createWriteStream('input.txt').end(query);
    //fs.createWriteStream('output.txt').end(body);
    //fs.createWriteStream('input.json').end(JSON.stringify(req.query, null, 2));
    //fs.createWriteStream('output.json').end(JSON.stringify(temp, null, 2));
  });
  */
});

module.exports = router;