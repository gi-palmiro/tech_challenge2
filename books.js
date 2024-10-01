class books {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into books (Nome, Autor, Editora, Genero, Preco, Imagem) values (?, ?, ?, ?, ?, ?)"; 

        var params = [];

        params.push(jsonData["Nome"]);  
        params.push(jsonData["Autor"]); 
        params.push(jsonData["Editora"]);
        params.push(jsonData["Genero"]);
        params.push(jsonData["Preco"]);
        params.push(jsonData["Imagem"]);

        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

        let sql = "SELECT Id, Nome, Autor, Editora, Genero, Preco, Imagem FROM books";
        let params = []; 
    
        if (resourceId) {
            sql += " WHERE Id = ?";               
            params.push(resourceId);    
        }
    
    
        this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update books set Nome = ?, Autor = ?, Editora = ?, Genero = ?, Preco = ?, Imagem = ? where Id = ?";

        var params = [];

        params.push(jsonData["Nome"]);  
        params.push(jsonData["Autor"]); 
        params.push(jsonData["Editora"]);
        params.push(jsonData["Genero"]);
        params.push(jsonData["Preco"]);
        params.push(jsonData["Imagem"]);
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