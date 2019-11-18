import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/Layout'
import _get from 'lodash/get'
import Helmet from 'react-helmet'

// Components
  import Banner from '../components/Banner'
  import Intro from '../components/Intro'
  import ContentColumn from '../components/ContentColumn'
  import Video from '../components/Video'

import './Careers.scss'

export const CareersPageTemplate = ({
  featuredImage,
  title,
  buttonText,
  buttonUrl,
  intro,
  contentColumn,
  cta,
  videoSection,
  meta,
  activeCompany
}) => {

  const contentType = typeof activeCompany === 'string' && activeCompany.replace('-', ' ')
  const metaTitle = contentType && contentType.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  return <Fragment>
    <Helmet title={meta ? meta.title : `People & Careers | ${metaTitle && metaTitle}`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <div class="Careers">
      <Banner
        image={featuredImage}
        title={title}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
      />
      <Intro {...intro} />
      <ContentColumn {...contentColumn} />
      <Video {...videoSection} />
      <Intro {...cta} cta career />
    </div>
  </Fragment>
}

const CareersPage = (props) => {
  const { data, location, activeCompany = false } = props
  const { markdownRemark: post } = data


  return <Layout
    className={_get(location, 'state.activeCompany') || activeCompany}
  >
    <CareersPageTemplate
      {...post.frontmatter}
      activeCompany={_get(location, 'state.activeCompany') || activeCompany}
    />
  </Layout>
}

export default CareersPage

export const CareersPageQuery = graphql`
  query CareersPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
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
        contentColumn {
          image
          content
        }
        videoSection {
          video
          title
          imageOverlay
        }
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
  }
`
