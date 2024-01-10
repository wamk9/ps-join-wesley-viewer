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

//import Select from 'src/@core/theme/overrides/select'
import { Select, MenuItem } from '@mui/material'

const EditarProduto = () => {
  const [objToUpdate, setObjToUpdate] = React.useState({
    nome_produto: '',
    valor_produto: 0.0,
    id_categoria_produto: 0,
    categoria_produto: {
      id_categoria_planejamento: 0
    }
  })
  const [categoriaProduto, setCategoriaProduto] = React.useState([])

  const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
  })

  useEffect(() => {
    api
      .get('/categoria-produto', {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => setCategoriaProduto(response.data.message))
      .catch(err => {
        console.error('ops! ocorreu um erro ' + err)
      })
  }, [])

  const handleSave = () => {
    const api = axios.create({
      baseURL: 'http://localhost:8000/api/'
    })

    api
      .post('/produto', objToUpdate, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => (window.location.href = '/produto'))
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

  const setObjCategoria = value => {
    let obj_tmp
    obj_tmp = JSON.parse(JSON.stringify(objToUpdate))
    obj_tmp.categoria_produto.id_categoria_planejamento = value
    obj_tmp.id_categoria_produto = value
    setObjAttr(obj_tmp.categoria_produto.id_categoria_planejamento, 'id_categoria_produto')
    setObjToUpdate(obj_tmp)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Adicionar Produtos'></CardHeader>
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
                value={objToUpdate.nome_produto}
                onChange={e => setObjAttr(e.target.value, 'nome_produto')}
              />
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Categoria de Produto'
                onChange={e => setObjCategoria(e.target.value)}
                sx={{
                  my: 5,
                  width: '100%'
                }}
              >
                {categoriaProduto.map(row => (
                  <MenuItem key={row.id_categoria_planejamento} value={row.id_categoria_planejamento}>
                    {row.nome_categoria}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                required
                id='outlined-required'
                label='Required'
                value={objToUpdate.valor_produto.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                onChange={e =>
                  setObjAttr(e.target.value.toLocaleString('en-GB', { minimumFractionDigits: 2 }), 'valor_produto')
                }
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

export default EditarProduto
