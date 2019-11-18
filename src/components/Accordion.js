import './Accordion.scss'

import React, { Component } from 'react'

// Components
  import AccordionItem from './AccordionItem'


class Accordion extends Component {
  state = {
    activeAccordions: []
  }

  handleAccordionItem = i => {
    let { activeAccordions } = this.state

    activeAccordions.includes(i)
      ? activeAccordions.splice(activeAccordions.indexOf(i), 1)
      : activeAccordions.push(i)

    this.setState({
      activeAccordions
    })
  }

  render() {
    const { accordion } = this.props
    const { activeAccordions } = this.state

    if(!accordion) return null

    return accordion && !!accordion.length &&
      <section className='accordion'>
        {accordion &&
          accordion.map((item, i) =>
            <AccordionItem
                key={`accordion--item-${i}`}
                handleAccordionItem={() => this.handleAccordionItem(i)}
                active={activeAccordions.includes(i)}
                {...item}
            />
          )
        }
      </section>
  }
}

export default Accordion
