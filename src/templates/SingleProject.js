import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import _get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../layouts/Layout'
import Content from '../components/Content'
import Banner from '../components/Banner'
import SocialShare from '../components/SocialShare'
import Video from '../components/Video'
import Accordion from '../components/Accordion'
import Pagination from '../components/Pagination'
import CallToAction from '../components/CallToAction'

import '../components/SingleProject.scss'

export const SingleProjectTemplate = ({
  title,
  featuredImage,
  specs,
  content,
  videoSection,
  contentSecondary,
  accordion,
  cta,
  nextProject = {},
  prevProject = {},
  contentType,
  meta,
  slug
}) => {

  const archiveTitle = contentType && contentType.split('/')[1]
  const className = contentType && contentType.split('/')[0].replace('-', ' ')
  const metaTitle = className && className.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  return <Fragment>
    <Helmet title={_get(meta, 'title') ? meta.title : `${title} | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <section className='single-project-content'>
      <div className='container'>
        <Link className='archive-link' to={`/${contentType}`}>{archiveTitle}</Link>
        <Banner image={featuredImage} />
        <div className='project-info'>
          {title && <h1>{title}</h1>}
          {specs && <Content src={specs} />}
          <SocialShare shareUrl={slug}/>
        </div>
        <div className='project-main'>
          {content && <Content src={content} />}
          <Video {...videoSection} />
          {contentSecondary && <Content src={contentSecondary} />}
          <Accordion accordion={accordion} />
        </div>
        <Pagination nextProject={nextProject} prevProject={prevProject} />
      </div>
      <CallToAction {...cta} />
    </section>
  </Fragment>
}

const SingleProject = props => {
  const { markdownRemark: post } = props.data
  const nextProject = props.pageContext.nextProject
  const prevProject = props.pageContext.prevProject

  return <Layout
    className={`${post.fields.contentType.split('/')[0]} single-project`}
  >
    <SingleProjectTemplate
      {...post.frontmatter}
      {...post.fields}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  </Layout>
}
export default SingleProject

export const SingleProjectQuery = graphql`
  query SingleProject($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        contentType
        slug
      }
      frontmatter {
        title
        featuredImage
        specs
        content
        videoSection {
				  video
				  content
				  imageOverlay
				  title
				}
        contentSecondary
        accordion {
          title
          content
          file
        }
        cta {
          title
          buttonText
          buttonUrl
          content
          subtitle
        }
        meta {
          canonicalLink
          title
          description
        }
      }
    }
  }
`
