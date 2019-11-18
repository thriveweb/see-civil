import React from 'react'

import { Link } from 'gatsby'
import './CallToAction.scss'

export default({ title, buttonText, buttonUrl }) => {

  if(!title) return null

  return <section className='project-cta'>
    <div className='container'>
      {title && <h2>{title}</h2>}
      {buttonText && buttonUrl && <Link className='button' to={buttonUrl}>{buttonText}</Link>}
    </div>
  </section>
}
