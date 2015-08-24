/*
var debug = function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log.apply(console, Array.prototype.slice.call(arguments));
  }
};
*/
var debug = require('debug')('jggj:sceptre');

var templates = require('./templates').getTemplatesHard();

function getInputFormat(tran) {
  //var in_template = templates[tran].input;
  var base_template = templates[tran];
  var in_template = [].concat(base_template.children[0], base_template.children[1].children);
  return in_template;
}

function getOutputFormat(tran) {
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
    template = getInputFormat(tran);
  }
  template = base_template.children.slice(2).reduce(function(prev, curr) {
    return prev.concat(curr.children);
  }, template);

  return template;
}

function pad(template, value) {
  //debug(template, value);
  /*
  if (!('type' in template)) {
    var str = '';
    for (var i=0; i < template.size; i++) {
      str += template.reduce(function(a, field) {
        return a + 
      })
    }
  } else
  */
  if (template.type === 'X') {
    return value + Array(+template.size + 1 - value.length).join(' ');
  } else if (template.type === "9") {
    return Array(+template.size + 1 - value.length).join('0') + value;
  }
  throw new Error("Error preparing SCEPTRE request while padding " + template.name);
}

function getValue(obj, prop) {
  var value;
  if (prop in obj) {
    value = obj[prop];
  } else if (prop.toLowerCase() in obj) {
    value = obj[prop.toLowerCase()];
  } else {
    return '';
  }
  var type = typeof value;
  if (type === "number" || type === "string" || type === "boolean") {
    return '' + value;
  } else {
    throw new Error("Error preparing SCEPTRE request while parsing property "+ prop +". Expected primitive but got "+ typeof value +".");
  }
  return value;
}

// TODO
function normalizeInput(input) {
  var output = {};
  for (var key in input) {
    if (input.hasOwnProperty(key)) {
      output[key.toUpperCase()] = normalizeInput(input[key]);
    }
  }
  return output;
}

function parseJSON(input) {
  //debug(JSON.stringify(input, null, 2));
  //debug(JSON.stringify(normalizeInput(input), null, 2));
  //process.exit();

  debug('parseJSON start: ' + JSON.stringify(input));
  if (!input) {
    return input;
  }
  if (typeof input === "string") {
    input = JSON.parse(input);
  }
  var tran = input['transaction-code'] || input['TRANSACTION-CODE'];

  var in_template = getInputFormat(tran);
  //debug(JSON.stringify(in_template, null, 2));

  function recursiveHelper(template, data) {
    return template.reduce(function(prev, field) {
      if (data === undefined) {
        data = {};
      }
      if (field.children) {
        if (typeof data[field.name] !== "object") {
          data[field.name] = [];
        }
        for (var i=0; i < field.size; i++) {
          prev += recursiveHelper(field.children, data[field.name][i]);
        }
        return prev;
      }
      return prev + pad(field, getValue(data, field.name));
    }, '');
  }
  var output = recursiveHelper(in_template, input);
  debug('parseJSON finish: ' + output);

  //debug('*' + output + '*');
  //process.exit();

  return output;
}

function buildJSON(tran, str) {
  if (str instanceof Buffer) {
    str = str.toString();
  }
  var template = getOutputFormat(tran);
  //debug(template);

  var i = 0;
  function buildResponse(structure) {
    var obj = {};
    structure.forEach(function(field, index) {
      if (field.children) {
        if (!field.size || field.size == 1) {
          if (field.alias) {  // TODO: improve logic for handling 'alias'
            i -= structure[index - 1].size;
          }
          obj[field.name] = buildResponse(field.children);
        } else {
          obj[field.name] = [];
          for (var j=0; j < field.size; j++) {
            obj[field.name].push(buildResponse(field.children));
          }
        }
      } else {
        obj[field.name] = str.slice(i, i + field.size);
        i += field.size;
      }
    });
    return obj;
  }
  return buildResponse(template);
}

module.exports.parseJSON = parseJSON;
module.exports.buildJSON = buildJSON;
module.exports.getInputFormat = getInputFormat;
module.exports.templates = templates;