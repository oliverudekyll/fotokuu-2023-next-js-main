import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import 'dayjs/locale/et'
import localizedFormat from 'dayjs/plugin/localizedFormat'

const PostDate = ({ date }) => {
  const { locale } = useRouter()
  dayjs.locale(locale)
  dayjs.extend(localizedFormat)

  const postDate = dayjs(date).format('L')

  return <time dateTime={date}>{postDate}</time>
}

export default PostDate
