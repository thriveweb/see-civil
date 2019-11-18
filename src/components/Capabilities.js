import './Capabilities.scss'
import React from 'react'
import { Link } from 'gatsby'
import Content from './Content'
import IconListing from './IconListing'

export default ({
    titleBanner,
    title,
    subtitle,
    content,
    buttonText,
    buttonUrl,
    iconList,
    className = '',
    contentType
}) => {

  if(contentType !== 'see-group') className += ' secondary-business'

  if(!iconList) return null

  return <section className={`capabilities ${className}`}>
    {titleBanner && <h2 className='title-banner'>{titleBanner}</h2>}
    <div className='capability-content'>
      <div className='container'>
        {title && <h3 className='title-fade'>{title}</h3>}
        {subtitle && <h4>{subtitle}</h4>}
        {content && <Content src={content} />}
        {buttonText && buttonUrl && <Link className='button' to={buttonUrl}>{buttonText}</Link>}
      </div>
    </div>
    <IconListing iconList={iconList} />
  </section>
}
