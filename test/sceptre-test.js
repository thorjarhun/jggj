process.env.NODE_ENV = 'test';
var fs = require('fs');
var assert = require("assert");
var request = require('request');
/*
describe('executable.js', function() {
  describe('transform & request mode', function () {
    it('GACS should have pre', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
*/
/*
var requestData = {
  GACS: {
          json: {
            "transaction-code": "GACS",
            "function-cde": "3",
            "option-cde": "6",
            "gacs-stk-num": "56-7110-9-0010",
            "gacs-ser-num": "16307",
            "employee-num": "0000537711"
          }
        },
  GAS: {
          json: {
            "transaction-code": "GAS",
            "message-ind": "A",
            "tracking-number": "",
            "nca-part-number": "56-7110-9-0010",
            "nca-serial-number": "16307"
          }
        },
  GIPI: {
          json: {
            "transaction-code": "GIPI",
            "function-cde": "1",
            "insp-nwa-stk-num": "55-0579-8-0037"
          }
        }
};
*/
var data = {
  GACS: {
          copybook: fs.readFileSync('test/copybooks/GACS.txt'),
          template: {
            js: require('./templates/GACS.js'),
            json: JSON.parse(fs.readFileSync('test/templates/GACS.json'))
          },
          req: {
            json: JSON.parse(fs.readFileSync('test/transformations/GACS-input.json')),
            string: fs.readFileSync('test/transformations/GACS-input.txt')
          },
          res: {
            json: JSON.parse(fs.readFileSync('test/transformations/GACS-output.json')),
            string: fs.readFileSync('test/transformations/GACS-output.txt')
          }
        },
  GAS: {
          copybook: fs.readFileSync('test/copybooks/GAS.txt'),
          template: {
            js: require('./templates/GAS.js'),
            json: JSON.parse(fs.readFileSync('test/templates/GAS.json'))
          },
          req: {
            json: JSON.parse(fs.readFileSync('test/transformations/GAS-input.json')),
            string: fs.readFileSync('test/transformations/GAS-input.txt')
          },
          res: {
            json: JSON.parse(fs.readFileSync('test/transformations/GAS-output.json')),
            string: fs.readFileSync('test/transformations/GAS-output.txt')
          }
        },
  GIPI: {
          copybook: fs.readFileSync('test/copybooks/GIPI.txt'),
          template: {
            js: require('./templates/GIPI.js'),
            json: JSON.parse(fs.readFileSync('test/templates/GIPI.json'))
          },
          req: {
            json: JSON.parse(fs.readFileSync('test/transformations/GIPI-input.json')),
            string: fs.readFileSync('test/transformations/GIPI-input.txt')
          },
          res: {
            json: JSON.parse(fs.readFileSync('test/transformations/GIPI-output.json')),
            string: fs.readFileSync('test/transformations/GIPI-output.txt')
          }
        }
};

var child = require('child_process');
var path = require('path');
var concat = require('concat-stream');

describe('parser.js', function() {
  var parser = path.join(__dirname, '..', 'transactions', 'parser.js');
  //console.log(parser.toString());

  describe('successfully converts a set of copybooks', function () {
    describe('by passing in the file names', function() {
      var testFromFile = function(tran) {
        var copybook = 'transactions/copybooks/' + tran + '.txt';
        var args = [copybook].concat(Array.prototype.slice.call(arguments, 1));
        //it(tran + '.txt to stdout', function(done) {
        it('node transactions/parser.js ' + args.join(' '), function(done) {
          var proc = child.fork(parser, args, {silent: true});

          proc.stdout.pipe(concat(function(output) {
            var template = JSON.parse(output);
            assert.deepEqual(template, data[tran].template.json);
            done();
          }));
        });
      };
      testFromFile('GACS', '-r');
      testFromFile('GAS');
      testFromFile('GIPI', '-r');
    });
    describe('by piping in the copybook contents', function() {
      var testFromStream = function(tran) {
        var copybook = 'transactions/copybooks/' + tran + '.txt';
        var args = Array.prototype.slice.call(arguments, 1);
        it('cat ' + copybook + ' | node transactions/parser.js ' + args.join(' '), function(done) {
          var proc = child.fork(parser, args, {silent: true});

          fs.createReadStream(copybook).pipe(proc.stdin);

          proc.stdout.pipe(concat(function(output) {
            var template = JSON.parse(output);
            assert.deepEqual(template, data[tran].template.json);
            done();
          }));
        });
      };

      testFromStream('GACS', '-r');
      testFromStream('GAS');
      testFromStream('GIPI', '-r');
    });
  });
});


//console.log(JSON.stringify(responseData, null, 2));

/*
describe('/tran route', function() {
  var url = "http://localhost:8000/tran";
  /*
  var options = {
    url: 'http://localhost:9080/PCW/service/api/proxy',
    method: 'POST',
    body: query
  };
  *//*
  describe('Using POST with Content-Type: application/x-www-form-urlencoded', function() {
    it('Sample GACS test', function(done) {
      this.timeout(5000);
      request.post({url: url, form: requestData.GACS}, function(err, res, body) {
        assert.ifError(err);
        /*
        fs.writeFile('GACS_Response.json', JSON.stringify(JSON.parse(body), null, 2), function (err) {
          if(err) {
            return console.log(err);
          }
          console.log("The file was saved!");
          done();
        });
        *//*
        var expected = JSON.parse(body);
        assert.deepEqual(expected, responseData.GACS);
        done();
      });
    });
    it('Sample GAS test', function(done) {
      this.timeout(5000);
      request.post({url: url, form: requestData.GAS}, function(err, res, body) {
        assert.ifError(err);
        var expected = JSON.parse(body);
        assert.deepEqual(expected, responseData.GAS);
        done();
      });
    });
    it('Sample GIPI test', function(done) {
      this.timeout(5000);
      request.post({url: url, form: requestData.GIPI}, function(err, res, body) {
        assert.ifError(err);
        var expected = JSON.parse(body);
        assert.deepEqual(expected, responseData.GIPI);
        done();
      });
    });
  });
});
*/

var sceptre = require('../lib/sceptre.js');
describe('sceptre.js', function() {
  describe('parseJSON takes an object in JSON and returns a string to send to sceptre', function() {
    it('Sample JSON for GACS', function() {
      var input = data.GACS.req.json;
      var output = sceptre.parseJSON(input);
      var expected = data.GACS.req.string;
      assert.equal(output, expected);
    });
    it('Sample JSON for GAS', function() {
      var input = data.GAS.req.json;
      var output = sceptre.parseJSON(input);
      var expected = data.GAS.req.string;
      assert.equal(output, expected);
    });
    it('Sample JSON for GIPI', function() {
      var input = data.GIPI.req.json;
      var output = sceptre.parseJSON(input);
      var expected = data.GIPI.req.string;
      assert.equal(output, expected);
    });
  });
  describe('buildJSON takes a fixed-width formatted string from sceptre and returns an object in JSON', function() {
    it('Sample String for GACS', function() {
      var input = data.GACS.res.string;
      var output = sceptre.buildJSON('GACS', input);
      var expected = data.GACS.res.json;
      assert.deepEqual(output, expected);
    });
    it('Sample String for GAS', function() {
      var input = data.GAS.res.string;
      var output = sceptre.buildJSON('GAS', input);
      var expected = data.GAS.res.json;
      assert.deepEqual(output, expected);
    });
    it('Sample String for GIPI', function() {
      var input = data.GIPI.res.string;
      var output = sceptre.buildJSON('GIPI', input);
      var expected = data.GIPI.res.json;
      assert.deepEqual(output, expected);
    });
  });
});