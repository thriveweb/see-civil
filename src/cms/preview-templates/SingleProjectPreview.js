import React from 'react'
import { SingleProjectTemplate } from '../../templates/SingleProject'

const SingleProjectPreview = ({ entry, widgetFor }) => <SingleProjectTemplate {...entry.toJS().data} />

export default SingleProjectPreview
