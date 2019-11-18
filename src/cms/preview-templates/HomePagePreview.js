
import React from 'react'
import { HomePageTemplate } from '../../templates/HomePage'

const HomePagePreview = ({ entry, widgetFor }) => <HomePageTemplate {...entry.toJS().data} />

export default HomePagePreview
