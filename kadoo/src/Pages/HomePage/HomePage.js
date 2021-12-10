import React, { useEffect, useState } from 'react'
//import Navbar from '../../Components/Navbar/Navbar'
import AppBar from '../../Components/AppBar/AppBar'
import ShowProduct from '../../Components/ShowProduct/ShowProduct'
//import CategoryDrawer from '../../Components/CategoryDrawer/CategoryDrawer'
import { styled, useTheme } from '@mui/material/styles'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Categorieslist from '../../Components/Catergories/Categorieslist'
import ShowPlants from '../../Components/ShowProduct/ShowPlants'
import ShowTools from '../../Components/ShowProduct/ShowTools'
import Pagination from '@mui/material/Pagination'
import ProductTabs from '../../Components/ProductTabs/TabPanel'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import ContentHeader from '../../Components/Header/ContentHeader'
import ProductWithCategory from '../../Components/ProductsWithCategory/ProductWithCategory'
import Card from '@mui/material/Card'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
)

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function HomePage() {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [plantsData, setPlantsData] = React.useState([])
  const [toolsData, setToolsData] = React.useState([])
  const [isplant, setIsPlant] = React.useState(0)
  const [categoryText, setCategoryText] = React.useState('')
  const [page, setPage] = useState(1)
  const [allPage, setAllPage] = useState(1)
  const [products, setProducts] = useState([])

  const handlePlantsData = (value) => {
    setPlantsData(value)
    setIsPlant(1)
  }

  const handleCategoryText = (value) => {
    setCategoryText(value)
  }
  

  const handleDelete = () => {
    fetchPagination()
    setIsPlant(0)
  }

  const handleToolsData = (value) => {
    setToolsData(value)
    setIsPlant(2)
  }
  
  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }



  useEffect(() => {
    if (isplant === 0) {
      fetchPagination()
    }
    if (isplant === 1) {
      fetchPlantsPagination(categoryText)
    }
    if (isplant === 2) {
      fetchToolsPagination(categoryText)
    }
  }, [page])

  const handleChange = (event, value) => {
    setPage(value)
  }

  const handleChangePage = (value) => {
    setPage(value)
  }

  const handleChangeAllPage = (value) => {
    setAllPage(value)
  }

  const fetchPagination = () => {
    fetch('http://127.0.0.1:8000/api/allPagination/', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: '6', page: `${page}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data)
        setAllPage(data.pageCount)
      })
  }

  const fetchPlantsPagination = (name) => {
    console.log(name)
    if (name !== 'All plants') {
      console.log(
        JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: '6', page: `${page}` },
          sort: { kind: null, order: null },
        })
      )
      fetch('http://127.0.0.1:8000/api/plantsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: '6', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlantsData(data.data)
          setAllPage(data.pageCount)
        })
    } else {
      console.log(
        JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: '6', page: `${page}` },
          sort: { kind: null, order: null },
        })
      )
      fetch('http://127.0.0.1:8000/api/plantsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: '6', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlantsData(data.data)
          setAllPage(data.pageCount)
        })
    }
  }
  const fetchToolsPagination = (name) => {
    if (name !== 'All tools') {
      fetch('http://127.0.0.1:8000/api/toolsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: '6', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToolsData(data.data)
          setAllPage(data.pageCount)
        })
    } else {
      fetch('http://127.0.0.1:8000/api/toolsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: '6', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToolsData(data.data)
          setAllPage(data.pageCount)
        })
    }
  }

  

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={openDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Categorieslist
              bindplants={handlePlantsData}
              bindtools={handleToolsData}
              bindall={handleDelete}
              settext={handleCategoryText}
              setpageall={handleChangeAllPage}
              setgivenpage={handleChangePage}
            />
        </Drawer>
        <Main open={openDrawer}>
          <Box>
            <AppBar
              SearchOption={true}
              TicketOption={true}
              CartOption={true}
              AuthorizationOption={true}
              isopen={openDrawer}
              OpenMenu={handleDrawerOpen}
              CloseMenu={handleDrawerClose}

            />
          </Box>
          <Slide
            direction='right'
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={900}
          >
            <Box>
              <ContentHeader />
              <ProductTabs />
              <Grid item display={{xs:'none' ,sm:'flex'}}>
              <ProductWithCategory  />
              </Grid>



              <Card
                style={{ backgroundColor: '#f5f4f4' }}
                sx={{
                  m: { xs: 3, sm: 5 },
                  pl: { xs: 1, sm: 2, md: 2 },
                  pr: { xs: 1, sm: 2, md: 8 },
                  pt: 2,
                  pb: 2,
                }}
              >
        <Grid
          display={{xs:'flex' ,sm:'none'}}
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
        >

            <Grid item >
            {isplant === 0 && <ShowProduct data={products} />}
            {isplant === 1 && <ShowProduct data={plantsData} />}
            {isplant === 2 && <ShowProduct data={toolsData} />}
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
              sx={{ mt: 3, mb: 1 }}
            >
              <Grid item>
                {isplant === 0 && (
                  <Pagination
                    className='pagination_center'
                    count={allPage}
                    page={page}
                    onChange={handleChange}
                  />
                )}
                {isplant === 1 && (
                  <Pagination
                    className='pagination_center'
                    count={allPage}
                    page={page}
                    onChange={handleChange}
                  />
                )}
                {isplant === 2 && (
                  <Pagination
                    className='pagination_center'
                    count={allPage}
                    page={page}
                    onChange={handleChange}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          </Card>
            </Box>
          </Slide>
        </Main>
      </Box>
    </div>
  )
}
