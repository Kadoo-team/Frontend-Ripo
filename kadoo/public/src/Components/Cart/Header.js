import React, { useEffect, useState } from 'react'
import '../Navbar/Navbar.css'
import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import UserDropDown from '../UserDropDown/UserDropDown'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import history from '../../history'

function Header(props) {
  const [userNav, setUserNav] = useState(false)
  const [normalNav, setNav] = useState(true)
  const handleNav = (e) => {
    setNav(false)
  }
  const handleUserNav = (e) => {
    setUserNav(true)
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch('http://127.0.0.1:8000/api/user/userinfo/', requestOptions)
      .then((response) => {
        console.log(localStorage.getItem('access_token'))
        if (response.status != 401) {
          setUserNav(true)
          setNav(false)
          console.log('ghgjghj')
        } else {
          throw response
        }
      })
      .catch((err) => {})
  }, [])

  return (
    <div className='navbar'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} md={2}>
          <h1>Kadoo</h1>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className='links'>
          <a href='/HomePage'>Home</a>
          <a href='/'>About Us</a>
          <a href='/'>Contact Us</a>
        </Grid>
        <Grid item xs={12} sm={4} md={4} display='flex' className='searchBox'>
          <IconButton
            size='large'
            aria-label='show 4 new mails'
            color='inherit'
          >
            <Badge badgeContent={props.countCartItems} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={2} md={2} display='flex' className='buttons'>
          {normalNav && <a href='/signup'>SIGN UP</a>}
          {normalNav && <a href='/signin'>SIGN IN</a>}
          {userNav && <UserDropDown />}
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
