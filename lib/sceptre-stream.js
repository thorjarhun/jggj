var sceptre = require('../lib/sceptre');
var request = require('request');
var Stream = require('stream');
var stream = new Stream.Transform();//{objectMode: true});

stream._transform = function(chunk, encoding, done) {
  var data = JSON.parse(chunk);
  console.log(data);
  console.log(typeof data);

  
  var query = sceptre.parseJSON(data);
  console.log('To SCEPTRE: ' + query);

  //process.exit();

  var options = {
    url: 'http://localhost:9080/PCW/rest/api/proxy',
    method: 'POST',
    body: query
  };
  
  request(options, function (err, res, body) {
    if (err) throw new Error(err);
    console.log('From SCEPTRE: ' + body);
    var temp = sceptre.buildJSON(data['transaction-code'] || data['TRANSACTION-CODE'], body);
    //console.log(JSON.stringify(temp, null, 2));
    //console.log(temp);

    stream.push(JSON.stringify(temp));
    done();
  });
  //*/
};

module.exports = stream;


/* Example Usage:
var fs = require('fs');
fs.createReadStream('input.json')
  .pipe(stream)
  .pipe(process.stdout);
//*/