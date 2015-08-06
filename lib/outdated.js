//proxy_res.headers['Access-Control-Allow-Origin'] = '*';
//proxy_res.headers['Access-Control-Allow-Headers'] = 'Content-Type';//req.headers['Access-Control-Request-Headers'];
//res.writeHead(proxy_res.statusCode, proxy_res.headers);

var options = {
  hostname: 'localhost',
  port: 9080,
  path: '/PCW/rest/api/proxy',
  method: 'POST',
  headers: _.extend(_.omit(req.headers, 'content-length'), { 'Content-Type' : 'application/json; charset=utf-8' })
};

function serialize(obj, prefix) {
  return _.map(function(v, p) {
    var k = prefix ? prefix + "[" + p + "]" : p;
    return (typeof v == "object" ?
      serialize(v, k) :
    encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }).join("&");
}

function serialize(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

function serialize( obj ) {
  // a -> accumulator
  // k -> key
  return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}
