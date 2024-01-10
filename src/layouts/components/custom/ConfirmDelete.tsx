import * as React from 'react'
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ConfirmDelete = (props: object) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const [objToDelete, setObjToDelete] = React.useState({})
  const [onClose, setOnClose] = React.useState(false)
  const [functionToCall, setFunctionToCall] = React.useState(null)

  setObjToDelete(props.obj)
  setConfirmDelete(props.open)
  setOnClose(props.onClose)

  //setFunctionToCall(props.funcToCall)

  const handleDeleteOpen = (obj: object) => {
    setObjToDelete(obj)
  }

  const handleDeleteClose = deleteThis => {
    if (deleteThis) functionToCall()

    setConfirmDelete(false)
  }

  return (
    <React.Fragment>
      <Dialog
        onClose={onClose}
        open={confirmDelete}
        onClose={handleDeleteClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Deseja realmente deletar a categoria de produto '" + objToDelete?.nome_categoria + "'?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Lembre-se que esta ação não poderá ser desfeita!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDeleteClose(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDeleteClose(true)
            }}
            autoFocus
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default React.memo(ConfirmDelete)
