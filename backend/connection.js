const {Client} = require('pg')

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "luis0507123"
    
})

module.exports = client