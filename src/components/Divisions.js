import React from 'react'

import BusinessListing from './BusinessListing'
import Content from './Content'

import './Divisions.scss'

export default({ title, subtitle, logo, content, businesses, className }) => {

  if(!businesses) return null

  return <section className='divisions-section'>
    {title && <h2 className='title-banner'>{title}</h2>}
    <div className='container'>
      <div className='intro'>
        <div className='intro-logo'>
          {logo && <img src={logo} alt='' />}
          {subtitle && <h3>{subtitle}</h3>}
        </div>
        {content && <Content src={content} />}
      </div>
      {businesses &&
        <div className='divisions'>
          <BusinessListing businesses={businesses} className={className} about />
        </div>
      }
    </div>
  </section>
}
