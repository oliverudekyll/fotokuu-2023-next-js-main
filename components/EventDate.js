import { styled } from 'stitches.config'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import 'dayjs/locale/et'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { getStringTranslation } from 'utils/getStringTranslation'

const PostDate = ({ startingDateTime, endingDateTime, isLarge }) => {
  const { locale } = useRouter()
  dayjs.locale(locale)
  dayjs.extend(localizedFormat)

  let startingDate = dayjs(startingDateTime).format('DD.MM.YYYY')
  let endingDate = dayjs(endingDateTime).format('DD.MM.YYYY')

  if (dayjs(startingDateTime).isSame(dayjs(endingDateTime), 'day')) {
    startingDate = dayjs(startingDateTime).format('DD.MM.YYYY')
    const startingTime = dayjs(startingDateTime).format('LT')

    return (
      <Wrapper isLarge={isLarge}>
        <time dateTime={startingDateTime}>
          {startingDate} {getStringTranslation('clock')} {startingTime}
        </time>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper isLarge={isLarge}>
        <time dateTime={startingDateTime}>{startingDate}</time>—
        <time dateTime={endingDateTime}>{endingDate}</time>
      </Wrapper>
    )
  }
}

export default PostDate

const Wrapper = styled('div', {
  fontSize: '$p',
  variants: {
    isLarge: {
      true: {
        fontFamily: '$accent',
        fontSize: '$accentHeadline',
      },
    },
  },
})
