import React from 'react'
import { AboutPageTemplate } from '../../templates/AboutPage'

const AboutPagePreview = ({ entry, widgetFor }) => <AboutPageTemplate {...entry.toJS().data} />

export default AboutPagePreview
