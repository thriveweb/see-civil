import './Nav.scss'

import React, { Component } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

// Components
  import { ICONLinkedin } from './Icons'

class Nav extends Component {
  render() {
    return <StaticQuery
      query={graphql`
        query MainMenuQuery {
          settingsYaml {
        	  phone
            email
            linkedin
        	}
        }
      `}


      render={({ settingsYaml = {} }) => {
        const { phone, email, linkedin } = settingsYaml
        const { activeCompany } = this.props

        return <nav>
            <ul className='see-group-list'>
              <p>SEE Group</p>
              <li><Link to='/' activeClassName='current'>Home</Link></li>
              <li><Link to='/about/' activeClassName='current'>About Us</Link></li>
              <li><Link to='/how-we-operate/' activeClassName='current'>How We Operate</Link></li>
              <li><Link to='/leaders/' activeClassName='current'>Our Leaders</Link></li>
              <li>
                <Link
                  to='/careers/'
                  state ={{
                    activeCompany: 'see-group'
                  }}
                  activeClassName={activeCompany === 'see-group' ? 'current' : ''}
                >
                  People and Careers
                </Link>
              </li>
              <li>
                <Link
                  to='/contact/'
                  state ={{
                    activeCompany: 'see-group'
                  }}
                  activeClassName={activeCompany === 'see-group' ? 'current' : ''}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className='see-civil-list'>
              <p>SEE Civil</p>
              <li><Link to='/see-civil/' activeClassName='current'>Home</Link></li>
              <li><Link to='/see-civil/about/' activeClassName='current'>About</Link></li>
              <li><Link to='/see-civil/capabilities/' activeClassName='current'>Capabilities</Link></li>
              <li><Link to='/see-civil/infrastructure-projects/' activeClassName='current'>Infrastructure Projects</Link></li>
              <li><Link to='/see-civil/urban-projects/' activeClassName='current'>Urban Projects</Link></li>
              <li><Link to='/see-civil/mining-projects/' activeClassName='current'>Mining Projects</Link></li>
              <li><Link to='/see-civil/leaders/' activeClassName='current'>Our Leaders</Link></li>
              <li>
                <Link
                  to='/careers/'
                  state ={{
                    activeCompany: 'see-civil'
                  }}
                  activeClassName={activeCompany === 'see-civil' ? 'current' : ''}
                >
                  People and Careers
                </Link>
              </li>
              <li>
                <Link
                  to='/contact/'
                  state ={{
                    activeCompany: 'see-civil'
                  }}
                  activeClassName={activeCompany === 'see-civil' ? 'current' : ''}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className='quarry-solutions-list'>
              <p>Quarry Solutions</p>
              <li><Link to='/quarry-solutions/' activeClassName='current'>Home</Link></li>
              <li><Link to='/quarry-solutions/about/' activeClassName='current'>About</Link></li>
              <li><Link to='/quarry-solutions/capabilities/' activeClassName='current'>Capabilities</Link></li>
              <li><Link to='/quarry-solutions/quarries/' activeClassName='current'>Quarries</Link></li>
              <li><Link to='/quarry-solutions/leaders/' activeClassName='current'>Our Leaders</Link></li>
              <li>
                <Link
                  to='/careers/'
                  state ={{
                    activeCompany: 'quarry-solutions'
                  }}
                  activeClassName={activeCompany === 'quarry-solutions' ? 'current' : ''}
                >
                  People and Careers
                </Link>
              </li>
              <li>
                <Link
                  to='/contact/'
                  state ={{
                    activeCompany: 'quarry-solutions'
                  }}
                  activeClassName={activeCompany === 'quarry-solutions' ? 'current' : ''}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul>
              {phone && <li><a href={`tel:${phone}`}>{phone}</a></li>}
              {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
              {linkedin && <li><a className='social-icon' href={linkedin} target='_blank' rel='noopener noreferrer'><ICONLinkedin /></a></li>}
            </ul>
          </nav>
      }}
    />
  }
}

export default Nav
