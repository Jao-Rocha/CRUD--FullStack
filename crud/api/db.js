import mysql from 'mysql'

export const db = mysql.createConnection({
  //criand conexão
  host: 'localhost', //local ue vai rodar o banco
  user: 'root', //usuário
  password: 'maepai2868aviao', //senha do usuário
  database: 'crud' //nome do banco
})
