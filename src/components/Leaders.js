import React from 'react'

import { Link } from 'gatsby'

import './Leaders.scss'

export default({ leaders, className, businessName }) =>
  leaders
    ? leaders.map(({ fields, frontmatter }, index) => {
        const { contentType, slug } = fields
        const { profileImage, title, occupation } = frontmatter
        const currentDivision = contentType.split('/')[0]

        if(currentDivision !== className) return null

        return <Link className='leader' key={`leader-${index}`} to={slug}>
          {profileImage
            ? <div className='profile-image img-container'>
                <img src={`${profileImage}-/resize/300x/)`} alt={title} />
              </div>
            : <div className='profile-image img-container no-photo'>
                <img src='/images/no-photo.jpg' alt='no profile' />
              </div>
          }
          {title && <h4>{title}</h4>}
          {occupation && <p>{occupation}</p>}
        </Link>
      })
    : null
