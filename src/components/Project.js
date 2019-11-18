import React from 'react'
import { Link } from 'gatsby'
import Content from './Content'

import './Project.scss'

export default({ title, featuredImage, specs, slug, date }) =>
  <Link to={slug} className='project'>
    {featuredImage &&
      <div className='project-image img-container'>
        <img src={`${featuredImage}-/resize/300x/)`} alt='' />
      </div>
    }
    {title && <h3>{title}</h3>}
    {specs && <Content src={specs} />}
  </Link>
