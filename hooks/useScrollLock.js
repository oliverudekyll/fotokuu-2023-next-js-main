import { useCallback } from 'react'

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('can-x-scroll')
    }
  }, [])

  const unlockScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = ''
      document.body.classList.remove('can-x-scroll')
    }
  }, [])

  return {
    lockScroll,
    unlockScroll,
  }
}
