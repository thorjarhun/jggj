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
  if (template.type === 'X') {
    //console.log(template, value);
    return value + Array(+template.size + 1 - value.length).join(' ');
  }
  return Array(+template.size + 1 - value.length).join('0') + value;
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

function parseJSON(data) {
  if (!data) {
    return data;
  }
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  var in_template = getInputFormat(data['transaction-code'] || data['TRANSACTION-CODE']);
  //console.log(in_template);

  console.log('parseJSON start: ' + JSON.stringify(data));
  var str = in_template.reduce(function(prev, field) {
    return prev + pad(field, getValue(data, field.name));
  }, '');
  console.log('parseJSON finish: ' + str);

  return str;
}

function buildJSON(tran, str) {
  var template = getOutputFormat(tran);
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
module.exports.getInputFormat = getInputFormat;
module.exports.templates = templates;