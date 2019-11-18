import React from 'react'
import { Link } from 'gatsby'
import './ProjectNav.scss'

export default ({
  menuItemActive,
  handleActive,
  location
}) => {
  return <div className='project-nav'>
    <div className='container'>
      <ul className='project-nav--items'>
        <li
          className={!menuItemActive ? 'active' : ''}
        >
          <Link
            to={location.pathname}
            state={{
              menuItemActive: false
            }}
          >
            Show All
          </Link>
        </li>
        <li
          className={menuItemActive === 'current' ? 'active' : ''}
        >
          <Link
            to={location.pathname}
            state={{
              menuItemActive: 'current'
            }}
          >
            Current Projects
          </Link>
        </li>
        <li
          className={menuItemActive === 'completed' ? 'active' : ''}
        >
          <Link
            to={location.pathname}
            state={{
              menuItemActive: 'completed'
            }}
          >
            Completed Projects
          </Link>
        </li>
      </ul>
    </div>
  </div>
}
