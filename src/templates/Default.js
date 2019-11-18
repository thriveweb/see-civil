import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../layouts/Layout'
import Content from '../components/Content'
import './DefaultPage.scss'

// Components
  import Banner from '../components/Banner'

export const DefaultPageTemplate = ({
  title,
  featuredImage,
  content,
  meta
}) => {

    return <Fragment>
      <Helmet title={meta ? meta.title : `Privacy`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <Banner
        title={title}
        image={featuredImage}
      />
      <section className='default-page'>
        <div className='container'>
          <Content src={content} />
        </div>
      </section>
    </Fragment>
}


const DefaultPage = (props) => {
  const { data } = props
  const { markdownRemark: post } = data

  return <Layout>
    <DefaultPageTemplate
      {...post.frontmatter}
    />
  </Layout>
}

export default DefaultPage

export const DefaultPageQuery = graphql`
  query DefaultPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
        content
        meta {
          canonicalLink
          title
          description
        }
      }
    }
  }
`
