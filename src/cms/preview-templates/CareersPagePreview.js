import React from 'react'
import { CareersPageTemplate } from '../../templates/Careers'

const CareersPagePreview = ({ entry, widgetFor }) => <CareersPageTemplate {...entry.toJS().data} />

export default CareersPagePreview
