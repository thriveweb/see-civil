import React from 'react'
import { OperationPageTemplate } from '../../templates/HowWeOperate'

const OperationPagePreview = ({ entry, widgetFor }) => <OperationPageTemplate {...entry.toJS().data} />

export default OperationPagePreview
