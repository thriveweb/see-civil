import React, { Component } from 'react'
import { Link } from 'gatsby'
import _throttle from 'lodash/throttle'

import SeeGroupLogo from './SeeGroupLogo'
import CivilLogo from './CivilLogo'
import QuarrySolutionsLogo from './QuarrySolutionsLogo'
import './Header.scss'
// Components

  import Nav from './Nav'

class Header extends Component {
  state = {
    headerActive: null
  }

  componentDidMount = () => {
    window.addEventListener('scroll', _throttle(this.calcNavPosition, 5))
  }

  calcNavPosition = () => {
  if (window.pageYOffset > 50 && !this.state.headerActive) {
    this.setState({
      headerActive: true
    })
  } else if (window.pageYOffset < 50 && this.state.headerActive) {
    this.setState({
      headerActive: null
    })
  }
}
  render() {
    const { handleMobileActive, mobileActive, activeCompany } = this.props
    const { headerActive } = this.state

    return <header className={headerActive ? 'active' : ''}>
            <div className='container'>
              <div className='home-link-container'>
                <Link className='header-logo see-group-logo' activeClassName='current' to="/">
                  <SeeGroupLogo />
                </Link>
                <Link className='header-logo see-civil-logo' activeClassName='current' to="/see-civil">
                  <CivilLogo />
                </Link>
                <Link className='header-logo quarry-solutions-logo' activeClassName='current' to="/quarry-solutions">
                  <QuarrySolutionsLogo />
                </Link>
              </div>

                <Nav
                  activeCompany={activeCompany}
                />
                <div
                  className='mobile-menu-button'
                  onClick={() => handleMobileActive(!mobileActive)}
                >
                  {Array(6).fill().map((item, i) => <span key={`navspan-${i}`}></span>)}
                </div>
            </div>
        </header>
  }
}

export default Header
