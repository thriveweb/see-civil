import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../layouts/Layout'
import _get from 'lodash/get'
import { Link } from 'gatsby'
import Content from '../components/Content'
import Banner from '../components/Banner'

import '../components/SingleLeader.scss'

export const SingleLeaderTemplate = ({
  title,
  profileImage,
  occupation,
  biography,
  edges,
  className,
  meta
}) => {

  const archives = edges ? edges.map(edge => ({ ...edge.node })) : []
  const leaderType = className && className.split('/')[0]


// Archive Leaders Info
  const thisArchive = archives.filter(archive => archive.fields.contentType === leaderType)
  const bannerTitle = thisArchive.map(archive => archive.frontmatter.title)
  const bannerImage = thisArchive.map(archive => archive.frontmatter.featuredImage)
  const archiveSlug = thisArchive.map(archive => archive.fields.slug)
  const archiveLink = archiveSlug.toString()

  const contentType = className && className.split('/')[0].replace('-', ' ')
  const metaTitle = contentType && contentType.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  return <Fragment>
    <Helmet title={_get(meta, 'title') ? meta.title : `${title} | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <Banner
      title={bannerTitle}
      image={bannerImage}
    />
    <section className='single-leader'>
      <div className='container'>
        {profileImage &&
          <div className='profile-image'>
            <img src={profileImage} alt={title} />
          </div>
        }
        <div className='leader-content'>
          {title && <h2>{title}</h2>}
          {occupation && <p className='occupation'>{occupation}</p>}
          {biography && <Content src={biography} />}
        </div>
      </div>
      <Link className='button' to={archiveLink}>Back To All</Link>
    </section>
  </Fragment>
}

const SingleLeader = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark} = data

  return <Layout
    className={_get(post, 'fields.contentType').split('/')[0]}
  >
    <SingleLeaderTemplate
      {...post.frontmatter}
      {...allMarkdownRemark}
      className={_get(post, 'fields.contentType').split('/')[0]}
    />
  </Layout>
}

export default SingleLeader

export const SingleLeaderQuery = graphql`
  query SingleLeader($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        contentType
      }
      frontmatter {
        profileImage
        title
        occupation
        biography
        meta {
          canonicalLink
          title
          description
        }
      }
    }

    allMarkdownRemark(filter: {frontmatter: {template: {eq: "ArchiveLeaders"}}}) {
      edges {
        node {
          fields {
            contentType
            slug
          }
          frontmatter {
            title
            featuredImage
          }
        }
      }
    }
  }
`
