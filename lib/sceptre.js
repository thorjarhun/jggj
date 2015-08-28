var debug = require('debug')('jggj:sceptre');
var templates = require('./templates').getTemplatesHard();
var _ = require('lodash');

function hideEmpty(obj) {
  if (process.env.NODE_ENV === "test") {
    return obj;
  }
  function isEmpty(obj) {
    if (typeof obj === "number" || (typeof obj === "string" && obj.trim())) {
      return false;
    } else if (typeof obj === "object") {
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (!isEmpty(obj[k])) {
            return false;
          }
        }
      }
    }
    return true;
  }
  if (typeof obj !== "object") {
    return obj;
  }
  var o = {};
  if (_.isArray(obj)) {
    o = [];
  }
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var v = obj[k];
      if (!isEmpty(v)) {
        o[k] = hideEmpty(v);
      }
    }
  }
  return o;
}

/*
function hideEmpty(obj) {
  var o = {};
  if (_.isArray(obj)) {
    o = [];
  }
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var v = obj[k];
      if (v) {
        if (typeof v !== "object" && !(typeof v === "string" && !v.trim())) {
          o[k] = v;
        } else {
          var temp = hideEmpty(v);
          if (temp) {
            o[k] = temp;
          }
        }
      }
    }
  }
  return o;
}
*/
/*
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
  *//*
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
*/
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

function capitalizeKeys(input) {
  if (typeof input !== "object") {
    return input;
  }
  var output = {};
  for (var key in input) {
    if (input.hasOwnProperty(key)) {
      output[key.toUpperCase()] = capitalizeKeys(input[key]);
    }
  }

  return output;
}

/*
function makeComplete(input, template) {
  var output = [];
  var obj = {};
  obj[template.name] = [];
  output.push(obj);

  if ()

  template.children.forEach(function(v, k) {
    if (!v.children) {
      output[v.name] = input[v.name] || "";
    } else {
      output[v.name] = makeComplete(input, v);
    }
  });
  return output;
}
*/
/*
function makeComplete(input, template) {
  console.log("makeComplete called with: ", input, template);
  var output = {};
  var root = {};
  output[template.name] = [root];
  template.children.forEach(function(v, k) {
    if (v.children) {
      //root[v.name] = makeComplete(input, v)[v.name];
      root[v.name] = [];
      for (var i=0; i < v.size; i++) {
        root[v.name].push(makeComplete(input && (input[template.name] && input[template.name][0] && input[template.name][0][v.name] || (input[v.name] && input[v.name][i])) || input, v)[v.name][0]);
      }
    } else {
      root[v.name] = input && (input[v.name] || input[template.name] && input[template.name][0] && input[template.name][0][v.name]) || "";
    }
  });
  return output;
}
*/
// TODO: Rewrite less badly
function makeComplete(input, template) {
  /*jshint loopfunc: true */
  //console.log("makeComplete called with: ", input, template);
  var output = {};
  if (template.children) {
    output[template.name] = [];
    for (var i=0; i < template.size; i++) {
      var temp = {};
      output[template.name].push(temp);
      template.children.forEach(function(v, k) {
        //var new_input = input && (input[template.name] && input[template.name][i] && input[template.name][i][v.name] || input[v.name] || input[i] || input);
        if (input) {
          if (input[template.name] && input[template.name][i] && input[template.name[i][v.name]]) {
            new_input = input[template.name][i][v.name];
            delete input[template.name][i][v.name];
          } else if (input.hasOwnProperty(v.name)) {
            new_input = input[v.name];
            delete input[v.name];
          } else if (input.hasOwnProperty(i)) {
            new_input = input[i];
            //delete input[i];
          } else {
            new_input = input;
          }
        } else {
          new_input = "";
        }
        var value = makeComplete(new_input, v);
        if (typeof value === "object") {
          if (!(value.hasOwnProperty(v.name))) {
            value = "";
          } else {
            value = value[v.name];
          }
        }
        temp[v.name] = value;
      });
    }
  } else {
    return input || "";
  }
  
  return output;
}
/* TODO: Account for alias
function buildForm(template) {
  var obj = {};
  template.forEach(function(field, index) {
    if (field.children) {
      if (!field.size || field.size == 1) {
        obj[field.name] = buildForm(field.children);
      } else {
        obj[field.name] = [];
        for (var i=0; i < field.size; i++) {
          obj[field.name].push(buildForm(field.children));
        }
      }
    } else {
      obj[field.name] = "";
    }
  });
  return obj;
}
*/

function fromJSON(input) {
  debug('parseJSON start: ' + JSON.stringify(input, null, 2));
  if (!input) {
    return input;
  }
  if (typeof input === "string") {
    input = JSON.parse(input);
  }

  //debug(JSON.stringify(input, null, 2));

  input = capitalizeKeys(input);
  //debug(JSON.stringify(input, null, 2));

  var tran = input['TRANSACTION-CODE'];
  var template = templates[tran];
  //debug(JSON.stringify(template, null, 2));
  //*
  input = makeComplete(input, template);
  debug(JSON.stringify(hideEmpty(input), null, 2));

  //debug(JSON.stringify(getInputFormat(tran), null, 2));
  //process.exit();

  var in_template = templates[tran];
  /*/
  var in_template = getInputFormat(tran);
  /**/

  function recursiveHelper(template, data) {
    //console.log(template);
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
  var output = _.trimRight(recursiveHelper([in_template], input));
  debug('parseJSON finish: ' + output);

  //debug('*' + output + '*');
  //process.exit();

  return output;
}

function getLength(template) {
  var len = 0;
  if (template.children) {
    template.children.forEach(function(field, k) {
      if (field.children) {
        len += field.size * getLength(field);
      } else {
        len += field.size;
      }
    });
  } else {
    len += template.size;
  }
  
  return len;
}


function toJSON(tran, str) {
  if (str instanceof Buffer) {
    str = str.toString();
  }
  //var template = getOutputFormat(tran);
  var template = templates[tran];
  if (str.slice(0, 4) !== tran) {
    str = Array(getLength(template.children[0]) + getLength(template.children[1]) + 1).join(' ') + str;
  }
  //debug(template);
  /*
  debug('len: ' + str.length);
  template.children.forEach(function(v, k) {
    console.log(getLength(v));
  });
  process.exit();
  /**/

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
        var value = str.slice(i, i + field.size);
        obj[field.name] = value;
        i += field.size;
      }
    });
    return obj;
  }
  var output = buildResponse([template]);

  return hideEmpty(output);
}

module.exports.fromJSON = fromJSON;
module.exports.toJSON = toJSON;
//module.exports.getInputFormat = getInputFormat;
module.exports.templates = templates;