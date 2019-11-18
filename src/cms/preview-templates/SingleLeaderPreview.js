import React from 'react'
import { SingleLeaderTemplate } from '../../templates/SingleLeader'

const SingleLeaderPreview = ({ entry, widgetFor }) => <SingleLeaderTemplate {...entry.toJS().data} />

export default SingleLeaderPreview
