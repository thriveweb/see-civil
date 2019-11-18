import './Footer.scss'

import React, { Component } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

// Components
  import { ICONLinkedin } from './Icons'

class Footer extends Component {
  state = {}

  render() {
    return <StaticQuery
      query={graphql`
        query FooterQuary {
          settingsYaml {
        	  phone
            email
            linkedin
            headOffice
        	}
        }
      `}

      render={({ settingsYaml = {} }) => {
        const { phone, email, linkedin, headOffice } = settingsYaml

        return <footer className='footer'>
            <div className='footer-top'>
              <div className='container'>
                <h2>Contact</h2>
                <div>
                  {phone && <a href={`tel:${phone}`}>{phone}</a>}
                  {email && <a href={`mailto:${email}`}>{email}</a>}
                </div>
                {headOffice && <p>{headOffice}</p>}
                {linkedin && <a href={linkedin} target='_blank' rel='noopener noreferrer'><ICONLinkedin /></a>}
              </div>
            </div>
            <div className='footer-bottom'>
              <div className='container'>
                <Link className='logo' to="/see-civil">
                    <img src='/images/uploads/see-civil-logo.png' alt="See Civil Logo" />
                </Link>
                <Link className='logo' to="/quarry-solutions">
                    <img src='/images/uploads/quarry-solutions.png' alt="Quarry Solutions Logo" />
                </Link>
                <Link className='logo' to="/integrated-concrete-solutions">
                    <img src='/images/uploads/ics-logo-new-white.svg' alt="Integrated Concrete Solutions Logo" />
                </Link>
                <p>Copyright © 2018, SEE Civil. Site by Thrive Digital. <Link to='/privacy/'>Privacy</Link> | <Link to='/disclaimer/'>Disclaimer</Link></p>
              </div>
            </div>
          </footer>
      }}
    />
  }
}

export default Footer
