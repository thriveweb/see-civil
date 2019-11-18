import React from 'react'
import { CapabilitiesPageTemplate } from '../../templates/CapabilitiesPage'

const CapabilitiesPagePreview = ({ entry, widgetFor }) => <CapabilitiesPageTemplate {...entry.toJS().data} />

export default CapabilitiesPagePreview
