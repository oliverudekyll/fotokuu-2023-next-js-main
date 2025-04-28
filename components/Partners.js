import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from 'stitches.config'

const Partners = ({ partners }) => {
  return (
    <Container>
      {partners.map((partner, index) => {
        return (
          <React.Fragment key={index}>
            {partner.partnerUrl ? (
              <Link href={partner.partnerUrl}>
                <Figure>
                  <Image
                    src={partner.partnerLogo.mediaItemUrl}
                    alt=""
                    fill={true}
                  />
                </Figure>
              </Link>
            ) : (
              <Figure>
                <Image
                  src={partner.partnerLogo.mediaItemUrl}
                  alt=""
                  fill={true}
                />
              </Figure>
            )}
          </React.Fragment>
        )
      })}
    </Container>
  )
}

export default Partners

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',
  '@medium': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@large': {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
  '@xlarge': {
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
})

const Figure = styled('figure', {
  aspectRatio: '16 / 9',
  marginBottom: 0,
  img: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
})
