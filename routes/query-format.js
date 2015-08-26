var router = require('express').Router();
var _ = require('lodash');
var sceptre = require('../lib/sceptre');
var request = require('request');

/* Process a query for input data */
router.all('/', function(req,res) {
  var inputs = Object.keys(sceptre.templates);

  res.send(inputs);
});

router.all('/:tran', function(req, res) {
  var tran = req.params.tran;

  console.log('From request: ', tran);

  var inputs = sceptre.templates[tran];

  console.log('To response: ' + inputs);
  res.send(inputs);
});
/*
function format(inputs) {
  return inputs.map(function(field) {
    return _.pick(field, ['name', 'size']);
  });
}
*/
/*
function omitDeep(obj, props) {
  var o = {};
  if (_.isArray(obj)) {
    o = [];
  }
  _.forOwn(obj, function(v, k) {
    if (_.isArray(obj)) {
      o.push(omitDeep(v, props));
    } else if (typeof v === "object") {
      o[k] = omitDeep(v, props);
    } else if (props.indexOf(k) === -1) { // not a key we want to omit
      o[k] = v;
    }
  });
  return o;
}
*/

module.exports = router;