// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Seja bem-vindo!'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Este é um projeto referente ao processo seletivo criado pela Join!</Typography>
            <Typography>O projeto em si foi desenvolvido por Wesley Andrade Matos.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
