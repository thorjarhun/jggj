var fs = require('fs');
var concat = require('concat-stream');
var parseStream = require('./parser-stream');

var argv = require('minimist')(process.argv.slice(2), {
  string: ['i', 'o', 'r'],
  alias: {
    i: ['in', 'input', 'file'],
    o: ['out', 'output'],
    r: ['ri', 'returnsInput']
  }
});
if (!('i' in argv)) {
  if (argv._.length) {
    argv.i = argv._[0];
  }
}
var inStream;
if ('i' in argv) {
  inStream = fs.createReadStream(argv.i.trim());
} else {
  inStream = process.stdin;
}

var outStream = concat(function(output) {
  var obj = output[0];
  //console.log(obj);
  //process.exit();

  if ('r' in argv) {
    obj["returns input?"] = true;
  }

  var content = JSON.stringify(obj, null, 2);
  //console.log(content);

  if ('o' in argv) {
    if (argv.o.trim().slice(-3) === '.js') {
      content = 'module.exports = ' + content;
    }
    fs.writeFile(argv.o.trim(), content, function (err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  } else {
    console.log(content);
  }
});

inStream.pipe(parseStream)
        .pipe(outStream);