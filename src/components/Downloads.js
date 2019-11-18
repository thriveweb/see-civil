import React from 'react'

import { ICONDownload } from './Icons'
import './Downloads.scss'

export default({ downloads }) => {

  if(downloads && !downloads.length) return null

  return <section className='downloads-section'>
    <div className='container'>
      <h2>Downloads</h2>
      <div className='downloads'>
        {downloads.map(({ title, file }, index) =>
          <a className='download' key={`download-${index}`} href={file}>
            {title}
            <ICONDownload />
          </a>
        )}
      </div>
    </div>
  </section>
}
