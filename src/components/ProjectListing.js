import './ProjectListing.scss'

import React, { Component } from 'react'
import { Location } from '@reach/router'
import qs from 'qs'

// Util
    import _cloneDeep from 'lodash/cloneDeep'
    import _get from 'lodash/get'

// Component
    import ProjectNav from '../components/ProjectNav'
    import ProjectPagination from '../components/ProjectPagination'
    import Project from '../components/Project'


class ProjectListing extends Component {
  state = {}

  render() {
    const {
        projects,
        perPage = 9,
        enablePagination = true,
        enableSearch = true
    } = this.props

    return <Location>
      {({ location }) => {

        const menuItemActive = _get(location, 'state.menuItemActive')

        let filteredProjects = projects && !!projects.length
          ? _cloneDeep(projects)
          : []

        filteredProjects = menuItemActive
          ? filteredProjects.filter(project => project.frontmatter.projectstatus === menuItemActive )
          : filteredProjects

        let queryObj = location.search.replace('?', '')
        queryObj = qs.parse(queryObj)

        if(enableSearch && queryObj.s) {
          const searchTerm = queryObj.s.toLowerCase()
          filteredProjects = filteredProjects.filter(({ node: project }) =>
            project.frontmatter.title.toLowerCase().includes(searchTerm)
          )
        }

        const postLength = filteredProjects.length
        const pageCount = Math.ceil(postLength / perPage)
        const currentPage = queryObj.page || 1

        if(enablePagination) {
          filteredProjects = filteredProjects.splice((currentPage - 1) * perPage, perPage)
        }

        return <section className='archive-projects'>
          <ProjectNav
            menuItemActive={menuItemActive}
            handleActive={this.handleActive}
            location={location}
          />
          <div className='container'>
            <div className='archive-projects-listing'>
              {!!filteredProjects.length
                ? filteredProjects.map(project => {
                  const { frontmatter, fields, id } = project

                  return <Project
                    key={`post-${id}`}
                    {...frontmatter}
                    {...fields}
                  />
                })
                : <p className='no-projects'>Sorry, no projects found</p>
              }
            </div>
            {enablePagination && pageCount > 1 &&
              <ProjectPagination
                pageCount={Number(pageCount)}
                currentPage={Number(currentPage)}
                menuItemActive={menuItemActive}
              />
            }
          </div>
        </section>
      }}
    </Location>
  }
}

export default ProjectListing
