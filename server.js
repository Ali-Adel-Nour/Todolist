const http = require('http')

const url = require('url');
const items = [];
var server = http.createServer(function(req, res){
switch (req.method) {
case 'POST':
let item = '';
req.setEncoding('utf8');
req.on('data', function(chunk){
item += chunk;
});
req.on('end', function(){
items.push(item);
res.end('OK\n');
});
break;
case 'GET':
items.forEach(function(item, i){
res.write(i + ') ' + item + '\n');
});
res.end();
break;
}
let body = items.map(function(item, i){
    return i + ') ' + item;
    }).join('\n');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
    res.end(body);

});
server.listen(3000)
