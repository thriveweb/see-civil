import React, { Component } from 'react'

// Components
    import Content from './Content'
    import { ICONAngleBottom, ICONDownload } from './Icons'

class AccordionItem extends Component {
    constructor(props) {
        super(props)
        this.accordionItemRef = React.createRef()

        this.state = {}
    }

    getScrollHeight = () => this.accordionItemRef.current.scrollHeight

    render() {
      const { title, content, file, handleAccordionItem, active } = this.props

      return <div
        className={`accordion--item ${active ? 'active' : ''}`}
      >
        {title &&
          <h3
            className='accordion--title'
            onClick={handleAccordionItem}
          >
            {title}
            <ICONAngleBottom />
          </h3>
        }
        {content &&
          <div
            ref={this.accordionItemRef}
            className='accordion--content'
            style={{ maxHeight: active ? this.getScrollHeight() : 0 }}
          >
            <div>
              <Content src={content}/>
              {file && <a className='download' href={file}>Download <ICONDownload /></a>}
            </div>
          </div>
        }
    </div>
  }
}

export default AccordionItem
