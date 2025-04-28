import { fetchSiteData } from 'graphql/api'
import Image from 'next/image'
import { styled } from 'stitches.config'
import background from 'public/index-background.webp'

export async function getStaticProps({ locale, preview = null }) {
  const siteData = await fetchSiteData({ locale })

  return {
    props: {
      siteData,
      preview,
    },
    revalidate: false,
  }
}

export default function Home() {
  return (
    <>
      <Figure>
        <Image src={background} alt="" fill={true} />
      </Figure>
    </>
  )
}

const Figure = styled('figure', {
  aspectRatio: '16 / 9',
  '@mediumDown': {
    aspectRatio: '1 / 1',
    img: {
      objectFit: 'cover',
    },
  },
})
