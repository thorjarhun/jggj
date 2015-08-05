/*
var Transform = require('stream').Transform;

var parser = new Transform();
parser._transform = function(data, encoding, done) {
  this.push(data);
  done();
};

// Pipe the streams
process.stdin
  .pipe(parser)
  .pipe(process.stdout);

// Some programs like `head` send an error on stdout
// when they don't want any more data
process.stdout.on('error', process.exit);
*/

var argv = require('minimist')(process.argv.slice(2), {
  string: ['i', 'o', 'r'],
  alias: {
    i: ['in', 'input', 'file'],
    o: ['out', 'output'],
    r: ['ri', 'returnsInput']
  }
});
if (!('i' in argv)) {
  if (!argv._.length) {
    console.log("Input file name required.");
    process.exit();
  }
  argv.i = argv._[0];
}

var _ = require('lodash');

var fs = require('fs');
var obj = fs.readFileSync(argv.i.trim()).toString().split('\n').map(function(line) {
  if (line[0] === "0") {
    //return line.match(/\d{6}(.*)\d{8}/)[1].trim();
    return line.match(/\d{6}([^\.]*).*\d{8}/)[1].trim();
  }
  //return line.match(/[^\.]*/);
  return line.match(/[^\.]*/)[0].trim();
}).reduce(function(a, line) {
  if (line.match(/\d{2} /)) {
    a.push(line);
  } else {
    a[a.length - 1] += ' ' + line;
  }
  return a;
}, []);
//.join('\n');
//console.log(obj);
//process.exit();


var obj = obj.reduce(function(a, line) {
  var sections = line.split(/\s+/).reduce(function(a, item, i, arr) {
    //debugger;
    if (i === 0) {
      a.level = item;
    } else if (i === 1) {
      a.name = item;
    } else if (i === 3) {
      if (arr[2] === "OCCURS") {
        //a.children = [];
        a.size = +item;
      } else if (arr[2] === "REDEFINES") {
        //a.children = [];
        //a.size = 1;
        a.alias = item;
      } else {
        a.pic = item;
      }
    }
    return a;
  }, {});

  a.push(sections);
  return a;
}, []).filter(function(item) {
  return !_.isEmpty(item) && item.level != 88 && item.name !== "LINE-LENGTH-01" && item.name !== "ZZ01";
});

obj = obj.reduce(function(a, line) {
  if (line.level === 'PIC') {
    var lastItem = a[a.length - 1];
    lastItem.pic = line.name;
  } else {
    a.push(line);
  }
  return a;
}, []);

obj.map(function(field) {
  //console.log(field);
  if (!field.pic) {
    console.assert(!field.children);
    field.children = [];
    if (!field.size) {
      field.size = 1;
    }
  } else {
    field.type = field.pic[0];
    //console.log(field.pic);
    var size = field.pic.slice(1).match(/\d+/);
    field.size = size && +size[0] || 1;
  }
  delete field.pic;
  //console.log(field);
  if (field.name[field.name.length - 1] === ".") {
    field.name = field.name.slice(0, field.name.length - 1);
  }
});

//console.log(JSON.stringify(obj, null, 2));
/*
function nest(arr) {
  var root = arr[0];
  arr.slice(1).forEach(function(field) {
    console.log(field);
    var parent = root;
    while (parent.children.length && +field.level > +parent.children[parent.children.length - 1].level) {
      parent = parent.children[parent.children.length - 1];
    }
    parent.children.push(field);
  });

  return root;
}
obj = nest(obj);
*/

obj = obj.slice(1).reduce(function(root, field) {
  //console.log(field);
  var parent = root;
  while (parent.children.length && +field.level > +parent.children[parent.children.length - 1].level) {
    parent = parent.children[parent.children.length - 1];
  }
  parent.children.push(field);
  return root;
}, obj[0]);


if ('r' in argv) {
  obj["returns input?"] = true;
}

console.log(JSON.stringify(obj, null, 2));
verify(obj);

//if (process.argv[3]) {
if ('o' in argv) {
  fs.writeFile(argv.o.trim(), JSON.stringify(obj, null, 2), function (err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  })
}

/*
function DFS(obj, func) {
  func(obj);
  if (obj.children) {
    obj.children.forEach(function(child) {
      DFS(child, func);
    });
  }
}
*/

function verify(obj) {
  if (!obj.name) {
    throw new Error("missing name");
  } else if (obj.name != obj.name.trim()) {
    throw new Error(obj.name + " - name contains whitespace");
  } else if (!obj.size) {
    throw new Error(obj.name + " - missing size");
  } else if (!parseInt(obj.size)) {
    throw new Error(obj.name + " - improper size");
  } else if (!obj.level) {
    throw new Error(obj.name + " - missing level");
  } else if (!parseInt(obj.level)) {
    throw new Error(obj.name + " - improper level");
  } else if (obj.children) {
    obj.children.forEach(function (child) {
      verify(child);
      if (obj.level >= child.level) {
        throw new Error(obj.name + " - level too high");
      }
    });
  }
}