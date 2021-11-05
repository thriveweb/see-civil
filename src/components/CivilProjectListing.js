import React from 'react'
import { Link } from 'gatsby'

import './CivilProjectListing.scss'

export default({ archivesListing }) => {

  return <section className='civil-project-types'>
    <h2 className='title-banner'>See Civil Projects</h2>

      {archivesListing &&
        archivesListing.map(({ fields, frontmatter, id }) => {
          const { slug } = fields
          const { title, featuredImageThumbnail } = frontmatter
          console.log(`${featuredImageThumbnail}-/resize/1920x/`)

          return <Link
                  className='archive-project-link'
                  key={`archive-link-${id}`}
                  to={slug}
                  style={featuredImageThumbnail && { backgroundImage: `url(${featuredImageThumbnail}-/resize/1920x/)`, backgroundSize: 'cover' }}
                >
                  {title && <h3>{title}</h3>}
                  <p className='button'>View All</p>
                </Link>
        })
      }

  </section>
}
