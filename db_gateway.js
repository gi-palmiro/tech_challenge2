var env = require("dotenv").config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

class db_gateway { 

    constructor() {

    }

    getDb() { 

        const mysql = require('mysql');  

        const db_con = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
         }); 

        db_con.connect(function(err) {
            if (err) {               
                console.log(err.message);             
            }                    
        });

        return db_con;
    } 

    execute(sql, params, callBack) {

       var db_con = this.getDb();        

       db_con.query(sql, params, function (err, result) {
           if (err) {
               callBack(err, null);                   
           } else {
               callBack(null, "Success");          
           }   
           
           db_con.end((err) => {
            if (err) {
              console.log("Erro ao fechar a conexão:", err.message);
            }
         });

      }); 

    }      

    query(sql, params, callBack) {

       var db_con = this.getDb();        

       db_con.query(sql, params, function (err, result) {
           if (err) {
               callBack(err, null);                   
           } else {
               callBack(null, result);          
           }         
           db_con.end((err) => { 
            if (err) {
              console.log("Erro ao fechar a conexão:", err.message);
            }
         });
      }); 

    }      
}

module.exports = db_gateway;