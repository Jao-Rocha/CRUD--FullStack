import React, { Fragment, useEffect, useState } from 'react'
// import './index.css'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Form from './components/Form'
import Grid from './components/Grid'
import axios from 'axios'

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
  font-family:'poppins', 'sans-serif';
}
body {
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  background-color:#f2f2f2;
}
`

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const Title = styled.h2`
  margin: auto;
`

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8800')
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    //vai ficar de olho no setUsers, toda vez mudar que for usado vai usar o metodo getUsers()
    getUsers()
  }, [setUsers])

  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </Fragment>
  )
}

export default App
