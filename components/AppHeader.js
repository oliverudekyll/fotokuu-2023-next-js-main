import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import NavigationToggle from './NavigationToggle'
import Link from 'next/link'
import { useViewPort } from 'utils/useViewPort'

const AppHeader = ({ toggleNavigation, translation }) => {
  const { isXLargeDown } = useViewPort()
  const title = getStringTranslation('title')
  const menuText = getStringTranslation('menu')
  const metaDesc = getStringTranslation('meta_desc')
  const tagline = getStringTranslation('tagline')

  return (
    <Header>
      <div>
        <Logo href="/">{title}</Logo>
        <Navigation>
          <LanguageSwitcher translation={translation} />
          {isXLargeDown && (
            <NavigationToggle onClick={toggleNavigation}>
              {menuText}
            </NavigationToggle>
          )}
        </Navigation>

        <Date>6.10.—26.11.2023</Date>
      </div>
      <div>
        <Text>{metaDesc}</Text>
        <Tagline>{tagline}</Tagline>
      </div>
    </Header>
  )
}

export default AppHeader

const Header = styled('header', {
  fontFamily: '$heading',
  margin: '$1',
  a: {
    textDecoration: 'none',
    '&:hover': {
      color: '$primary',
    },
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    '@xlarge': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '0.5rem',
    },
  },
  '@large': {
    margin: '$2 $2 $1 $2',
  },
})

const Navigation = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row !important',
  order: 1,
  '@xlargeDown': {
    marginBottom: '$1',
  },
  '@xlarge': {
    order: 2,
  },
})

const Title = styled('p', {
  textTransform: 'uppercase',
  fontSize: '$headline',
  letterSpacing: '$heading',
  lineHeight: 0.8,
})

const LargeText = styled(Title, {
  textTransform: 'initial',
})

const Logo = styled(Link, {
  order: 2,
  gridArea: 'logo',
  textTransform: 'uppercase',
  fontSize: '$headline',
  letterSpacing: '$heading',
  lineHeight: 0.8,
})

const Text = styled('p', {
  order: 3,
  fontFamily: '$body',
  '@xlargeDown': {
    display: 'none',
  },
  '@mediumOnly': {
    marginTop: '1rem',
  },
  '@xlarge': {
    order: 1,
    marginTop: '.5rem',
    flex: '40% 0 0',
  },
})

const Date = styled(LargeText, {
  order: 2,
  '@xlarge': {
    order: 3,
    textAlign: 'right',
  },
})

const Tagline = styled(LargeText, {
  order: 1,
  '@xlarge': {
    textAlign: 'right',
  },
})
