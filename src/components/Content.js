import React from 'react'
import Marked from 'react-markdown'
import PropTypes from 'prop-types'

import './Content.css'

const encodeMarkdownURIs = (source = '') => {
  const markdownLinkRegex = /\[(?:\[[^\]]*\]|[^[\]])*\]\([ \t]*<?((?:\([^)]*\)|[^()])*?)>?[ \t]*(['"].*?\6[ \t]*)?\)/g
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

const Image = ({ nodeKey, src, alt, ...props }) => {
  const decodedSrc = decodeURI(src)
  return (
    <img className="content--image" {...props} src={decodedSrc} alt={alt} />
  )
}

const HtmlBlock = ({ value }) => {
  if (value.indexOf('<iframe') !== 0) return value
  return (
    <div
      className={`content--iframe`}
      dangerouslySetInnerHTML={{
        __html: value
      }}
    />
  )
}

const Content = ({ source, src, className = '' }) => {
  // accepts either html or markdown
  source = source || src || ''
  if (source.match(/^</)) {
    // If source is html (starts with '<')
    return (
      <div
        className={`content ${className}`}
        dangerouslySetInnerHTML={{ __html: source }}
      />
    )
  }

  return (
    <Marked
      className={`content ${className}`}
      source={encodeMarkdownURIs(source)}
      renderers={{
        image: Image,
        html: HtmlBlock
      }}
    />
  )
}

Content.propTypes = {
  source: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
}

export default Content
