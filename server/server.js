const http = require('http');
const app = require('./app')
const debug = require('debug')('node-angular')
 
 
const port= 3000;
app.set('port',port);
const server = http.createServer(app);

 
 server.listen(port);  
console.log('server started at port ' , port);  