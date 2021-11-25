const fs = require('fs');
const str = require('@supercharge/strings')
const express = require('express');
const Promise = require('bluebird');
const fsa = Promise.promisifyAll(require('fs'));

class Server {
    
    port;   // wich port to run the express server on
    app;    // the exptess app
    
    constructor(port = 80) {
        this.port = port
        this.app = express();
        this.app.set('view engine', 'ejs')
    }
    
    run() {
        this.app.listen(this.port, () =>{
            console.log('Express server is running on port' + this.port)
        });
    }
    
    random() {
        return str.random(10);
    }
    
    file(code, name, res) {
        let upload = {
            "Code": code,
            "Name": name,
            "Date": new Date()
        };
        let json = JSON.stringify(upload);
        let file = this.random();
        fs.writeFile("json/"+file + ".json", json, (err) => {
            if (err) {
                console.log(err)
            }
        })
        return res.redirect("http://localhost/"+file)
    }
    
    read(file, res) {
        fs.readFile("json/" +file+'.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                res.send('not found')
            } else {
                let code = JSON.parse(data).Code;
                res.render(__dirname + '/../views/ressend.ejs', {
                    code: code,
                    url: "http://localhost/" + file
                })
            }
        })
    }
}


module.exports = { Server }