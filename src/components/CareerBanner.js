import './CareerBanner.scss'

import React from 'react'
import { Link } from 'gatsby'
import Content from './Content'

export default ({
    title,
    content,
    buttonText,
    buttonUrl,
    image,
    className = '',
    pageAbout
}) => {

  if(pageAbout) className += ' page-about-banner'

  if(!title && !content) return null

  return <section className={`career-banner ${className} section-image`} style={image && { backgroundImage: `url(${image}-/resize/1920x/)` }}>
    <div className='banner-content'>
      {title && <h2>{title}</h2>}
      <div>
        {content && <Content src={content} />}
        {buttonText && buttonUrl && <Link className='button' to={buttonUrl}>{buttonText}</Link>}
      </div>
    </div>
  </section>
}
