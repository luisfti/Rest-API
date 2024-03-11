const client = require('./connection.js')
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())


app.listen(3300, ()=>{
  console.log("Servidor está rodando na porta 3300");
})
client.connect();


app.get('/customers', (req, res)=>{
  client.query(`SELECT * FROM customers`, (err, result)=>{
    if(!err){
      res.send(result.rows);
    }
  });
  client.end;
})

app.get('/customers/:id', (req, res)=>{
  client.query(`SELECT * FROM customers WHERE id=${req.params.id}`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });
  client.end;
})

app.get('/customers/:name', (req, res)=>{
  console.log('teste')
  client.query(`SELECT * FROM customers WHERE name LIKE '%${req.params.name}%'`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });
  client.end;
})

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/customers', (req, res)=> {
  
  const customer = req.body;
  console.log(customer)
  let insertQuery = `INSERT INTO customers(name, email, phone) VALUES('${customer.name}', '${customer.email}', '${customer.phone}')`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Cliente inserido com Sucesso!')
      }
      else{ console.log(err.message) }
  })
  client.end;
})

app.put('/customers/:id', (req, res)=> {
  let user = req.body;
  let updateQuery = `UPDATE customers SET name = '${user.name}', email = '${user.email}', phone = '${user.phone}' WHERE id = ${user.id}`

  client.query(updateQuery, (err, result)=>{
      if(!err){
          res.send('Cliente atualizado com Sucesso!')
      }
      else{ console.log(err.message) }
  })
  client.end;
})

app.delete('/customers/:id', (req, res)=> {
  let insertQuery = `DELETE FROM customers WHERE id=${req.params.id}`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Cliente deletado com Sucesso!')
      }
      else{ console.log(err.message) }
  })
  client.end;
})