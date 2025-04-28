import Image from 'next/image'
import { styled } from 'stitches.config'

// type StaticImageData = {
//   featuredImage: {
//     node: {
//       sourceUrl: string
//       altText: string
//     }
//   }
// }

// type Props = {
//   image?: StaticImageData
//   caption?: string
// }

const FeaturedImage = ({ image, caption }) => {
  return (
    <Wrapper>
      {' '}
      <Figure>
        {image && (
          <Image
            src={image.src || image.sourceUrl}
            alt={image?.altText}
            fill={true}
            quality={75}
          />
        )}
      </Figure>
      {caption && <Caption dangerouslySetInnerHTML={{ __html: caption }} />}
    </Wrapper>
  )
}

export default FeaturedImage

const Wrapper = styled('div', {
  marginBottom: '$1',
  div: {
    p: {
      fontSize: '$p',
    },
  },
})

const Figure = styled('figure', {
  aspectRatio: '16 / 9',
  backgroundColor: '$secondary',
  img: {
    objectFit: 'cover',
  },
})

const Caption = styled('figcaption', {
  fontSize: '$p',
  color: '$gray',
  textAlign: 'center',
  p: {
    fontSize: '$p',
  },
})
