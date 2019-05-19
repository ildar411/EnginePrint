const express = require('express');
const fs = require('fs');
const cups = require('./cups');
const getIpp = require('./getIPPprinter');
const convector = require('./Convertor');
const fileupload = require('express-fileupload');

var app = express();
app.use(fileupload({
    safeFileNames: true,
    preserveExtension: 4}));
    
app.post('/upload', (request, response) => {
    
        if (Object.keys(request.files).length == 0){
            return response.sendStatus(400);
        };
        
        console.log(request);
        var prom1 = new Promise((res, rej) => {
            console.log('prom1');
            let file = request.files.file;
            console.log(file);
            file.mv('./trash/' + file.name, err => {
                if(err){
                    console.log("error of file upload");
                    return response.sendStatus(500);
                }
                console.log('fileupload');
                let path = '/home/ildar/EnginePrintCUPS/trash/' + file.name;
                res(path);        
            })
        });
        prom1.then(path => {
            var prom2 = new Promise((res, rej) => {
                console.log('prom2');
                try {
                    var newPath = convector(path);
                    res(newPath);    
                } catch (error) {
                    console.log('error of file convector');
                }                
            });
            return prom2;
        }).then(newPath => {
            var prom3 = new Promise((res, rej) => {
                var option = {
                    duplex : false,
                    numOfCopy : '',
                    numUp : '',
                    printer : '',
                    landscape : false,
                    border : '',
                }
                
                option.duplex = request.body.duplex;
                option.numOfCopy = request.body.numOfCopy;
                option.numUp = request.body.numUp;
                option.printer = request.body.printer;
                option.border = request.body.border;
                option.landscape = request.body.landscape;
                console.log('prom3');
                try {
                    console.log('start of cups');
                    var status = cups(newPath, option);
                    res(status);
                } catch(error) {
                    console.log('error of start cups');
                }
            })
            return prom3
        }).then(status => {
            response.sendStatus(status);
        })
        //.catch(status => {
          //  return response.sendStatus(status);
       // })
    
});
app.listen(3000, err => {
    if(err){
        console.log(err);
    }
    console.log('start');
});