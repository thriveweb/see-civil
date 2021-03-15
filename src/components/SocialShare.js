import React from 'react'

import { ICONFacebook, ICONTwitter, ICONLinkedin } from './Icons'
import './SocialShare.scss'

export default() => {
  return <ul className='share-buttons'>
    <p>Share On:</p>
    <li><a href="https://www.facebook.com/sharer/sharer.php?u=&quote=" title="Share on Facebook" target="_blank" rel="noopener noreferrer" onClick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL)); return false;"><ICONFacebook /></a></li>
    <li><a href="https://twitter.com/intent/tweet?source=&text=:%20" target="_blank" rel="noopener noreferrer" title="Tweet" onClick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><ICONTwitter /></a></li>
    <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source=" target="_blank" rel="noopener noreferrer" title="Share on LinkedIn" onClick="window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><ICONLinkedin /></a></li>
  </ul>
}
