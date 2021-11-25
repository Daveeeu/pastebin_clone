const bodyParser = require('body-parser');
const Server = require(__dirname+ '/handler/app-handler.js').Server
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


let server = new Server(80);

server.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

server.app.get('/', function (req, res) {
    res.render(__dirname + '/views/index');
})

server.app.post('/', (req, res) =>{
    server.file(req.body.code, req.body.name, res);
})

server.app.get('/:id', (req, res)=> {
    server.read(req.params.id, res)
})

server.run();