var callSceptre = require('./sceptre-caller');
var Stream = require('stream');

function sceptreStream() {
  var stream = new Stream.Transform({objectMode: true});

  stream._transform = function(chunk, encoding, done) {

    callSceptre(chunk, function(err, data) {
      if (err) throw new Error(err);
      stream.push(JSON.stringify(JSON.parse(data.toString()), null, 2));
      stream.push(null);
      //stream.push(data);
      done();
    });

  };
  return stream;
}

module.exports = sceptreStream();

/* Example Usage:
var fs = require('fs');
fs.createReadStream('input.json')
  .pipe(stream)
  .pipe(process.stdout);
//*/