import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function ConfirmDelete(props) {
  const row = props.row
  let open = props.open

  const handleOpen = () => (open = true)
  const handleClose = () => (open = false)

  return (
    <div style={{ margin: '25%' }}>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Modal Header
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Modal content
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
