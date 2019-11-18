import React from 'react'

import ContentColumn from './ContentColumn'
import './ContentColumns.scss'

export default({ contentColumns }) => {

  return <section className='content-columns'>
      {contentColumns &&
        contentColumns.map((contentColumn, index) => {
          return <ContentColumn key={`column-${index}`} {...contentColumn} />
        })
      }
    </section>
}
