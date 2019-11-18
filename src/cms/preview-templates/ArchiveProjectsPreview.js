import React from 'react'
import { ArchiveProjectsTemplate } from '../../templates/ArchiveProjects'

const ArchiveProjectsPreview = ({ entry, widgetFor }) => <ArchiveProjectsTemplate {...entry.toJS().data} />

export default ArchiveProjectsPreview
