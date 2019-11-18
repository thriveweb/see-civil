import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../layouts/Layout'

// Components
  import Banner from '../components/Banner'
  import Intro from '../components/Intro'
  import ProjectListing from '../components/ProjectListing'

export const ArchiveProjectsTemplate = ({
  title,
  slug,
  featuredImage,
  divisionProjects,
  contentType,
  cta,
  meta
}) => {

  const projects = divisionProjects && divisionProjects.edges ? divisionProjects.edges.map(edge => ({ ...edge.node })) : []
  const thisProjects = projects && projects.filter(project => slug.includes(project.fields.contentType))
  const className = contentType && contentType.split('/')[0].replace('-', ' ')
  const metaTitle = className && className.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  return <Fragment>
    <Helmet title={meta ? meta.title : `Projects | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <Banner
      title={title}
      image={featuredImage}
    />
    <ProjectListing
      projects={thisProjects}
      archiveSlug={slug}
    />
    {contentType === 'see-civil' && <Intro {...cta} cta />}
  </Fragment>
}

const ArchiveProjects = ({ data }) => {
  const { page, divisionProjects } = data

  return <Layout
    className={page.fields.contentType}
  >
    <ArchiveProjectsTemplate
      {...page.frontmatter}
      {...page.fields}
      divisionProjects={divisionProjects}
    />
  </Layout>
}

export default ArchiveProjects

export const pageQuery = graphql`
  query ArchiveProjects($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        contentType
        slug
      }
      frontmatter {
        title
        featuredImage
        cta {
          title
          subtitle
          content
          buttonText
          buttonUrl
        }
        meta {
          canonicalLink
          title
          description
        }
      }
    }

    divisionProjects: allMarkdownRemark(
      filter: {frontmatter: {template: {eq: "SingleProject"}}}
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
            date
            featuredImage
            specs
            projectstatus
          }
        }
      }
    }
  }
`

// sort: { order: DESC, fields: [frontmatter___date] }
