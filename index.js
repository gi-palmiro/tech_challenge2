
//  var db_gateway    = require('./db_gateway.js');
//  var http_requests = require('./http_requests.js');
//  var books = require('./books.js');   

//  const http = require('http');
//  const hostname = '127.0.0.1';
//  const port = 5000;
//  const cors = require('cors');
//  const express = require('express');
//  const app = express();

//  app.use(cors());

//  const server = http.createServer((req, res) => { 

//      var dg = new db_gateway();
//      var httpRequest = new http_requests(req);
//      var book = new books(dg); 

//      var payload = "";            

//      req.on('data', function (data) {
//          payload += data;
//      });      

//      req.on('end', function () {

//          function callBack(err, result) {

//              res.statusCode = 200;

//              res.setHeader('Content-Type', 'application/json');

//              var response = {}

//              if (err) { 
//                  response["error"] = err.message;
//              } else {
//                  response["data"] = result; 
//              }

//              res.write(JSON.stringify(response, null, 4));
//              res.end();
//          }

//          resourceId = httpRequest.resourceId;

//          switch (req.method) { 

//              case "POST":

//                  jsonData =  JSON.parse(payload); 

//                  book.insertRecord(jsonData, callBack);

//                  break;

//              case "PUT": 

//                  jsonData =  JSON.parse(payload); 

//                  book.updateRecord(resourceId, jsonData, callBack);

//                  break;

//              case "DELETE": 

//                  book.deleteRecord(resourceId, callBack);

//                  break; 

//              case "GET":  

//                  book.getRecords(resourceId, callBack); 

//                  break; 
//          }

//      });
//  });

//  server.listen(port, hostname, () => {
//      console.log(`Server running at http://${hostname}:${port}/`);
//  });

const express = require('express');
const cors = require('cors');
const app = express();
const hostname = '127.0.0.1';
const port = 5000;

// Middleware CORS
app.use(cors());
app.use(express.json());


const db_gateway = require('./db_gateway.js');
const http_requests = require('./http_requests.js');
const books = require('./books.js');
const wishList = require('./wish_list.js');

// Rotas e lógica de API
// app.post('/books', (req, res) => {
//     const dg = new db_gateway();
//     const book = new books(dg);
//     const jsonData = req.body;

//     book.insertRecord(jsonData, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ data: result });
//     });
// });

// app.put('/books/:id', (req, res) => {
//     const dg = new db_gateway();
//     const book = new books(dg);
//     const resourceId = req.params.id;
//     const jsonData = req.body;

//     book.updateRecord(resourceId, jsonData, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ data: result });
//     });
// });

// app.delete('/books/:id', (req, res) => {
//     const dg = new db_gateway();
//     const book = new books(dg);
//     const resourceId = req.params.id;

//     book.deleteRecord(resourceId, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ data: result });
//     });
// });

app.get('/books', (req, res) => {
    const dg = new db_gateway();
    const book = new books(dg);
    const resourceId = req.params.id;
    
    book.getRecords(resourceId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: result });
    });
});


app.get('/wishList', (req, res) => {
    const dg = new db_gateway();
    const wishlistInstance = new wishList(dg); // Renomeie a instância para evitar conflito
    const resourceId = req.params.id;
    
    wishlistInstance.getRecords(resourceId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: result });
    });
});

app.post('/postWishList', (req, res) => {
    const dg = new db_gateway();
    const wishlistInstance = new wishList(dg);
   
    const jsonData = req.body;
    
    wishlistInstance.insertRecord(jsonData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Registro inserido com sucesso!", data: result });
    });
});

app.put('/updateWishList/:id', (req, res) => {
    const dg = new db_gateway();
    const wishlistInstance = new wishList(dg);
    const resourceId = req.params.id;
    const jsonData = req.body;

    wishlistInstance.updateRecord(resourceId, jsonData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Registro alterado com sucesso!", data: result });
    });
});
    


app.delete('/deleteWishList/:id', (req, res) => {
    const dg = new db_gateway();
    const wishlistInstance = new wishList(dg);
    const resourceId = req.params.id;

    wishlistInstance.deleteRecord(resourceId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: result });
    });
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});