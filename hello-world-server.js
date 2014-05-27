var http = require('http');
var url = require('url');
//var defaultJson = {"serverName": "default Name", "ServerIP": "127.0.0.1", "GamePort": "7777", "PeopleRegistered": "0"};
//var defaultJsonDB = [{"serverName": "default Name", "ServerIP": "127.0.0.1", "GamePort": "7777", "PeopleRegistered": "0"}];
var defaultJson = {"ServerIP": "127.0.0.1", "GamePort": "7777", "PeopleRegistered": "0"};
var defaultJsonDB = [{"ServerIP": "127.0.0.1", "GamePort": "7777", "PeopleRegistered": "0"}];

http.createServer(function (req, res) {
    
    
  //res.writeHead(200, {'Content-Type': 'application/json'});

  
  
  var item = '';
  
  switch (req.method) {
    case 'POST'://create
        item = '';
        
        req.setEncoding('utf8');        
        req.on('data', function (chunk) {
          item += chunk;
        });
        
        req.on('end', function () {
          //items.push(item);
        console.log("[receive]" + item);
        var itemJSON = JSON.parse(item);
        var aJSONEntry = defaultJson;
        //aJSONEntry.serverName = itemJSON.serverName;
        aJSONEntry.ServerIP = itemJSON.ServerIP;
        console.log(req.method + " "+ req.headers.host + " " + + JSON.stringify(aJSONEntry));
        //defaultJsonDB[defaultJsonDB.length] = aJSONEntry;
        
        //check if entry exist
        var bExist = false;
       for(var i = 0; i < defaultJsonDB.length; i++)
       {
    	   console.log(defaultJsonDB[i].ServerIP + aJSONEntry.ServerIP +" "+ defaultJsonDB[i].ServerIP == aJSONEntry.ServerIP);
           if(defaultJsonDB[i].ServerIP == aJSONEntry.ServerIP)
               bExist = true;
       }
       
       if(!bExist)
            defaultJsonDB.push(aJSONEntry);
       
        console.log(req.method + " "+ req.headers.host + " " + JSON.stringify(defaultJsonDB));
        //console.log("defaultJsonDB\n" + JSON.stringify(defaultJsonDB));
          res.end('OK\n');
        });
    break;
    case 'PUT'://update
        item = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
          item += chunk;
        });
        req.on('end', function () {
          var path = url.parse(req.url).pathname,
            i = parseInt(path.slice(1), 10);
    
          if (isNaN(i) || i <= 0 ) {
            res.statusCode = 400;
            res.end('Invalid item id');
          } else if (!defaultJsonDB[i]) {
            res.statusCode = 404;
            res.end('Item not found');
          } else {
            var itemJSON = JSON.parse(item);
            var aJSONEntry = defaultJson;
            aJSONEntry.serverName = itemJSON.serverName;
            aJSONEntry.ServerIP = itemJSON.ServerIP;
            defaultJsonDB[i] = aJSONEntry;  
            res.end('i' + i + ' OK\n');
          }
        }); 
    break;
    case 'GET'://retrieve
        //var body = items.map(function (item, i) {
          //return i + ') ' + item;
        //}).join('\n');
        //res.setHeader('Content-Length', Buffer.byteLength(defaultJsonDB));
        var stringoutput = JSON.stringify(defaultJsonDB);
        res.setHeader('Content-Length', stringoutput.toString().length);
        res.setHeader('Content-Type', 'application/json; charset="utf-8"');
        console.log(req.method + " "+ req.headers.host + " " + req.url);
        console.log(JSON.stringify(defaultJsonDB));
        res.end(stringoutput);
    break;
    case 'DELETE'://delete
        var path = url.parse(req.url).pathname;
            i = parseInt(path.slice(9));
            
        if (isNaN(i) || i <= 0 ) {
          res.statusCode = 400;
          res.end('Invalid item id');
        } else if (!defaultJsonDB[i]) {
          res.statusCode = 404;
          res.end('Item not found');
        } else {
          //delete defaultJsonDB[i];
            defaultJsonDB.splice(i,1);
        }
        console.log(req.method + " "+ req.headers.host + " " + JSON.stringify(defaultJsonDB));
    break;
    }
  
}).listen(50001);
console.log('Server running at http://127.0.0.1:50001/');
