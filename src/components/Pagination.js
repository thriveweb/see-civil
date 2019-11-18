import React from 'react'

import _get from 'lodash/get'
import { Link } from 'gatsby'
import './Pagination.scss'

export default({ nextProject, prevProject }) => {

  const prevSlug =  _get(prevProject, 'node.fields.slug')
  const prevImage = _get(prevProject, 'node.frontmatter.featuredImage')
  const prevTitle = _get(prevProject, 'node.frontmatter.title')

  const nextSlug = _get(nextProject, 'node.fields.slug')
  const nextImage = _get(nextProject, 'node.frontmatter.featuredImage')
  const nextTitle = _get(nextProject, 'node.frontmatter.title')

  return <section className='post-pagination'>
    {prevProject && prevSlug &&
      <Link
        to={prevSlug}
        className='pagination-link prev-link section-image'
      >
        {prevImage && <img src={prevImage} alt='' />}
        {prevTitle && <h2>{prevTitle}</h2>}
        <p>Previous Project</p>
      </Link>
    }
    {nextProject && nextSlug &&
      <Link
        to={nextSlug}
        className='pagination-link next-link section-image'
      >
        {nextImage && <img src={nextImage} alt='' />}
        {nextTitle && <h2>{nextTitle}</h2>}
        <p>Next Project</p>
      </Link>
    }
  </section>
}
