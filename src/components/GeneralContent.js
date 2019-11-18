import React from 'react'

import Content from './Content'

import './GeneralContent.scss'

export default({ title, subtitle, content, strategies }) => {
  return <section className='general-content'>
    <div className='container'>
      <div>
        {title && <h2>{title}</h2>}
        {subtitle && <h4>{subtitle}</h4>}
        {content && <Content src={content} />}
      </div>
      {strategies && <Content src={strategies} />}
    </div>
  </section>
}
