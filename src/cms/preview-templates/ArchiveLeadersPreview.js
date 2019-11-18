import React from 'react'
import { LeadersPageTemplate } from '../../templates/ArchiveLeaders'

const ArchiveLeadersPreview = ({ entry, widgetFor }) => <LeadersPageTemplate {...entry.toJS().data} />

export default ArchiveLeadersPreview
