import './style.scss'
import LineStyleIcon from '@mui/icons-material/LineStyle'
import TimelineIcon from '@mui/icons-material/Timeline'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BarChartIcon from '@mui/icons-material/BarChart'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import ReportIcon from '@mui/icons-material/Report'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Quick Menu</h3>
          <ul className='sidebarList'>
            <Link to='/AdminPage/specialist' className='link'>
              <li className='sidebarListItem'>
                <PermIdentityIcon className='sidebarIcon' />
                Specialists
              </li>
            </Link>
            <Link to='/AdminPage/productsList' className='link'>
              <li className='sidebarListItem'>
                <StorefrontIcon className='sidebarIcon' />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}