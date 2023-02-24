import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

import NavLink from '@components/NavLink'

import { CSS, styled } from 'stitches.config'

const Root = styled(motion.nav, {
  position: 'relative',
  display: 'flex',
  height: '100%',
})

type NavbarProps = { css?: CSS }

export default function Navbar(props: NavbarProps) {
  const { t } = useTranslation()

  return (
    <Root layout layoutRoot {...props}>
      <NavLink href="/movies">{t('movies')}</NavLink>
      <NavLink href="/shows">{t('shows')}</NavLink>
    </Root>
  )
}
