import './userNav.css'
import logo from "../../assets/img/argentBankLogo.png"
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch, } from 'react-redux'
import {auth_service} from '../../services/auth'

const UserNav = () => {
  const firstName= useSelector((state) => state.user.firstName);
 const dispatch = useDispatch();
//const navigate = useNavigate();
 const handleLogout = () => {
  console.log('logout')
  dispatch(auth_service.logout)
  //navigate('/')
 }
  return (
    <nav className="main-nav">
    <Link className="main-nav-logo" to="/">
      <img
        className="main-nav-logo-image"
        src={logo}
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
    <div>
      <Link className="main-nav-item" to="/user/profile">
        <i className="fa fa-user-circle"></i>
        {firstName}
      </Link>
      <button className="main-nav-item"  onClick={handleLogout} >
        <i className="fa fa-sign-out"></i>
        Sign Out
      </button>
    </div>
  </nav>
  )
}

export default UserNav