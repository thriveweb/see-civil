import React, { Fragment, Component } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../layouts/Layout'

import './ContactPage.scss'

// Components
  import Banner from '../components/Banner'
  import Form from '../components/Form'
  import Map from '../components/Map'


class ContactPageTemplate extends Component {
  state = {}

  render() {
    const {
      title,
      featuredImage,
      phone,
      fax,
      email,
      postalAddress,
      headOffice,
      latitude,
      longitude,
      activeCompany,
      meta
    } = this.props

    const icon = `/images/see-group-map-marker.svg`
    const contentType = typeof activeCompany === 'string' && activeCompany.replace('-', ' ')
    const metaTitle = contentType && contentType.toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');

    return <Fragment>
      <Helmet title={meta ? meta.title : `Contact | ${metaTitle && metaTitle}`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <Banner
        title={title}
        image={featuredImage}
      />
      <section className='contact-page'>
        <div className='contact-form'>
          <h2>Drop Us a Line</h2>
          <Form />
        </div>
        <div className='contact-info'>
          <h2>Contact Us</h2>
          <div className='info-container'>
            <div className='col'>
              <h4>Phone</h4>
              {phone && <a href={`tel:${phone}`}>{`T:${phone}`}</a>}
              {fax && <a href={`tel:${fax}`}>F:{fax}</a>}
            </div>
            <div className='col'>
              <h4>Postal Address</h4>
              {postalAddress && <p>{postalAddress}</p>}
            </div>
            <div className='col'>
              <h4>Email</h4>
              {email && <a href={`mailto:${email}`}>{email}</a>}
            </div>
            <div className='col'>
              <h4>Head Office</h4>
              {headOffice && <p>{headOffice}</p>}
            </div>
          </div>
        </div>
      </section>
      <Map lat={Number(latitude)} lng={Number(longitude)} icon={icon} />
    </Fragment>
  }
}

const ContactPage = (props) => {
  const { data, location, activeCompany = false } = props
  const { markdownRemark: post, settingsYaml } = data

  return <Layout
    className={_get(location, 'state.activeCompany') || activeCompany}
  >
    <ContactPageTemplate
      {...post.frontmatter}
      {...settingsYaml}
      location={location}
      activeCompany={_get(location, 'state.activeCompany') || activeCompany}
    />
  </Layout>
}


const mapStateToProps = state => {
  return {...state}
}

export default connect(mapStateToProps)(ContactPage)

export const ContactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
    settingsYaml {
      phone
      fax
      email
      postalAddress
      headOffice
      latitude
      longitude
    }
  }
`
