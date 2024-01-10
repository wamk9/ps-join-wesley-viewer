import React, { useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import ConfirmDelete from 'src/layouts/components/custom/ConfirmDelete'

export default function AdicionarCategoriaProduto() {
  const obj = Object.create({})

  const handleSave = () => {
    const api = axios.create({
      baseURL: 'http://localhost:8000/api/'
    })

    api
      .post('/categoria-produto', obj, {
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
    obj[key] = value
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
                defaultValue=''
                onInput={e => setObjAttr(e.target.value, 'nome_categoria')}
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
