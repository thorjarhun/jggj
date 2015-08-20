var sceptre = require('../lib/sceptre');
var request = require('request');
var assert = require('assert');

function callSceptre(input, done) {
  //var input = data;
  assert.strictEqual(input instanceof Buffer, Buffer.isBuffer(input));
  /*
  var format = typeof input;
  if (input instanceof Buffer) {
    format = "buffer";
    input = JSON.parse(input);
  } else if (format === "string") {
    input = JSON.parse(input);
  } else if (format !== "object") {
    console.log(input);
    throw new Error("callSceptre expected input of type object but received a " + format + ": " + JSON.stringify(input, null, 2));
  }
  */
  var format = typeof input;
  if (format === "string" || input instanceof Buffer) {
    if (input instanceof Buffer) {
      format = "buffer";
    }
    input = JSON.parse(input);
  } else if (format !== "object") {
    console.log(input);
    done("callSceptre expected input of type object but received a " + format + ": " + JSON.stringify(input, null, 2));
  }
  
  var query = sceptre.parseJSON(input);
  console.log('To SCEPTRE: ' + query);

  var options = {
    url: 'http://localhost:9080/PCW/service/api/proxy',
    method: 'POST',
    body: query
  };
  
  request(options, function (err, res, body) {
    if (err) throw new Error(err);
    console.log('From SCEPTRE: ' + body);
    var tran = (input['transaction-code'] || input['TRANSACTION-CODE']).trim();
    var output = sceptre.buildJSON(tran, body);
    //console.log(JSON.stringify(output, null, 2));
    //console.log(output);
    /*
    var fs = require('fs');
    fs.createWriteStream(tran + '-input.txt').end(query);
    fs.createWriteStream(tran + '-output.txt').end(body);
    fs.createWriteStream(tran + '-input.json').end(JSON.stringify(input, null, 2));
    fs.createWriteStream(tran + '-output.json').end(JSON.stringify(output, null, 2));
    //*/
    /*
    if (format !== "object") {
      output = JSON.stringify(output);
      if (format === "buffer") {
        output = new Buffer(output);
      }
    }
    */
    if (format === "string") {
      output = JSON.stringify(output);
    } else if (format === "buffer") {
      output = new Buffer(JSON.stringify(output));
    }
    console.log("callSceptre calling success callback with data of type: " + format);
    done(null, output);
  });
}

module.exports = callSceptre;


/* Example Usage:
var caller = require('./sceptre-caller');
var test_data = {
  "transaction-code": "GAS",
  "message-ind": "A",
  "tracking-number": "",
  "nca-part-number": "56-7110-9-0010",
  "nca-serial-number": "16307"
};
var result = [];
caller(test_data, function(err, out) { result[0] = out; });
caller(JSON.stringify(test_data), function(err, out) { result[1] = JSON.parse(out); });
caller(new Buffer(JSON.stringify(test_data)), function(err, out) { result[2] = JSON.parse(out); });
assert.deepEqual(result[0], result[1]);
assert.deepEqual(result[1], result[2]);
//*/