import useOffsetTop from 'hooks/useOffsetTop'
import { styled } from 'stitches.config'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const StyledHeader = styled('header', {
  position: 'fixed',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '$header',
  pl: '$gap',
  pr: 8,
  bg: '$background',
  zIndex: 1,
  transition: 'box-shadow 0.2s ease-in-out',

  variants: {
    elevation: {
      true: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
})

export default function Header() {
  const isOffset = useOffsetTop()

  return (
    <StyledHeader elevation={isOffset}>
      <Logo />
      <ThemeToggle />
    </StyledHeader>
  )
}
