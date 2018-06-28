import React from 'react'
import { Link} from 'react-router-dom'

const NavBar = (props) => {
    return(
      <div>
      {!localStorage.getItem("token") ?
        <div>
          <Link to='/login'>Login</Link>
          <br />
          <Link to='/register'>Register</Link>
          <br />
        </div>
        :
        null
      }
        <a href="">Page 3</a>
        <br />
        <a href="">Page 4</a>
      </div>
    )
  }

export default NavBar;
