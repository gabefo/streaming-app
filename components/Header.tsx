import useMediaQuery from 'hooks/useMediaQuery'
import useOffsetTop from 'hooks/useOffsetTop'
import { styled } from 'stitches.config'
import Grow from './Grow'
import Logo from './Logo'
import SearchDesktop from './SearchDesktop'
import SearchMobile from './SearchMobile'

const StyledHeader = styled('header', {
  position: 'fixed',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '$header',
  pl: 16,
  pr: 'calc(var(--removed-body-scroll-bar-size, 0px) + 4px)',
  bg: '$background',
  zIndex: 1,
  transition: 'box-shadow 0.2s ease-in-out',

  '@md': {
    pl: 24,
    pr: 'calc(var(--removed-body-scroll-bar-size, 0px) + 12px)',
  },

  variants: {
    elevation: {
      true: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
      },
    },
  },
})

export default function Header() {
  const isOffset = useOffsetTop()

  const isDesktop = useMediaQuery('(min-width: 960px)')

  return (
    <StyledHeader elevation={isOffset}>
      <Logo />
      {isDesktop && <SearchDesktop />}
      <Grow />
      {!isDesktop && <SearchMobile />}
    </StyledHeader>
  )
}
