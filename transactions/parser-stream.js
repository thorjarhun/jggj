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
var _ = require('lodash');
var Transform = require('stream').Transform;

module.exports = (function parseStream() {
  var stream = new Transform({objectMode: true});

  stream._transform = function(chunk, encoding, done) {
    var obj = parseCopybook(chunk);
    verify(obj);
    this.push(obj);
    done();
  };
  return stream;
})();

function parseCopybook(copybook) {
  var format = typeof copybook;
  if (copybook instanceof Buffer) {
    format = "buffer";
    copybook = copybook.toString();
  } else if (format !== "string") {
    console.log(copybook);
    throw new Error("parseCopybook expected input of type string but received a " + format + ": " + JSON.stringify(copybook, null, 2));
  }

  function trimSideNumbers(line) {
    if (line[0] === "0") {
      //return line.match(/\d{6}(.*)\d{8}/)[1].trim();
      return line.match(/\d{6}([^\.]*).*\d{8}/)[1].trim();
    }
    //return line.match(/[^\.]*/);
    return line.match(/[^\.]*/)[0].trim();
  }

  function mergeSplitLines(a, line) {
    if (line.match(/\d{2} /)) {
      a.push(line);
    } else {
      a[a.length - 1] += ' ' + line;
    }
    return a;
  }

  function parseLineToObject(a, item, i, arr) {
    //debugger;
    if (i === 0) {
      a.level = item;
    } else if (i === 1) {
      a.name = item.match(/[^\.]*/)[0];
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
  }

  function parseLinesToObjects(a, line) {
    var sections = line.split(/\s+/)
                       .reduce(parseLineToObject, {});
    a.push(sections);
    return a;
  }

  function removeJunkObjects(item) {
    return !_.isEmpty(item) && item.level != 88 && item.name !== "LINE-LENGTH-01" && item.name !== "ZZ01";
  }
  /*
  function mergeSplitObjects(a, line) {
    if (line.level === 'PIC') {
      var lastItem = a[a.length - 1];
      lastItem.pic = line.name;
    } else {
      a.push(line);
    }
    return a;
  }
  */
  function normalizeSizeAndChildren(field) {
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
    //delete field.pic;
    //console.log(field);
    return _.omit(field, 'pic');
  }

  function nest(root, field) {
    //console.log(field);
    var parent = root;
    while (parent.children.length && +field.level > +parent.children[parent.children.length - 1].level) {
      parent = parent.children[parent.children.length - 1];
    }
    parent.children.push(field);
    return root;
  }

  var obj = copybook.split('\n')
                    .map(trimSideNumbers)
                    .reduce(mergeSplitLines, [])
                    .reduce(parseLinesToObjects, [])
                    .filter(removeJunkObjects)
                    //.reduce(mergeSplitObjects, [])
                    .map(normalizeSizeAndChildren)
                    .reduce(nest);

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

  return obj;
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
  } else if (!parseInt(obj.size, 10)) {
    throw new Error(obj.name + " - improper size");
  } else if (!obj.level) {
    throw new Error(obj.name + " - missing level");
  } else if (!parseInt(obj.level, 10)) {
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