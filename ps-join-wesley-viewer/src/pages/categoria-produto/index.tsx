import React, { useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

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

import ConfirmDelete from 'src/layouts/components/ConfirmDelete'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

function createData(id: number, name: string) {
  return { id, name }
}

const rows = [
  createData(1, 'teste1'),
  createData(2, 'teste'),
  createData(3, 'teste1234'),
  createData(4, 'kkkkk'),
  createData(5, 'oeeeeee')
]

const CategoriaProduto = () => {
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const [categoriaProdutoToDelete, setCategoriaProdutoToDelete] = React.useState({})
  const [listCategoriaProduto, setListCategoriaProduto] = React.useState([])

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
      .then(response => setListCategoriaProduto(response.data))
      .catch(err => {
        console.error('ops! ocorreu um erro ' + err)
      })
  }, [])

  const handleDeleteOpen = (categoriaProduto: object) => {
    setCategoriaProdutoToDelete(categoriaProduto)
    setConfirmDelete(true)
  }

  const handleDeleteClose = () => {
    setConfirmDelete(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <React.Fragment>
          <Dialog
            open={confirmDelete}
            onClose={handleDeleteClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {"Deseja realmente deletar a categoria de produto '" + categoriaProdutoToDelete?.nome + "'?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Lembre-se que esta ação não poderá ser desfeita!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose}>Cancelar</Button>
              <Button onClick={handleDeleteClose} autoFocus>
                Deletar
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <Card>
          <CardHeader
            title='Categorias de Produtos'
            action={
              <Button variant='outlined' href='/produto/adicionar' startIcon={<AddIcon />}>
                Adicionar
              </Button>
            }
          ></CardHeader>
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell align='center'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listCategoriaProduto.map(row => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row' width='80px'>
                        {row.id}
                      </TableCell>
                      <TableCell>{row.nome}</TableCell>
                      <TableCell align='center' width='130px'>
                        <IconButton aria-label='delete' size='small'>
                          <VisibilityIcon fontSize='inherit' />
                        </IconButton>
                        <IconButton aria-label='delete' size='small'>
                          <EditIcon fontSize='inherit' />
                        </IconButton>
                        <IconButton aria-label='delete' size='small' onClick={() => handleDeleteOpen(row)}>
                          <DeleteIcon fontSize='inherit' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CategoriaProduto
