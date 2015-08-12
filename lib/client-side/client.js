var sceptre = require('../lib/sceptre');
var request = require('browser-request');

var test_data = {
    "transaction-code": "GAS",
    "message-ind": "A",
    "tracking-number": "",
    "nca-part-number": "56-7110-9-0010",
    "nca-serial-number": "16307"
};

function callSceptre(input) {
  var query = sceptre.parseJSON(input);
  console.log('To SCEPTRE: ' + query);

  var options = {
    url: 'http://localhost:9080/PCW/rest/api/proxy',
    method: 'POST',
    body: query
  };

  request(options, function (err, res, body) {
    if (err) throw new Error(err);
    console.log('From SCEPTRE: ' + body);
    var temp = sceptre.buildJSON(input['transaction-code'] || input['TRANSACTION-CODE'], body);
    console.log(temp);
  });
}

callSceptre(test_data);

window.request = request;
window.sceptre = sceptre;
window.callSceptre = callSceptre;
window.test_data = test_data;