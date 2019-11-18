import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Layout from '../layouts/Layout'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query NotFoundPageQuery {
        globalSettings: settingsYaml {
          siteTitle
        }
      }
    `}
    render={data => (
      <Layout className='error-page'>
        <Helmet>
          <title>404 – Page Not Found</title>
        </Helmet>
        <section className="error">
          <div className="container">
            <h1>Oops!</h1>
            <h3>PAGE NOT FOUND</h3>
            <p>Looks like you're lost..</p>
            <Link className="button" to="/">Take me Home</Link>
          </div>
        </section>
      </Layout>
    )}
  />
)
