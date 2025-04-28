import Image from 'next/image'
import React from 'react'
import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'

const Content = ({ content, image, caption }) => {
  return (
    <Container>
      {content && (
        <div>
          {image && (
            <figure>
              <Image src={image} alt="" />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          )}
          <article
            dangerouslySetInnerHTML={{ __html: getStringTranslation(content) }}
          />
          <hr />
        </div>
      )}
    </Container>
  )
}

export default Content

const Container = styled('div', {
  margin: '$1',
  hr: {
    height: '2px',
  },
  p: {
    fontSize: '$h1',
    marginBottom: '1rem',
  },
  '@large': {
    margin: '$2',
  },
})
