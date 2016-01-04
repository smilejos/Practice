var zlib = require('zlib');

exports.writeError =  function (msg, res) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.write('ERROR!');
    res.end();
}

exports.redirect = function (location, res) {
    res.writeHead(303, { 'Location': location });
    res.end();
}

exports.writeNotFound = function (res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('Not Found');
    res.end();
}

exports.write = function (string, type, res) {
    zlib.gzip(string, function (err, result) {
        res.writeHead(200, {
          'Content-Length': result.length,
          'Content-Type': type,
          'Content-Encoding': 'gzip'
        });
        res.write(result);
        res.end();
    });
}