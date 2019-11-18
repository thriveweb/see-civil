import './Slider.scss'

import React, { Component } from 'react'
import { Link } from 'gatsby'

// Components
    import { ICONAngleLeft, ICONAngleRight } from './Icons'

class Slider extends Component {
    constructor(props) {
        super(props)

        this.navForRef = React.createRef();
        this.activeNavForRef = React.createRef();

        this.state = {
            activeSlide: 0
        }
    }

    componentDidMount = () => {
        const { autoPlay } = this.props
        autoPlay && this.enableAutoPlay()
    }

    componentWillUnmount = () => {
        this.enableAutoPlay(false)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.activeSlide !== prevState.activeSlide) {
            this.adjustNavFor()
        }
    }

    enableAutoPlay = (enable = true) => {
        const { intervalId } = this.state

        enable
            ? this.setState({
                intervalId: this.handleAutoPlay()
            })
            : clearInterval(intervalId)

    }

    handleAutoPlay = () => {
        const { slider, autoPlay } = this.props

        return setInterval(() => {
            const { activeSlide } = this.state
            const sliderLength = slider.length

            const nextSlide = sliderLength - 1 === activeSlide
                ? 0
                : activeSlide + 1

            this.setState({
                activeSlide: nextSlide
            })
        }, autoPlay)
    }

    handleActiveSlide = changeSlide => {
        const { slider } = this.props
        const { activeSlide } = this.state
        const sliderLength = slider.length

        this.enableAutoPlay(false)

        const nextSlide = typeof changeSlide === 'number'
            ? changeSlide
            : changeSlide === 'prev'
                ? (0 <= activeSlide - 1
                    ? activeSlide - 1
                    : sliderLength - 1
                )
                : changeSlide === 'next'
                    ? (sliderLength > activeSlide + 1
                        ? activeSlide + 1
                        : 0
                    )
                : activeSlide



        this.setState({
            activeSlide: nextSlide
        }, () =>{
            this.enableAutoPlay()
        })
    }

    adjustNavFor = () => {
        const navFor = this.navForRef.current
        const navForScrollWidth = navFor.scrollWidth

        const activeNavFor = this.activeNavForRef.current
        const activeNavForPosition = activeNavFor.offsetLeft

        navFor.scrollTo({
            top: 0,
            left: navForScrollWidth / 2 - (navForScrollWidth - (activeNavForPosition + (activeNavFor.offsetWidth))),
            behavior: 'smooth'
          });

    }

    render() {
        const {
            slider,
            sliderDots = false,
            sliderArrows = false,
            navFor = false
        } = this.props

        const { activeSlide } = this.state

        const sliderLength = slider && slider.length

        return slider && !!sliderLength &&
            <section className='slider'>
                <div className='container'>
                    {slider.map(({ frontmatter, fields }, i) => {
                      const { featuredImage, title } = frontmatter
                      const { slug } = fields
                        return <Link
                            to={slug}
                            key={`slider--slide-${i}`}
                            className={`slider--slide section-image ${activeSlide === i ? 'active' : ''}`}
                            onMouseOver={() => this.enableAutoPlay(false)}
                            onMouseOut={() => this.enableAutoPlay()}
                        >
                          <div className='slider-image' style={featuredImage && { backgroundImage: `url(${featuredImage})` }}></div>
                          {title && <h3>{title}</h3>}
                        </Link>
                    })}
                    {sliderDots &&
                        <div className='slider--dots'>
                            {Array(sliderLength).fill().map((slide, i) =>
                                <span
                                    key={`slider--dot-${i}`}
                                    className={`slider--dot ${activeSlide === i ? 'active' : ''}`}
                                    onClick={() => this.handleActiveSlide(i)}
                                >
                                </span>
                            )}
                        </div>
                    }
                    {sliderArrows &&
                        <div className='slider--arrows'>
                            <span
                                className='slider--arrow-prev slider--arrow'
                                onClick={() => this.handleActiveSlide('prev')}
                            >
                                <ICONAngleLeft />
                            </span>
                            <span
                                className='slider--arrow-next slider--arrow'
                                onClick={() => this.handleActiveSlide('next')}
                            >
                                <ICONAngleRight />
                            </span>
                        </div>
                    }
                </div>
                {navFor &&
                    <div className='container'>
                        <div
                            className='slider--navfor'
                            ref={this.navForRef}
                        >
                            {slider.map(({ image }, i) =>
                                <div
                                    key={`slider--navfor-${i}`}
                                    className={`slider--navfor-item section-image ${activeSlide === i ? 'active' : ''}`}
                                    style={image && { backgroundImage: `url(${image})` }}
                                    onClick={() => this.handleActiveSlide(i)}
                                    ref={activeSlide === i && this.activeNavForRef}
                                >
                                </div>
                            )}
                        </div>
                    </div>
                }
            </section>
    }
}

export default Slider
