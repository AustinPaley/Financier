import React from 'react'
import { Link} from 'react-router-dom'
import Adapter from './adapters/Adapter'
import Clock from 'react-live-clock'

class NavBar extends React.Component{
    render(){
      return(
        <div>
          <div className="navigation">
            <Link to="/overview" className="todaysmarkets">Today's Markets</Link>
            <Link to="/quote-window" className="quotewindow">Quote Window</Link>
            <Link to="stock-spotlight" className="stockspotlight">Stock Spotlight</Link>
            <Link to="pattern-matcher" className="patternmatcher">Pattern Matcher</Link>
            <Link to="trade" className="trade">Trade Now</Link>
            <Clock className="clock" format={'HH:mm:ssa'} ticking={true} timezone={'US/Eastern'} />
              {Adapter.loggedIn() ?
                <div>
                  <Link to='/login'>Login</Link>
                  <br />
                  <Link to='/register'>Register</Link>
                  <br />
                </div>
                :
                <button className="logout_button" onClick={() => {this.props.props.history.push("/login"); Adapter.logout()}}>Logout</button>
              }
          </div>
        </div>
      )
    }
  }

export default NavBar;
