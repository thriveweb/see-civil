import './BusinessListing.scss'

import React from 'react'
import { Link } from 'gatsby'
import _get from 'lodash/get'

export default ({
  businesses,
  className,
  about,
}) => {

  if(!businesses) return null

  const orders = [
    'See Group',
    'See Civil',
    'Quarry Solutions',
    'Integrated Concrete Solutions',
  ]

  const orderedItems = orders.map(order =>
    businesses.find(business =>
      order === business.frontmatter.businessName
  ))

  return <section className='business-listing'>
    {!about && <h2 className='title-banner'>SEE Group Businesses</h2>}
    <div className='business-links'>
      {orderedItems && orderedItems.map((item, index) => {
        const fields = _get(item, 'fields') || {}
        const frontmatter = _get(item, 'frontmatter') || {}
        const { slug } = fields
        const { businessName, logo, featuredImageThumbnail, featuredImage, description } = frontmatter
        const currentDivision = businessName && businessName.toLowerCase().replace(' ', '-')

        if(currentDivision === className) return null

        return <Link
            className='business-link'
            to={slug}
            key={`business-${index}`}
          >
            {about
              ? <div className='business-image section-image' style={featuredImage && { backgroundImage: `url(${featuredImage}-/resize/500x/)` }}></div>
              : <div className='business-image section-image' style={featuredImageThumbnail && { backgroundImage: `url(${featuredImageThumbnail}-/resize/500x/)` }}></div>
            }
            {logo &&
              <div className='business-logo'>
                <img src={logo} alt="" />
              </div>
            }
            <div className='business-info'>
              <div>
                {businessName && <h2>{businessName}</h2>}
                {slug && <p className='button'>Visit Site</p>}
              </div>
              {description && <p>{description}</p>}
            </div>
          </Link>
      })}
    </div>
  </section>
}
