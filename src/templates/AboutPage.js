import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../layouts/Layout'
import Banner from '../components/Banner'
import Intro from '../components/Intro'
import Downloads from '../components/Downloads'
import Divisions from '../components/Divisions'
import CareerBanner from '../components/CareerBanner'

import './AboutPage.scss'

export const AboutPageTemplate = ({
  className,
  title,
  featuredImage,
  intro,
  contentBanner,
  divisionIntro,
  downloads,
  businessName,
  edges,
  meta
}) => {

  const businesses = edges ? edges.map(edge => ({ ...edge.node })) : []
  const contentType = className && className.split('/')[0].replace('-', ' ')
  const metaTitle = contentType && contentType.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');


  return <Fragment>
    <Helmet title={meta ? meta.title : `About | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
      <Banner
        image={featuredImage}
        title={title}
      />
      <Intro {...intro} />
      {className === 'see-group'
        ? <Divisions {...divisionIntro} businesses={businesses} className={className} />
        : <CareerBanner {...contentBanner} pageAbout />
      }
      {className === 'see-group'
        ? ''
        : <Downloads downloads={downloads} />
      }
  </Fragment>
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data

  return <Layout
    className={post.fields.contentType}
  >
    <AboutPageTemplate
      {...post.frontmatter}
      {...allMarkdownRemark}
      className={post.fields.contentType}
    />
  </Layout>
}

export default AboutPage

export const AboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        contentType
      }
      frontmatter {
        businessName
        title
        featuredImage
        intro {
          content
          subtitle
          title
          buttonText
          buttonUrl
        }
        contentBanner {
          title
          content
          buttonText
          buttonUrl
          image
        }
        divisionIntro {
          content
          logo
          subtitle
          title
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

    allMarkdownRemark(filter: {frontmatter: {template: {eq: "HomePage"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            businessName
            logo
            featuredImage
            description
          }
        }
      }
    }
  }
`
