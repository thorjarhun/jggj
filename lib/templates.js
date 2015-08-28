var _ = require('lodash');
//var TEMPLATE_PATH = process.cwd() + '/transactions/templates';
var TEMPLATE_PATH = require('path').join(__dirname, '..', 'transactions', 'templates');
if (process.env.NODE_ENV === "test") {
  TEMPLATE_PATH = require('path').join(__dirname, '..', 'test', 'templates');
}

// TODO: Move this functionality to parser.js and use as default. Add flag to disable.
function omitDeep(obj, props) {
  var o = {};
  if (_.isArray(obj)) {
    o = [];
  }
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var v = obj[k];
      if (_.isArray(obj)) {
        o.push(omitDeep(v, props));
      } else if (typeof v === "object") {
        o[k] = omitDeep(v, props);
      } else if (props.indexOf(k) === -1) { // not a key we want to omit
        o[k] = v;
      }
    }
  }
  return o;
}

function getTemplates(type) {
  var templates = {};

  if (type === "hard") {
    templates.GAS = require(TEMPLATE_PATH + '/GAS');
    templates.GACS = require(TEMPLATE_PATH + '/GACS');
    templates.GIPI = require(TEMPLATE_PATH + '/GIPI');
  } else {
    var dive = require('dive');
    dive(TEMPLATE_PATH, { recursive: false }, function(err, file) {
      if (err) throw err;

      if (file.slice(-type.length) === type) {
        var tran = file.match(new RegExp("([^\\\\]*)\\" + type + "$"))[1];
        if (tran !== tran.toUpperCase()) {
          return;
        }
        if (type.slice(-2) === "js") {
          templates[tran] = require(file);
        } else if (type.slice(-4) === "json") {
          templates[tran] = JSON.parse(require('fs').readFileSync(file).toString());
        } else {
          throw new Error("Unrecognized type: " + type);
        }
        
        console.log("loaded " + tran + type);
      }
    });
  }

  templates = omitDeep(templates, 'level');

  return templates;
}

function getTemplatesFromJS() {
  return getTemplates('.js');
}

function getTemplatesFromJSON() {
  return getTemplates('.json');
}

function getTemplatesHard() {
  return getTemplates('hard');
}

//getTemplatesFromJS();
//getTemplatesFromJSON();

module.exports = {
  getTemplatesFromJS: getTemplatesFromJS,
  getTemplatesFromJSON: getTemplatesFromJSON,
  getTemplatesHard: getTemplatesHard
};