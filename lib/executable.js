//process.env.NODE_ENV = 'test';

var sceptreStream = require('./sceptre-stream.js');
var fs = require('fs');

var inStream;
if (process.argv[2]) {
  inStream = require('fs').createReadStream(process.argv[2]);
} else {
  inStream = process.stdin;
}

//var jsf = require('json-stream-formatter');
//var es = require('event-stream');

inStream.pipe(sceptreStream)
        //.pipe(prettify)
        .pipe(process.stdout);
/*
var Stream = require('stream');
var prettify = new Stream.Transform({objectMode: true});
prettify._transform = function(chunk, encoding, done) {
  console.log(chunk);
  console.log(typeof chunk);
  prettify.push(JSON.stringify(chunk.toString(), null, 2));
  done();
};
//*/


/* Example Usage:
> node executable input.json
> cat input.json | node executable
//*/