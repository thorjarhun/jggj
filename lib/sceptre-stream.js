var callSceptre = require('../lib/sceptre-caller');
var Stream = require('stream');

function makeStream() {
  var stream = new Stream.Transform({objectMode: true});

  stream._transform = function(chunk, encoding, done) {
    /*
    var data = JSON.parse(chunk);
    console.log(data);

    var query = sceptre.parseJSON(data);
    console.log('To SCEPTRE: ' + query);

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
      stream.push(JSON.stringify(temp));
      done();
    });
    //*/

    callSceptre(chunk, function(err, data) {
      if (err) throw new Error(err);
      stream.push(JSON.stringify(JSON.parse(data.toString()), null, 2));
      //stream.push(data);
      done();
    });

  };
  return stream;
}


module.exports = makeStream;


/* Example Usage:
var fs = require('fs');
fs.createReadStream('input.json')
  .pipe(stream)
  .pipe(process.stdout);
//*/