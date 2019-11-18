import React, { Component } from 'react'

import Slider from 'react-slick/dist/react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from 'gatsby'

import './FeaturedSlider.scss'

class GallerySlider extends Component {

  	render() {
		const settings = {
		  infinite: true,
		  slidesToShow: 3,
		  swipeToSlide: true,
		  slidesToScroll: 1,
		  arrows: true,
		};

	  const { projects, contentType } = this.props
    const thisProject = projects.filter(project => project.fields.contentType.split('/')[0] === contentType)

		if(!projects) return null

		return <div className='featured-home-section'>
			<div className='container'>
				<h2>Featured Equipment</h2>
				<Slider {...settings}>
	    		{thisProject.map(({ fields, frontmatter }, index) => {
            const { featuredImage, title } = frontmatter
            const { slug } = fields

	    			return <Link
              to={slug}
	    				className='slider-item'
	    				key={`featured-${index}`}
	    			>
              <div className='slider-image section-image' style={featuredImage && { backgroundImage: `url(${featuredImage})` }}></div>
		    			{title && <h4>{title}</h4>}
		    		</Link>
	    		})}
		    </Slider>
        <Link className='button' to={`${contentType}/equipment/`}>View All</Link>
			</div>
		</div>
	}
}

export default GallerySlider
