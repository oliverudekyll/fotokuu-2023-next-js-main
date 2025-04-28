import { useState } from 'react'
import AccordionItem from './AccordionItem'

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleAccordionClick = (event, index) => {
    event.preventDefault()

    setActiveIndex(index)

    if (index === activeIndex) {
      setActiveIndex(null)
    }

    const accordion = event.currentTarget
    accordion.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }

  if (!items) return null

  return (
    <div>
      {items.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            index={index}
            isActive={activeIndex}
            onClick={(event) => {
              handleAccordionClick(event, index)
            }}
            title={item.title}
            content={item.content}
          />
        )
      })}
    </div>
  )
}

export default Accordion
