import { Link } from 'react-router-dom';
import logo from "../../assets/img/argentBankLogo.png"
import './navbar.css'
const Navbar = () => {
  return (
    /**/
    <nav className="main-nav">
      <Link className="main-nav-logo" to='/'>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <Link className="main-nav-item" to='/user/login'>
        <i className="fa fa-user-circle"></i>
        Sign In
      </Link>
    </nav>
  );
};

export default Navbar;
