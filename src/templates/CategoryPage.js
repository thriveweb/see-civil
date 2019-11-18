import React, { Fragment} from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../layouts/Layout'

// Components
  import Banner from '../components/Banner'
  import ProjectListing from '../components/ProjectListing'

export const CategoryPageTemplate = ({
    divisionProjects,
    title,
    featuredImage,
    contentType,
    meta
}) => {
  const projects = divisionProjects ? divisionProjects.map(edge => ({ ...edge.node })) : []
  const className = contentType && contentType.split('/')[0].replace('-', ' ')
  const metaTitle = className && className.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  return <Fragment>
  <Helmet title={meta ? meta.title : `${title} | ${metaTitle && metaTitle}`}>
    {meta && <meta name="description" content={meta.description} />}
    {meta && <link rel="canonical" href={meta.canonical} />}
  </Helmet>
    <Banner
      title={title}
      image={featuredImage}
    />
    <ProjectListing
      projects={projects}
    />
  </Fragment>
}

const CategoryPage = ({ data, pageContext }) => {
  return <Layout
    className={data.page.fields.contentType}
  >
    <CategoryPageTemplate
        divisionProjects={pageContext.projects}
        {...data.page.frontmatter}
        {...data.page.fields}
    />
  </Layout>
}

export default CategoryPage

export const categoryPage = graphql`
  query CategoryQuery($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        contentType
      }
      frontmatter {
        title
        featuredImage
        meta {
          canonicalLink
          title
          description
        }
      }
    }
  }
`
