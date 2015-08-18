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
var parser = require('./transactions/parser');
describe('parser.js', function() {
  describe('successfully converts a set of copybooks', function () {
    it('GACS.txt to GACS.json', function() {
      
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
          req: {
            json: JSON.parse(fs.readFileSync('test/GACS-input.json')),
            string: fs.readFileSync('test/GACS-input.txt')
          },
          res: {
            json: JSON.parse(fs.readFileSync('test/GACS-output.json')),
            string: fs.readFileSync('test/GACS-output.txt')
          }
        },
  GAS: {
          req: {
            json: JSON.parse(fs.readFileSync('test/GAS-input.json')),
            string: fs.readFileSync('test/GAS-input.txt')
          },
          res: {
            json: JSON.parse(fs.readFileSync('test/GAS-output.json')),
            string: fs.readFileSync('test/GAS-output.txt')
          }
        },
  GIPI: {
          req: {
            json: JSON.parse(fs.readFileSync('test/GIPI-input.json')),
            string: fs.readFileSync('test/GIPI-input.txt')
          },
          res: {
            json: JSON.parse(fs.readFileSync('test/GIPI-output.json')),
            string: fs.readFileSync('test/GIPI-output.txt')
          }
        }
};
/*
var responseData = {
  GACS: JSON.parse(fs.readFileSync('test/GACS_Response.json')),
  GAS: JSON.parse(fs.readFileSync('test/GAS_Response.json')),
  GIPI: JSON.parse(fs.readFileSync('test/GIPI_Response.json'))
};
*/

//console.log(JSON.stringify(responseData, null, 2));

/*
describe('/tran route', function() {
  var url = "http://localhost:8000/tran";
  /*
  var options = {
    url: 'http://localhost:9080/PCW/rest/api/proxy',
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