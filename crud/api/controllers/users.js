import { db } from '../db.js'

// função para buscar o usuário usando o metodo get
export const getUsers = (_, res) => {
  // não precisa usar reuest pois vai efetuar o get em todos os usuarios
  const q = 'SELECT * FROM usuarios' //ordem do select para ser passada pro banco

  //faz a chamada do banco e efetua a querry
  //primeiro paramtro vai ser a ordem select e o segundo uma arrow fuction para verificar se possui erro ou não e retornar os dados coletados
  db.query(q, (err, data) => {
    if (err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addUser = (req, res) => {
  // vai ser usado como parametro a requisição e aresposta
  //esta é a query para ser enviada ao baco
  const q = 'INSERT INTO usuarios(nome,email,fone,data_nascimento) VALUES(?)'
  //esse array vai oocupar o interrogação da query em values
  const values = [
    // os valores estão sedo coletados do body da aplicação , connforme o campo de preenchimento
    //aqui qque entra a importacia de pegar o nome correto do input
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento
  ]
  //aqui é chamado o banco e usado o metodo para efetuar a query, então se passa de parametro a query,o complento dos values , e o erro para ser tratado caso ocorra
  db.query(q, [values], err => {
    if (err) return res.json(err)

    return res.status(200).json('Usuário criado com sucesso.')
  })
}

export const updateUser = (req, res) => {
  const q =
    'UPDATE usuarios SET nome = ?, email = ?, fone = ?, data_nascimento = ? WHERE id = ?'

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento
  ]

  db.query(q, [...values, req.params.id], err => {
    if (err) return res.json(err)

    return res.status(200).json('Usuário atualizado com sucesso.')
  })
}

export const deleteUser = (req, res) => {
  const q = 'DELETE FROM usuarios WHERE id = ?'

  db.query(q, [req.params.id], err => {
    if (err) return res.json(err)

    return res.status(200).json('Usuário deletado com sucesso.')
  })
}
