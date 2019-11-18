import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../layouts/Layout'

// Components
  import Banner from '../components/Banner'
  import Intro from '../components/Intro'
  import IconListing from '../components/IconListing'
  import GeneralContent from '../components/GeneralContent'
  import ContentColumns from '../components/ContentColumns'
  import Partners from '../components/Partners'
  import Content from '../components/Content'

  import './HowWeOperate.scss'

export const OperationPageTemplate = ({
  title,
  featuredImage,
  content,
  intro,
  iconList,
  listImage,
  generalContent,
  contentColumns,
  partners,
  meta
}) => {


  return <Fragment>
    <Helmet title={meta ? meta.title : `${title} | See Group`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    <Banner
      title={title}
      image={featuredImage}
    />
    <div className='fullwidth-content'>
      <div className='container'>
        {content && <Content src={content} />}
      </div>
    </div>
    <Intro {...intro} />
    <IconListing iconList={iconList} listImage={listImage} />
    <GeneralContent {...generalContent} />
    <ContentColumns contentColumns={contentColumns} />
    <Partners {...partners} />
  </Fragment>

}

const OperationPage = ({ data }) => {
  const { markdownRemark: post } = data

  return <Layout
    className={post.fields.contentType}
  >
    <OperationPageTemplate
      {...post.frontmatter}
    />
  </Layout>
}

export default OperationPage

export const OperationPageQuery = graphql`
  query OperationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        contentType
      }
      frontmatter {
        title
        featuredImage
        content
        intro {
          content
          subtitle
          title
          buttonText
          buttonUrl
        }
        iconList {
          icon
          title
          content
        }
        listImage
        generalContent {
          content
          subtitle
          title
          strategies
        }
        contentColumns {
          content
          image
          titleFade
          buttonText
          buttonUrl
        }
        partners {
          title
          partner {
            image
          }
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
