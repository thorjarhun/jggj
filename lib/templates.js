var TEMPLATES_PATH = process.cwd() + '/transactions/templates';

function getTemplates(type) {
  var templates = {};
  var dive = require('dive');
  dive(TEMPLATES_PATH, { recursive: false }, function(err, file) {
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

  return templates;
}

function getTemplatesFromJS() {
  return getTemplates('.js');
}

function getTemplatesFromJSON() {
  return getTemplates('.json');
}

function getTemplatesHard() {
  return {
    GAS: require('./../transactions/templates/GAS'),
    GACS: require('./../transactions/templates/GACS'),
    GIPI: require('./../transactions/templates/GIPI')
  };
}

//getTemplatesFromJS();
//getTemplatesFromJSON();

module.exports = {
  getTemplatesFromJS: getTemplatesFromJS,
  getTemplatesFromJSON: getTemplatesFromJSON,
  getTemplatesHard: getTemplatesHard
};