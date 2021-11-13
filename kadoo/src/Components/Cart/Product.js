import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ProductionQuantityLimits, ShoppingCart } from '@mui/icons-material'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import LightModeIcon from '@mui/icons-material/LightMode'
import NatureIcon from '@mui/icons-material/Nature'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import ButtonGroup from '@mui/material/ButtonGroup'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export default function Product(props) {
  const { product, onAddPlant, onRemovePlant } = props
  const theme = useTheme()

  return (
    <Card sx={{ m: 1.5, p: 1 }}>
      <Grid container sx={{ display: 'flex', m: 1 }}>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          justifyContent='center'
          alignItems='center'
        >
          <CardMedia
            component='img'
            image={product.image}
            alt={product.name}
            sx={{ maxHeight: 180 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CardContent align='Left'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component='div' variant='h5' sx={{ flex: 1 }}>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size='large'
                  aria-label='show 4 new mails'
                  color='inherit'
                  sx={{ color: 'error.main' }}
                  onClick={() => onRemovePlant(product)}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  id='outlined-number'
                  size='small'
                  sx={{ width: 50 }}
                  InputLabelProps={{ shrink: true }}
                  value={product.count}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
                <IconButton
                  size='large'
                  color='inherit'
                  sx={{ color: 'success.main' }}
                  onClick={() => onAddPlant(product)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider sx={{ mt: 0.5, mb: 0.5 }}>
              <Chip label='Info' />
            </Divider>
            <List
              sx={{
                display: {
                  md: 'flex',
                  sm: 'inline',
                  xs: 'flex',
                },
                flexDirection: {
                  md: 'row',
                },
                padding: 0,
              }}
            >
              <ListItem sx={{ color: '#1976d2' }}>
                <ListItemIcon>
                  <InvertColorsIcon style={{ fill: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText sx={{ m: -3 }} primary={product.water} />
              </ListItem>
              <ListItem sx={{ color: '#ed6c02' }}>
                <ListItemIcon>
                  <LightModeIcon style={{ fill: '#ed6c02' }} />
                </ListItemIcon>
                <ListItemText sx={{ m: -3 }} primary={product.light} />
              </ListItem>
              <ListItem sx={{ color: '#4caf50' }}>
                <ListItemIcon>
                  <NatureIcon style={{ fill: '#4caf50' }} />
                </ListItemIcon>
                <ListItemText sx={{ m: -3 }} primary={product.growthRate} />
              </ListItem>
              <ListItem>
                <Chip
                  label={product.price + ' $'}
                  color='success'
                  variant='outlined'
                  style={{ fontSize: '1.1rem' }}
                  sx={{ pt: 0.5, pb: 0.5, pr: 1.5, pl: 1.5 }}
                />
              </ListItem>
            </List>
          </CardContent>
          <Box sx={{ display: 'flex' }}></Box>
        </Grid>
      </Grid>
    </Card>
  )
}
