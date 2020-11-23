import {Fragment} from 'react';
import Link from "next/link"
import {APP_NAME} from "../config"
import {isAuth} from "../actions/auth"
//import yc_navbar_logo from "../static/images/logo.png"

const Header = () => {

 return(
  <Fragment>
    <nav className="top__navbar">
        <div>
          <button className="topnav__menu__btn">
            <i className="fas fa-bars"></i>{" "}
            <span className="menu__explore">
              <Link href="/stories">
                <a>Explore</a>
              </Link>
             
             </span>
          </button>
        </div>
        <div>
          <img className="top__navbar__logo" src={""} alt="" />
        </div>
        <div>
          <button className="topnav__signin__btn">
            <i className="fas fa-user"></i>
            <span className="menu__userlogo"> 
            {
              isAuth() ? (
                <Link href="/signout">
                <a> Sign out</a>
              </Link>
              ) : (
                <Link href="/signup">
                <a> Sign up</a>
              </Link>
              )
              }
            </span>
          </button>
        </div>
      </nav>
      
  </Fragment>
 )
}

export default Header;