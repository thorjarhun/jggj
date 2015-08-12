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

  var inputs = format(sceptre.getInputFormat(tran));

  console.log('To response: ' + inputs);
  res.send(inputs);
});

function format(inputs) {
  return inputs.map(function(field) {
    return _.pick(field, ['name', 'size']);
  });
}

module.exports = router;