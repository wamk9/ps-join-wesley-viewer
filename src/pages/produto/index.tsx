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

import ConfirmDelete from 'src/layouts/components/custom/ConfirmDelete'

const Produto = () => {
  const [listProdutos, setListProdutos] = React.useState([])

  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false)
  const [objSelected, setObjSelected] = React.useState({})

  // let showDeleteConfirmation
  // let objSelected

  const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
  })

  useEffect(() => {
    api
      .get('/produto', {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => setListProdutos(response.data.message))
      .catch(err => {
        console.error('ops! ocorreu um erro ' + err)
      })
  }, [])

  const closeDeleteConfirmation = React.useCallback(() => setShowDeleteConfirmation(false), [])

  const OpenDeleteConfirmation = (row: object) => {
    // objSelected = row
    // showDeleteConfirmation = true

    console.log(row)

    setObjSelected(row)
    setShowDeleteConfirmation(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/*<ConfirmDelete
          obj={objSelected}
          open={showDeleteConfirmation}
          onClose={closeDeleteConfirmation}
          funcToCall={() => {
            console.log('teste')
          }}
        />
        */}
        <Card>
          <CardHeader
            title='Produtos'
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
                    <TableCell>Categoria</TableCell>
                    <TableCell>Data Cadastrado</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell align='center'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listProdutos.map(row => (
                    <TableRow key={row.id_produto}>
                      <TableCell component='th' scope='row' width='80px'>
                        {row.id_produto}
                      </TableCell>
                      <TableCell>{row.nome_produto}</TableCell>
                      <TableCell>{row.categoria_produto.nome_categoria}</TableCell>
                      <TableCell>{new Date(row.data_cadastro).toLocaleString('pt-BR')}</TableCell>
                      <TableCell>{row.valor_produto.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell align='center' width='100px'>
                        <IconButton aria-label='delete' size='small' href={'/produto/editar/?id=' + row.id_produto}>
                          <EditIcon fontSize='inherit' />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          size='small'
                          onClick={() => {
                            api
                              .delete('/produto/' + row.id_produto, {
                                headers: {
                                  Accept: 'application/json'
                                }
                              })
                              .then(response => {
                                /*setListCategoriaProduto(response.data.message)*/
                              })
                              .catch(err => {
                                console.error('ops! ocorreu um erro ' + err)
                              })

                            setListProdutos(listProdutos.filter(object => object.id_produto !== row.id_produto))

                            //OpenDeleteConfirmation(row)
                          }}
                        >
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

export default Produto
