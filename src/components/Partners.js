import React from 'react'

import './Partners.scss'

export default({ title, partner }) => {

  if(!!partner) return null

  return <section className='partners-section'>
    <div className='container'>
      {title && <h2>{title}</h2>}
      <div className='partners'>
        {partner && partner.map(({image}, index) => {
          return <img className='partner' key={`partner-${index}`} src={image} alt='' />
        })}
      </div>
    </div>
  </section>
}
