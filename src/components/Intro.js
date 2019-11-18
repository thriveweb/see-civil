import './Intro.scss'

import React from 'react'
import { Link } from 'gatsby'
import Content from './Content'

export default ({
    title,
    subtitle,
    content,
    buttonText,
    buttonUrl,
    cta,
    className = '',
    career
}) => {

  if(!content) return null

  if(cta) className += ' cta'

  return <section className={`intro-section ${className}`}>
    <div className='container'>
      {title && <h2 className='title-fade'>{title}</h2>}
      {subtitle && <h3>{subtitle}</h3>}
      <div className='intro-content'>
        {content && <Content src={content} />}
        {career && buttonUrl && buttonText && <a className='button' href={buttonUrl} target='_blank' rel='noopener noreferrer'>{buttonText}</a>}
        {!career && buttonUrl && buttonText && <Link className='button' to={buttonUrl}>{buttonText}</Link>}
      </div>
    </div>
  </section>
}
