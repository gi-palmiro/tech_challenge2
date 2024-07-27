class db_gateway { 

    constructor() {

    }

    getDb() { 

        const mysql = require('mysql');  

        const db_con = mysql.createConnection({
            host: "tech-challenge-2.cz0cqws8o34b.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "HsZe0R5R5HpuqafF1vfH",
            database: "tech-challenge"
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
      }); 

    }      
}

module.exports = db_gateway;