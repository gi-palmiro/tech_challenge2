class wishList {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into wish_list (Nome, Email, Livro, Autor, Preco) values (?, ?, ?, ?, ?)"; 

        var params = [];

        params.push(jsonData["Nome"]);  
        params.push(jsonData["Email"]); 
        params.push(jsonData["Livro"]);
        params.push(jsonData["Autor"]);
        params.push(jsonData["Preco"]);

        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

        let sql = "SELECT Id, Nome, Email, Livro, Autor, Preco FROM wish_list";
        let params = []; 
    
        // Se um resourceId for fornecido, adiciona um filtro WHERE para buscar pelo Id
        if (resourceId) {
            sql += " WHERE Id = ?";               
            params.push(resourceId);    
        }
    
        // Executa a consulta
        this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update wish_list set Nome = ?, Email = ?, Livro = ?, Autor = ?, Preco = ?, edit = 1 where Id = ?";

        var params = [];

        params.push(jsonData["Nome"]);  
        params.push(jsonData["Email"]); 
        params.push(jsonData["Livro"]);
        params.push(jsonData["Autor"]);
        params.push(jsonData["Preco"]);
        params.push(resourceId); 

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "delete from wish_list where Id = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = wishList;