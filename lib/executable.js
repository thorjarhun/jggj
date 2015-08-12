var sceptreStream = require('./sceptre-stream');
var fs = require('fs');

var inStream;
if (process.argv[2]) {
  inStream = require('fs').createReadStream(process.argv[2]);
} else {
  inStream = process.stdin;
}

inStream.pipe(sceptreStream)
        .pipe(process.stdout);