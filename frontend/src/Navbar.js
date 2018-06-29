import React from 'react'
import { Link} from 'react-router-dom'
import Adapter from './adapters/Adapter'

const NavBar = (props) => {
    return(
      <div>
      {Adapter.loggedIn() ?
        <div>
          <Link to='/login'>Login</Link>
          <br />
          <Link to='/register'>Register</Link>
          <br />
        </div>
        :
        <p>Logout</p>
      }
        <a href="">Page 3</a>
        <br />
        <a href="">Page 4</a>
      </div>
    )
  }

export default NavBar;
