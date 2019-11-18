import React from 'react'

import Content from './Content'
import './IconListing.scss'

export default({ iconList, listImage }) => {
return <div className='icon-listing'>
      <div className='container'>
        {iconList &&
          iconList.map(({ icon, title, content }) => {
            return <div key={title} className='icon-item'>
              {icon && <img src={icon} alt='' />}
              <div className='listing-content'>
                {title && <h4>{title}</h4>}
                {content && <Content src={content} />}
              </div>
            </div>
          })
        }
        {listImage && <img className='list-image' src={listImage} alt='' />}
      </div>
    </div>
}
