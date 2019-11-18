import './main.scss'

import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
  import Header from '../components/Header'
  import Footer from '../components/Footer'

// State
  import { setActiveCompany } from '../state/actions'

class Layout extends Component {
  state = {
    mobileActive: false
  }

  // componentWillUnmount = () => {
  //   // this.props.setActiveCompany(this.props.className)
  // }

  handleMobileActive = mobileActive => {
    this.setState({
      mobileActive
    })
  }

  render() {
    const { children, className } = this.props
    const { mobileActive } = this.state

    return <div
      className={`${className} site-container ${mobileActive ? 'mobile-active' : ''}`}
    >
      <Header
        handleMobileActive={this.handleMobileActive}
        mobileActive={mobileActive}
        activeCompany={className}
      />
      <main>
        <Helmet title="Home | Gatsby + Netlify CMS">
          <link rel="stylesheet" href="https://use.typekit.net/rnx2mme.css" />
        </Helmet>
        <Fragment>{children}</Fragment>
      </main>
      <Footer />
    </div>
  }
}

const mapStateToProps = state => {
  return {...state}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setActiveCompany
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
