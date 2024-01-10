import React, { useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Button from '@mui/material/Button'

export default function EditarCategoriaProduto() {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get('id')
  const [objToUpdate, setObjToUpdate] = React.useState({ nome_categoria: '' })

  const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
  })

  useEffect(() => {
    api
      .get('/categoria-produto/' + id, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => setObjToUpdate(response.data.message))
      .catch(err => {
        console.error('ops! ocorreu um erro ' + err)
      })
  }, [])

  const handleSave = () => {
    const api = axios.create({
      baseURL: 'http://localhost:8000/api/'
    })

    api
      .put('/categoria-produto/' + id, objToUpdate, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => (window.location.href = '/categoria-produto'))
      .catch(err => {
        console.error('ops! ocorreu um erro ' + err)
      })
  }

  const setObjAttr = (value, key) => {
    let obj_tmp
    obj_tmp = JSON.parse(JSON.stringify(objToUpdate))
    obj_tmp[key] = value
    setObjToUpdate(obj_tmp)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Adicionar Categoria de Produtos'></CardHeader>
          <CardContent>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' }
              }}
              noValidate
              autoComplete='off'
            >
              <TextField
                required
                id='outlined-required'
                label='Required'
                value={objToUpdate.nome_categoria}
                onChange={e => setObjAttr(e.target.value, 'nome_categoria')}
              />
            </Box>

            <Button sx={{ my: 5, float: 'right' }} onClick={handleSave} variant='contained'>
              Salvar
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
