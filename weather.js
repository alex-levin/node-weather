// node install request

const http = require('http');
const request = require('request');

function init() {
    // Request URL and headers
    var options = {
        // url: 'https://api.weather.gov/points/42.2856,-71.3851',
        url: 'https://api.weather.gov/gridpoints/BOX/60,71/forecast',
        // url: 'https://api.weather.gov/gridpoints/BOX/60,71/forecast/hourly',
        headers: {
            'User-Agent': 'request',
            'accept': 'application/json'
        }
    };
    
    return new Promise(function(resolve, reject) {
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}

http.createServer(function (req, res) {
   var promise = init();
   promise.then(function(result) {
       console.log(result);
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.write(
          JSON.stringify(result, true, 2));
       res.end();
   }, function(err) {
       console.log(err);
   })
}).listen(9000);
