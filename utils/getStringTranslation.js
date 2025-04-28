import strings from 'translations/strings.json'
import { useRouter } from 'next/router'

export const getStringTranslation = (string) => {
  const router = useRouter()

  if (strings[router.locale][string]) {
    return strings[router.locale][string]
  } else if (strings[router.defaultLocale][string]) {
    return strings[router.defaultLocale][string]
  }
  return string
}
