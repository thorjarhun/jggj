var templates = {
//  GAS: require('./../transactions/GAS'),
//  GACS: require('./../transactions/GACS')
};

var fs = require('fs');
var dive = require('dive');
/*
templates.GAS = JSON.parse(fs.readFileSync('./GAS.json').toString());
templates.GACS = JSON.parse(fs.readFileSync('./GACS.json').toString());
*/
dive(process.cwd() + '/transactions', { recursive: false }, function(err, file) {
  if (err) throw err;
  if (file.slice(-5) === ".json") {
    var tran = file.match(/([^\\]*)\.json$/)[1];
    templates[tran] = JSON.parse(fs.readFileSync(file).toString());
    console.log("loaded " + tran + ".json");
  }
});

function pad(template, value) {
  if (template.type === 'X') {
    //console.log(template, value);
    return value + Array(+template.size + 1 - value.length).join(' ');
  }
  return Array(+template.size + 1 - value.length).join('0') + value;
}

function parseJSON(data) {
  if (!data) {
    return data;
  }
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  //var in_template = templates[data['transaction-code']].input;
  var base_template = templates[data['transaction-code']];
  /*
  var in_template = [];
  in_template.push(base_template.children[0]);
  base_template.children[1].children.forEach(function(field) {
    in_template.push(field);
  });
  */
  var in_template = [].concat(base_template.children[0], base_template.children[1].children);
  //console.log(in_template);

  console.log('parseJSON start: ' + JSON.stringify(data));
  var str = in_template.reduce(function(prev, field) {
    return prev + pad(field, data[field.name] || data[field.name.toLowerCase()] || '');
  }, '');
  console.log('parseJSON finish: ' + str);

  return str;
}

function buildJSON(tran, str) {
  /*
  var template = templates[tran];
  if (template['returns input?']) {
    template = template.input.concat(template.output);
  } else {
    template = template.output;
  }
  */
  var template = [];
  var base_template = templates[tran];
  if (base_template['returns input?']) {
    template = [].concat(base_template.children[0], base_template.children[1].children);
  }
  template = base_template.children.slice(2).reduce(function(prev, curr) {
    return prev.concat(curr.children);
  }, template);

  //console.log(template);

  var i = 0;
  function buildResponse(structure, str) {
    var obj = {};
    structure.forEach(function(field, index) {
      if (field.children) {
        if (!field.size || field.size == 1) {
          if (field.alias) {  // TODO: improve logic for handling 'alias'
            i -= structure[index - 1].size;
          }
          obj[field.name] = buildResponse(field.children, str);
        } else {
          obj[field.name] = [];
          for (var j=0; j < field.size; j++) {
            obj[field.name].push(buildResponse(field.children, str));
          }
        }
      } else {
        obj[field.name] = str.slice(i, i + field.size);
        i += field.size;
      }
    });
    return obj;
  }
  return buildResponse(template, str);
}

module.exports.parseJSON = parseJSON;
module.exports.buildJSON = buildJSON;