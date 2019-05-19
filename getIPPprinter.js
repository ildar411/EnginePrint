const mysql = require('mysql');
var getIPPprinter = (printerName) => {
    var pool = mysql.createPool({
        host : 'localhost',
        user : 'test',
        password : '1',
        database : 'Printers',
        connectionLimit: 10,
    });
    pool.getConnection((err, conn) => {
        if (err) {
            return;
        }
        conn.query(mysql.format('select printerIPP from Printers where (printerName=?)', [printerName]), (err, result) => {
            if(err) {
                return;
            }
            var printerIPP = result[0].printerIPP;
            conn.release();
            return printerIPP;
        })    
    }) 
}
module.exports = getIPPprinter;