//var $ = require('jquery');
//var $ = require('cheerio');
var trans = require('../lib/trans');
var http = require('http');
var express = require('express');
var router = express.Router();
var _ = require('lodash');
/*
function serialize(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};
*/

function serialize( obj ) {
  return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}


/* GET GAS data */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log(req.query);

  var options = {
    hostname: 'localhost',
    port: 9080,
    path: '/PCW/rest/api/proxy',
    method: 'POST',
    headers: _.extend(req.headers, { 'Content-Type' : 'application/json; charset=utf-8' })
  };

  delete options.headers['content-length'];

  var proxy_req = http.request(options, function (proxy_res) {
    console.log('started receiving response: ');
    //proxy_res.pipe(res, { end: true });
    var body = '';
    proxy_res.on("data", function(chunk) {
      body += chunk;
    });

    proxy_res.on("end", function() {
      console.log('finished receiving response: ');
      proxy_res.headers['Access-Control-Allow-Origin'] = '*';
      proxy_res.headers['Access-Control-Allow-Headers'] = 'Content-Type';//req.headers['Access-Control-Request-Headers'];
      //res.writeHead(proxy_res.statusCode, proxy_res.headers);
      console.log('before buildJSON: ', body);
      var temp = trans.buildJSON('GAS', body);
      console.log('after buildJSON: ', temp);
      res.send(temp);
    });
  });
  /*
  if (req.query && req.query.in) {
    req.query = serialize(req.query).slice(1);
  }
  */

  //console.log(serialize(req.query));
  //proxy_req.end(serialize(req.query));
  if (req.query && !req.query.tran) {
    req.query.tran = "GAS";
  }
  var temp = trans.parseJSON(req.query);
  console.log(temp);
  proxy_req.end(temp);

});

module.exports = router;
