import React from 'react'
import {Card, CardContent, Typography} from '@mui/material';

const Dashboard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h2'>Välkommen till Adminpanelen</Typography>
        <Typography className='bg-yellow-200 p-2' variant='p'>Funkar bra att ta bort och ändra information men inte att skapa nya element</Typography>
      </CardContent>
    </Card>
  )
}

export default Dashboard