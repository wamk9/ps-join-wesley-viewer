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

const CategoriaProduto = () => {
  const [listCategoriaProduto, setListCategoriaProduto] = React.useState([])

  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false)
  const [objSelected, setObjSelected] = React.useState({})

  // let showDeleteConfirmation
  // let objSelected

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
      .then(response => setListCategoriaProduto(response.data.message))
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
            title='Categorias de Produtos'
            action={
              <Button variant='outlined' href='/categoria-produto/adicionar' startIcon={<AddIcon />}>
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
                    <TableRow key={row.id_categoria_planejamento}>
                      <TableCell component='th' scope='row' width='80px'>
                        {row.id_categoria_planejamento}
                      </TableCell>
                      <TableCell>{row.nome_categoria}</TableCell>
                      <TableCell align='center' width='100px'>
                        <IconButton
                          aria-label='delete'
                          size='small'
                          href={'/categoria-produto/editar/?id=' + row.id_categoria_planejamento}
                        >
                          <EditIcon fontSize='inherit' />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          size='small'
                          onClick={() => {
                            api
                              .delete('/categoria-produto/' + row.id_categoria_planejamento, {
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

                            setListCategoriaProduto(
                              listCategoriaProduto.filter(
                                object => object.id_categoria_planejamento !== row.id_categoria_planejamento
                              )
                            )

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

export default CategoriaProduto
