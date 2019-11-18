import React from 'react'
import Content from './Content'
import { Link } from 'gatsby'

import './ContentColumn.scss'

export default({ image, content, titleFade, buttonText = '', buttonUrl = '' }) => {

  return <section className='content-column'>
    <img className='column-image' src={`${image}-/resize/700x/)`} alt={titleFade}/>
    <div className='column-content'>
      {titleFade && <h2 className='title-fade'>{titleFade}</h2>}
      {content && <Content src={content} />}
      {buttonUrl && buttonText && <Link className='button' to={buttonUrl}>{buttonText}</Link>}
    </div>
  </section>
}
