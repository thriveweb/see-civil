import './HomeProjectListing.scss'

import React from 'react'
import { Link } from 'gatsby'
import Project from './Project'

export default({ projects, className, title, buttonText, spliceValue, titleDark, thisClass='' }) => {

  if(!projects.length) return null
  if(className === 'see-group') return null

  if (titleDark) thisClass += 'title-dark'

  const filteredProjects = projects.filter(project => project.fields.contentType.split('/')[0] === className)

  return <section className='home-projects'>
    {title && <div className={thisClass}><h2 className='title-banner'>{title}</h2></div>}
    <div className='container'>
      <div className='project-listing'>
        {filteredProjects.splice(0, spliceValue).map(({ id, fields, frontmatter }) =>
          <Project key={`project-${id}`} {...frontmatter} {...fields} />
        )}
      </div>
      {buttonText &&
        <Link
          className='button'
          to={`/${className}/${className === 'quarry-solutions' ? 'quarries' : className === 'integrated-concrete-solutions' ? 'locations' : 'projects'}`}
        >
          {buttonText}
        </Link>
      }
    </div>
  </section>
}
