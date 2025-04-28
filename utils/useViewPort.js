import { useMediaQuery } from 'hooks/useMediaQuery'

export function useViewPort() {
  // @TODO: Match stitches mediaqueries
  const isSmall = useMediaQuery('screen and (max-width: 639px)')
  const isMedium = useMediaQuery(
    'screen and (min-width: 640px) and (max-width: 999px)',
  )
  const isLarge = useMediaQuery(
    'screen and (min-width: 1000px) and (max-width: 1199px)',
  )
  const isXLargeDown = useMediaQuery('screen and (max-width: 1199px)')
  const isXLarge = useMediaQuery(
    'screen and (min-width: 1200px) and (max-width: 1439px)',
  )
  const isXXLarge = useMediaQuery('screen and (min-width: 1440px)')
  const isMediumUp = useMediaQuery('screen and (min-width: 640px)')
  const isLargeUp = useMediaQuery('screen and (min-width: 1000px)')
  const isXLargeUp = useMediaQuery('screen and (min-width: 1200px)')
  const isXXLargeUp = useMediaQuery('screen and (min-width: 1440px)')

  return {
    isSmall,
    isMedium,
    isLarge,
    isXLargeDown,
    isXLarge,
    isXXLarge,
    isMediumUp,
    isLargeUp,
    isXLargeUp,
    isXXLargeUp,
  }
}
