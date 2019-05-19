const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
function Convertor(filename) {
    var comand = 'soffice --headless --convert-to pdf '
    if(filename){
        comand += filename;
    }
    var newFilename = path.parse(`${filename}`).name
    console.log(comand);
    var prom = new Promise((res, rej) => {
        if(shell.exec(`${comand}`).code != 0){
            console.log('error');
            shell.exit(1);
        };
        //var newFilename = path.parse(`${filename}`).name
        newFilename += '.pdf';
        res(newFilename);
    }).then(newFilename => {
        
        fs.unlink(filename, (err) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                console.log('success');
                
            }
            
        });
        
        
    })
    return newFilename;
};
module.exports = Convertor;

