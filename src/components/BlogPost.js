import './BlogPost.scss'

import React from 'react'
import { Link } from 'gatsby'

export default ({
    slug,
    title,
    featuredImage
}) => 
    <Link 
        to={slug}
        className='blog-post'
    >
        {featuredImage && <img src={featuredImage} alt="" />}
        <div className='blog-post--content'>
            <h3>{title}</h3>
            <p>other post related stuff</p>
        </div>
    </Link>