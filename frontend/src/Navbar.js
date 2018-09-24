import React from 'react'
import { Link} from 'react-router-dom'
import Adapter from './adapters/Adapter'
import Clock from 'react-live-clock'

class NavBar extends React.Component{
    render(){
      return(
        <div>
          <div className="navigation">
            <div className="navigation__housing">
              <Link to="/overview" className="navigation__todaysmarkets">Today's Markets</Link>
              <Link to="/quote-window" className="navigation__quotewindow">Quote Window</Link>
              <Link to="/stock-spotlight" className="navigation__stockspotlight">Stock Spotlight</Link>
              <Link to="/pattern-matcher" className="navigation__patternmatcher">Pattern Matcher</Link>
              <Link to="/trade" className="navigation__trade">Trade Now</Link>
              <Clock className="navigation__clock" format={'HH:mm:ssa'} ticking={true} timezone={'US/Eastern'} />
                {Adapter.loggedIn() ?
                  <div>
                    <Link to='/login'>Login</Link>
                    <br />
                    <Link to='/register'>Register</Link>
                    <br />
                  </div>
                  :
                  <button className="navigation__logout_button" onClick={() => {this.props.props.history.push("/login"); Adapter.logout()}}>Logout</button>
                }
            </div>
          </div>
        </div>
      )
    }
  }

export default NavBar;
