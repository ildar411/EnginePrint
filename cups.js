const shell = require('shelljs');
//options
//numOfCopy - int; duplex - boolean; numUp - [2,4,6,9,16]; printer - printerIpp from db;
//filename - path, string; landscape - boolean;
// border - single, single-thick, double, double-thick, none;

var cups = function (filename, options){
    console.log(filename);
    var status;
    var comand = 'lp ';
    var option = options;
    var file = filename;
    if(option.printer){
        comand += '-d ' + `${option.printer}` + ' ';
    };
    if(option.numOfCopy){
        comand += '-n ' + `${option.numOfCopy}` + ' ';
    };
    if(option.duplex != false){
        comand += '-o sides=two-sided-long-edge '; 
    }
    else{
        comand += '-o sides=one-sided ';
    };
    if(option.numUp){
        comand += '-o number-up=' + `${option.numUp}` + ' ';
    }
    if(option.landscape != false){
        comand += '-o orientation-requested=4 ';
    }
    if(option.border){
        comand += '-o page-border=' + option.border + ' ';
    }
    comand += file;
    console.log(comand);
    if (shell.exec(`${comand}`).code != 0){
        console.log('error');
        shell.exit(1);
        status = 500;   
    }
    else{
        status = 200;
    };
    return status;
};
module.exports = cups;
