import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../layouts/Layout'
import Banner from '../components/Banner'
import Intro from '../components/Intro'
import Leaders from '../components/Leaders'


export const LeadersPageTemplate = ({
  title,
  featuredImage,
  intro,
  className,
  businessName,
  edges,
  meta
}) => {

  const leaders = edges ? edges.map(edge => ({ ...edge.node })) : []
  const contentType = className && className.split('/')[0].replace('-', ' ')
  const metaTitle = contentType && contentType.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  const director = leaders.filter(leader => leader.frontmatter.generalOccupation === 'director')
  console.log("*** director",director)
  const generalManager = leaders.filter(leader => leader.frontmatter.generalOccupation === 'executive-general manager')
  console.log("*** generalManager",generalManager)
  const operationalManager = leaders.filter(leader => leader.frontmatter.generalOccupation === 'operational manager')
  console.log("*** operationalManager",operationalManager)


  return <Fragment>
    <Helmet title={meta ? meta.title : `Leaders | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <Banner
      title={title}
      image={featuredImage}
    />
    <Intro {...intro} />
    <section className='leader-listing'>
      <div className='container'>
        {director && <Leaders leaders={director} className={className} businessName={businessName} />}
        {generalManager && <Leaders leaders={generalManager} className={className} businessName={businessName} />}
        {operationalManager && <Leaders leaders={operationalManager} className={className} businessName={businessName} />}
      </div>
    </section>
  </Fragment>
}

const LeadersPage = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data

  return <Layout
    className={post.fields.contentType}
  >
    <LeadersPageTemplate
      {...post.frontmatter}
      className={post.fields.contentType}
      {...allMarkdownRemark}
    />
  </Layout>
}

export default LeadersPage

export const LeadersPageQuery = graphql`
  query LeadersPage($id: String!) {
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
        meta {
          canonicalLink
          title
          description
        }
      }
    }

    allMarkdownRemark(filter :{frontmatter: {template: {eq: "SingleLeader"}}}) {
      edges {
        node {
          fields {
            contentType
            slug
          }
          frontmatter {
            profileImage
            title
            occupation
            generalOccupation
          }
        }
      }
    }
  }
`
