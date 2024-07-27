class books {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into books (Nome, Autor, Editora) values (?, ?, ?)"; 

        var params = [];

        params.push(jsonData["Nome"]);  
        params.push(jsonData["Autor"]); 
        params.push(jsonData["Editora"]);

        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

         var sql = "select Id, Nome, Autor, Editora from books";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " where Id = ?";               
             params.push(resourceId);    
         }

         this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update books set Nome = ?, Autor = ?, Editora = ? where Id = ?";

        var params = [];

        params.push(jsonData["Nome"]);  
        params.push(jsonData["Autor"]); 
        params.push(jsonData["Editora"]);
        params.push(resourceId); 

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "delete from books where Id = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = books;