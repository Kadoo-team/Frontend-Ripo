import * as React from 'react'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'

export default function Basket(props) {
  const { cartItems, toolCartItems, CheckoutCart } = props
  let itemsPrice = cartItems.reduce((a, c) => a + c.count * c.price, 0)
  itemsPrice += toolCartItems.reduce((a, c) => a + c.count * c.price, 0)
  const taxPrice = itemsPrice * 0.09
  const shippingPrice = itemsPrice > 300 ? 0 : 20
  const totalPrice = itemsPrice + taxPrice + shippingPrice
  return (
    <Box>
      <Card sx={{ p: 1 }}>
        <Typography variant='h4' sx={{ m: 1 }}>
          Cart Items
        </Typography>
        <Box sx={{ p: 1 }}>
          {cartItems.length != 0 && (
            <Box>
              <Typography variant='h5' sx={{ m: 0.5 }}>
                Plants
              </Typography>
              <Divider variant='middle' />
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: 'flex', mr: 2, ml: 2, mt: 1 }}
                >
                  <Box sx={{ display: 'flex', flex: 1, textAlign: 'left' }}>
                    <Typography component='div' variant='body' align='left'>
                      {item.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flex: 1, textAlign: 'right' }}>
                    <Typography component='div' variant='body' align='right'>
                      {item.count}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography component='div' variant='body' align='right'>
                      {'$ ' + item.count * item.price}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ p: 1 }}>
          {toolCartItems.length != 0 && (
            <Box>
              <Typography variant='h5' sx={{ m: 0.5 }}>
                Tools
              </Typography>
              <Divider variant='middle' />
              {toolCartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: 'flex', mr: 2, ml: 2, mt: 1 }}
                >
                  <Box sx={{ display: 'flex', flex: 1, textAlign: 'left' }}>
                    <Typography component='div' variant='body' align='left'>
                      {item.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flex: 1, textAlign: 'right' }}>
                    <Typography component='div' variant='body' align='right'>
                      {item.count}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography component='div' variant='body' align='right'>
                      {'$ ' + item.count * item.price}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Card>

      <Card sx={{ pr: 3, pl: 3, pt: 1.5, pb: 1.5, mt: 1.5 }}>
        <Box>
          {cartItems.length !== 0 && (
            <>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Typography
                  component='div'
                  variant='body'
                  align='left'
                  sx={{ flex: 1 }}
                >
                  Items Price
                </Typography>
                <Typography className='text-right'>
                  ${itemsPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Typography
                  component='div'
                  variant='body'
                  align='left'
                  sx={{ flex: 1 }}
                >
                  Tax Price
                </Typography>
                <Typography className='text-right'>
                  ${taxPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Typography
                  component='div'
                  variant='body'
                  align='left'
                  sx={{ flex: 1 }}
                >
                  Shipping Price
                </Typography>
                <Typography className='text-right'>
                  ${shippingPrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider textAlign='left' variant='middle' sx={{ m: 1 }} />
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Typography
                  component='div'
                  variant='h5'
                  align='left'
                  sx={{ flex: 1 }}
                >
                  Total Price
                </Typography>
                <Typography variant='h5'>${totalPrice.toFixed(2)}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Card>
      <Grid container direction='row' justifyContent='flex-end'>
        <Button
          variant='contained'
          onClick={() => CheckoutCart()}
          sx={{ mt: 1.5 }}
        >
          Checkout
        </Button>
      </Grid>
    </Box>
  )
}
