const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              template
              featuredImage
            }
            fields {
              slug
            }
          }
        }
      }

      projects: allMarkdownRemark(
        filter: {frontmatter: {template: {eq: "SingleProject" }}}
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            fields {
              slug
              contentType
            }
            frontmatter {
              title
              template
              featuredImage
              specs
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = _.get(result, `data.allMarkdownRemark.edges`)
    const projects = _.get(result, `data.projects.edges`)

    posts.forEach(edge => {
      if(!edge.node.frontmatter.template) return null

      const id = edge.node.id

      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.template)}.js`
        ),
        context: {
          id
        }
      })
    })

    projects && projects.forEach((edge, i) => {
      if(!edge.node.frontmatter.template) return null
      const id = edge.node.id
      const contentType = edge.node.fields.contentType

      const filteredProjects = projects.filter(project => project.node.fields.contentType === contentType)
      const currentLocation = filteredProjects.indexOf(filteredProjects.find(project => project.node.id === id))

      const prevProject = _.get(filteredProjects, `[${currentLocation - 1}]`)
      const nextProject = _.get(filteredProjects, `[${currentLocation + 1}]`)

      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.template)}.js`
        ),
        context: {
          id,
          prevProject,
          nextProject
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let slug
    const filePath = createFilePath({ node, getNode })
    const parsedFilePath = path.parse(filePath)

    parsedFilePath.dir = parsedFilePath.dir.replace('/', '')

    if(parsedFilePath.dir === 'see-group' && parsedFilePath.name === 'home') {
      slug = '/'
    } else if(parsedFilePath.dir && parsedFilePath.name === 'home') {
      slug = `/${parsedFilePath.dir}/`
    } else if (parsedFilePath.dir === '' || parsedFilePath.dir === 'see-group' || parsedFilePath.dir === 'global-pages') {
      slug = `/${parsedFilePath.name}/`
    } else if(node.frontmatter.slug) {
      slug = `/${parsedFilePath.dir}/${node.frontmatter.slug.toLowerCase()}`
    } else {
      slug = `/${parsedFilePath.name}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir
    })
  }
}
