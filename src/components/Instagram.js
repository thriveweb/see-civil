import './Instagram.scss'

import React, { Component } from 'react'

// Util
    import axios from 'axios'
    import _get from 'lodash/get'


class Instagram extends Component {
    state = {}

    componentDidMount = () => {
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.props.accessToken}`)
            .then(res => {
                this.setState({
                    posts: res.data.data
                })
            })
            .catch(console.log)
    }

    render() {
        const { posts } = this.state
        const { displayCount = 9 } = this.props

        const userInfo = _get(posts, '[0].user') || {}
        const { username, profile_picture } =  userInfo
        
        return <section className='instagram'>
            <div className='container'>
                {userInfo &&
                    <div className='instagram--header'>
                        <h2>Follow Us on Instagram!</h2>
                        <a 
                            href={`https://www.instagram.com/${username}`} 
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            {profile_picture && <img src={profile_picture} alt={username} />}
                            {username && <p>{username}</p>}
                        </a>
                    </div>
                }
                
                <div className='instagram--posts'>
                    {posts && !!posts.length
                        ? posts.splice(0, displayCount).map(({ images, link, id}) => {
                            const { standard_resolution } = images

                            return <a
                                key={id}
                                href={link} 
                                target='_blank'
                                rel="noopener noreferrer"
                                className='instagram--post section-image'
                                style={standard_resolution && { backgroundImage: `url(${standard_resolution.url})` }}
                            >
                            </a>
                        })
                        : <p>Loading...</p>
                    }
                </div>
            </div>
        </section>
    }
}

export default Instagram
