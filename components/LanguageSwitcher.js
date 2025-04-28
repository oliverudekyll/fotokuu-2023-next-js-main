import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import { styled } from 'stitches.config'

const LanguageSwitcher = ({ translation }) => {
  const router = useRouter()
  const currentLocale = router.locale

  return (
    <Nav>
      <Button
        as={Link}
        href={
          currentLocale === 'et'
            ? router.asPath
            : translation
            ? translation
            : router.asPath
        }
        locale="et"
        active={currentLocale === 'et'}>
        EE
      </Button>
      <Button
        as={Link}
        href={
          currentLocale === 'en'
            ? router.asPath
            : translation
            ? translation
            : router.asPath
        }
        locale="en"
        active={currentLocale === 'en'}>
        EN
      </Button>
    </Nav>
  )
}

export default LanguageSwitcher

const Nav = styled('nav', {
  textAlign: 'center',
  a: {
    marginRight: '0.25rem',
    '&:last-child': {
      marginRight: '0',
    },
  },
})
