import './Banner.scss'

import React from 'react'
import { Link } from 'gatsby'

export default ({
    title,
    logo,
    buttonText,
    buttonUrl,
    image,
    home,
    className = ''
}) => {

   return <section className={`banner section-image ${home ? 'home-banner' : ''}`}>
      {image && <img className='background-image' src={image} alt='' />}
      <div className='container'>
        {logo && <img className='logo' src={`${logo}-/resize/450x/)`} alt='' />}
        {title && <h1>{title}</h1>}
        {buttonText && buttonUrl && <Link className='button' to={buttonUrl}>{buttonText}</Link>}
      </div>
    </section>
}
