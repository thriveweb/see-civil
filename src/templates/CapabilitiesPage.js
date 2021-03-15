import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../layouts/Layout'

import Banner from '../components/Banner'
import Intro from '../components/Intro'
import IconListing from '../components/IconListing'
import HomeProjectListing from '../components/HomeProjectListing'
import Downloads from '../components/Downloads'


export const CapabilitiesPageTemplate = ({
  title,
  featuredImage,
  intro,
  iconList,
  businessProjects,
  className,
  downloads,
  meta
}) => {

  const projects = businessProjects && businessProjects.edges ? businessProjects.edges.map(edge => ({ ...edge.node })) : []
  const contentType = className && className.split('/')[0].replace('-', ' ')
  const metaTitle = contentType && contentType.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  return <Fragment>
    <Helmet title={meta ? meta.title : `Capabilities | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <Banner
      title={title}
      image={featuredImage}
    />
    <Intro
      {...intro}
    />
    <IconListing
      iconList={iconList}
    />
    <HomeProjectListing
      projects={projects}
      className={className}
      title={className === 'integrated-concrete-solutions'
        ? 'Our Locations'
        : 'Current Work'
      }
      buttonText={className === 'quarry-solutions'
        ? 'View Quarries'
        : className === 'integrated-concrete-solutions'
        ? 'View Locations'
        : 'View Projects'
      }
      spliceValue='3'
      titleDark
    />
    <Downloads
      downloads={downloads}
    />
  </Fragment>
}

const CapabilitiesPage = ({ data }) => {
  const { markdownRemark: post, projects } = data

  return <Layout
    className={post.fields.contentType}
  >
    <CapabilitiesPageTemplate
      {...post.frontmatter}
      businessProjects={projects}
      className={post.fields.contentType}
    />
  </Layout>
}

export default CapabilitiesPage

export const CapabilitiesPageQuery = graphql`
  query CapabilitiesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        contentType
      }
      frontmatter {
        title
        featuredImage
        iconList {
          icon
          title
          content
        }
        intro {
          title
          subtitle
          content
          buttonText
          buttonUrl
        }
        downloads {
          title
          file
        }
        meta {
          canonicalLink
          title
          description
        }
      }
    }

    projects: allMarkdownRemark(
      filter: {frontmatter: {template: {eq: "SingleProject"}}}
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            slug
            contentType
          }
          frontmatter {
            projectstatus
            title
            featuredImage
            specs
            template
          }
        }
      }
    }
  }
`
