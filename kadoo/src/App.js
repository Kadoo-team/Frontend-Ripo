// Import Initial Files
import React from 'react'
import './App.css'
// Import Theme Files
import { ThemeProvider } from '@mui/material/styles'
import Theme from './Theme/ThemeGenerator'
// Import Dom And React Components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
// Import Pages
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import HomePage from './Pages/HomePage/HomePage'
import SearchResultProduct from './Components/SearchResultsProduct/SearchResultProduct'
import Cart from './Pages/AddToCart'
import NotFound from './Pages/NotFound'
import CategoriesPage from './Pages/CategoriesPage'
import ProductPlantsPage from './Pages/ProductPlantsPage/ProductPlantsPage'
import ProductToolsPage from './Pages/ProductToolsPage/ProductToolsPage'
import LandingPage from './Pages/LandingPage/LandingPage'
import AdminPage from './Pages/AdminPage/AdminPage'
import Reminder from './Pages/ReminderTest/ReminderTest'
import GreenHouseEdit from './Pages/GreenHouseEdit/GreenHouseEdit'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Plantmanagement from './Pages/Plantmanagement/Plantmanagement'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ShowCoins from './Components/ShowCoins/ShowCoins'
import WateringUpdate from './Components/UpdateCoins/WateringUpdate'
import AdminHome from './Pages/AdminHome/AdminHome'
import UserList from './Pages/AdminUserList/AdminUserList'
import AdminProduct from './Pages/AdminProduct/AdminProduct'
import AdminProductList from './Pages/AdminProductList/AdminProductList'
import TicketPage from './Pages/TicketPage/TicketPage'
import WriteTicket from './Components/WriteTicket/WriteTicket'
import TicketUser from './Pages/TicketUser/TicketUser'

function App() {
  return (
    <React.Fragment className='no-select'>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Switch>
              <Route exact path='/TicketPage' component={TicketPage} />
              <Route exact path='/TicketUser' component={TicketUser} />
              <Route exact path='/WriteTicket' component={WriteTicket} />
              <Route
                exact
                path='/WateringUpdateTest'
                component={WateringUpdate}
              />
              <Route exact path='/Coins' component={ShowCoins} />
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
              <Route
                exact
                path='/search/:text'
                component={SearchResultProduct}
              />
              <Route exact path='/search/' component={SearchResultProduct} />
              <Route exact path='/Homepage' exact component={HomePage} />
              <Route path='/cart' exact component={Cart} />
              <Route path='/categories' exact component={CategoriesPage} />
              <Route path='/Reminder' exact component={Reminder} />
              <Route path='/greenhouse' exact component={Plantmanagement} />
              <Route exact path='/AdminPage' component={AdminPage} />
              <Route
                exact
                path='/ProductPlantsPage/:id'
                component={ProductPlantsPage}
              />
              <Route
                exact
                path='/ProductToolsPage/:id'
                component={ProductToolsPage}
              />
              <Route
                exact
                path='/greenHouseEdit/:id'
                component={GreenHouseEdit}
              />
              <Route
                exact
                path='/greenHouseCreate/'
                component={GreenHouseEdit}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
