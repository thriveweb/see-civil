import React, { Component } from 'react'
import { ICONPlay } from './Icons'
import Content from './Content'

import './Video.scss'

class Video extends Component {
	constructor(props) {
		super(props)
		this.videoRef = React.createRef()
		this.state = {}
	}

	handleVideo = url => {
		this.setState({
			videoPlaying: true
		}, () => {
			this.videoRef.current.src = `https://player.vimeo.com/video/${url}?title=0&byline=0&portrait=0`
		})
	}

	render() {
		const { title, video, imageOverlay } = this.props
		const { videoPlaying } = this.state

		if(!video) return null

		const url = video.replace(/^.+v=/,'').replace(/&.*/,'')

		return <section className='video-section' onClick={() => !videoPlaying && this.handleVideo(url)}>
			<div className="video-wrapper">
				<div className={`overlay-content section-image ${!videoPlaying ? 'active' : ''}`} style={imageOverlay && { backgroundImage: `url(${imageOverlay}-/resize/1920x/)` }}>
					{title && <Content src={title} />}
					<div className='play-button'>
						<ICONPlay />
					</div>
				</div>
				<iframe
					title={title}
					ref={this.videoRef}
					allow='autoplay; fullscreen'
					frameBorder="0"
					allowFullScreen
				>
				</iframe>
			</div>
		</section>
	}
}

export default Video
