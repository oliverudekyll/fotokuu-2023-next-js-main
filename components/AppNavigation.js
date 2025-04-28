import React from 'react'
import Link from 'next/link'
import { styled } from 'stitches.config'
import { useSiteData } from 'context/getSiteData'
import { flatListToHierarchical } from 'utils/helpers'
import { useScrollLock } from 'hooks/useScrollLock'
import { useViewPort } from 'utils/useViewPort'
import { useRouter } from 'next/router'
import NavigationToggle from './NavigationToggle'
import { getStringTranslation } from 'utils/getStringTranslation'

const AppNavigation = ({ isVisible, toggleNavigation }) => {
  const router = useRouter()
  const { isXLargeDown } = useViewPort()

  const siteData = useSiteData()
  const menuItems = flatListToHierarchical(
    siteData?.menu?.menuItems?.nodes,
    'id',
    'parentId',
    'childItems',
  )
  const programmeCategories = siteData?.programmeCategories?.nodes
  const isActiveLink = (path, locale) => {
    return (
      router.pathname === path ||
      router.pathname.includes(path) ||
      router.asPath.includes(path)
    )
  }

  // Check if the current URL slug contains 'programme' or 'programm'
  const hasProgrammeSlug =
    router.pathname.includes('programme') ||
    router.pathname.includes('programm')

  // Check if the 'category' query parameter is present in the URL
  const hasCategoryQuery = router.query.category

  // const { lockScroll, unlockScroll } = useScrollLock()

  // if (isVisible) {
  //   lockScroll()
  // } else {
  //   unlockScroll()
  // }

  return (
    <Navigation style={{ display: isVisible ? 'flex' : 'none' }}>
      {isXLargeDown && (
        <NavigationToggle onClick={() => toggleNavigation(false)}>
          {getStringTranslation('close')}
        </NavigationToggle>
      )}

      {menuItems?.map((item, index) => {
        const { label } = item
        const itemPath = item.path.endsWith('/')
          ? item.path.slice(0, -1)
          : item.path

        return (
          <ItemWrapper key={index}>
            <Item href={itemPath} isActive={isActiveLink(itemPath)}>
              {label}
            </Item>
            {/* {isActiveLink(itemPath) &&
              (hasProgrammeSlug || hasCategoryQuery) &&
              programmeCategories && (
                <SubNavigation>
                  {programmeCategories.map((category, index) => {
                    return (
                      <SubItem
                        key={index}
                        href={{
                          pathname: itemPath,
                          query: { category: category.slug },
                        }}
                        isActive={router.query.category === category.slug}>
                        {category.name}
                      </SubItem>
                    )
                  })}
                </SubNavigation>
              )} */}
          </ItemWrapper>
        )
      })}
    </Navigation>
  )
}

export default AppNavigation

const Navigation = styled('nav', {
  fontFamily: '$accent',
  fontSize: '$accentHeadline',
  display: 'inline-flex',
  justifyContent: 'space-between',
  padding: '0 $2',
  zIndex: '1',
  button: {
    position: 'absolute',
    top: '$1',
    right: '$1',
    '@large': {
      top: '$2',
      right: '$2',
    },
  },
  '@xlargeDown': {
    fontSize: '$headline',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: '0',
  },
})

const ItemWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Item = styled(Link, {
  textDecoration: 'none',
  border: '2px solid transparent',
  '&:hover': {
    color: '$secondary',
  },
  '@mediumDown': {
    margin: '0 $1',
  },
  '@large': {
    margin: '0 $2',
  },
  '@xlarge': {
    margin: '0',
  },
  variants: {
    isActive: {
      true: {
        borderColor: '$primary',
        '&:hover': {
          color: '$primary',
        },
      },
    },
  },
})

const SubNavigation = styled('nav', {
  display: 'flex',
  gap: '$1',
  marginTop: '$1',
})

const SubItem = styled(Link, {
  fontFamily: '$body',
  fontSize: '$p',
  textDecoration: 'none',
  '&:hover': {
    color: '$secondary',
  },
  variants: {
    isActive: {
      true: {
        color: 'red',
      },
    },
  },
})
