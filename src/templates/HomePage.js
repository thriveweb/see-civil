import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../layouts/Layout'

// Components
  import Banner from '../components/Banner'
  import Intro from '../components/Intro'
  import BusinessListing from '../components/BusinessListing'
  import HomeProjectListing from '../components/HomeProjectListing'
  import CivilProjectListing from '../components/CivilProjectListing'
  import Capabilities from '../components/Capabilities'
  import CareerBanner from '../components/CareerBanner'


export const HomePageTemplate = ({
  featuredImage,
  title,
  logo,
  buttonText,
  buttonUrl,
  intro,
  capabilities,
  contentBanner,
  className,
  edges,
  businessProjects,
  archives,
  meta,
  openGraphCard
}) => {

  const businesses = edges ? edges.map(edge => ({ ...edge.node })) : []
  const projects = businessProjects && businessProjects.edges ? businessProjects.edges.map(edge => ({ ...edge.node })) : []
  let archivesListing = archives && archives.edges ? archives.edges.map(edge => ({ ...edge.node })) : []
    archivesListing = archivesListing.filter(listItem => listItem.fields.contentType === 'see-civil')

  const contentType = className && className.split('/')[0].replace('-', ' ')
  const metaTitle = contentType && contentType.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');


  return <Fragment>

    <Helmet title={meta ? meta.title : `Home | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
      {openGraphCard && <meta property='og:image' content={openGraphCard} />}
    </Helmet>
    <Banner
      image={featuredImage}
      logo={logo}
      title={title}
      buttonText={buttonText}
      buttonUrl={buttonUrl}
      home
    />
    {console.log(meta)}
    <Intro {...intro} />
    {className === 'see-group' &&
      <BusinessListing businesses={businesses} className={className} />
    }
    {className === 'see-civil'
      ? <CivilProjectListing archivesListing={archivesListing} />
      : <HomeProjectListing
          projects={projects}
          className={className}
          title={className === 'quarry-solutions'
          ? 'Our Quarries'
          : className === 'integrated-concrete-solutions'
          ? 'Locations'
          : 'Our Projects'}
          buttonText='Show All'
          spliceValue='6'
        />
    }

    <Capabilities {...capabilities} contentType={className} />
    <CareerBanner {...contentBanner} />
  </Fragment>
}

const HomePage = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark, projects, archiveListing, settingsYaml } = data

  return <Layout
    className={post.fields.contentType}
  >
    <HomePageTemplate
      {...post.frontmatter}
      {...allMarkdownRemark}
      className={post.fields.contentType}
      businessProjects={projects}
      archives={archiveListing}
      openGraphCard={settingsYaml.openGraphCard}
    />
  </Layout>
}

export default HomePage

export const HomePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        contentType
      }
      frontmatter {
        title
        logo
        featuredImage
        buttonText
        buttonUrl
        intro {
          title
          subtitle
          content
          buttonText
          buttonUrl
        }
        capabilities {
          titleBanner
          title
          subtitle
          content
          buttonText
          buttonUrl
          iconList {
            icon
            title
          }
        }
        contentBanner {
          title
          content
          buttonText
          buttonUrl
          image
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
            featuredImageThumbnail
          }
        }
      }
    }

    projects: allMarkdownRemark(filter: {frontmatter: {template: {eq: "SingleProject"}}}) {
      edges {
        node {
          id
          fields {
            slug
            contentType
          }
          frontmatter {
            title
            featuredImage
            specs
            template
          }
        }
      }
    }

    archiveListing: allMarkdownRemark(filter: {frontmatter: {template: {eq: "ArchiveProjects"}}}) {
      edges {
        node {
          id
          fields {
            slug
            contentType
          }
          frontmatter {
            title
            featuredImageThumbnail
          }
        }
      }
    }

    settingsYaml {
      openGraphCard
    }
  }
`
