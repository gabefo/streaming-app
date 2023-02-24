import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import { styled } from 'stitches.config'

const StyledLink = styled(Link, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  px: 16,
  color: '$textSecondary',
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.5rem',
  transition: 'color 0.2s ease-in-out',

  '@hover': {
    '&:hover': {
      color: '$textPrimary',
    },
  },

  variants: {
    active: {
      true: {
        color: '$primary !important',
      },
    },
  },
})

const Indicator = styled(motion.div, {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: 0,
  height: 3,
  bg: '$primary',

  '@md': {
    mx: 16,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
})

export default function NavLink({ children, ...props }: PropsWithChildren<LinkProps>) {
  const { asPath, isReady } = useRouter()

  const getActive = useCallback(() => {
    // Check if the router fields are updated client-side
    if (!isReady) {
      return false
    }

    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = new URL((props.as || props.href) as string, location.href).pathname

    // Using URL().pathname to get rid of query and hash
    const activePathname = new URL(asPath, location.href).pathname

    return activePathname.startsWith(linkPathname)
  }, [asPath, isReady, props.as, props.href])

  const [active, setActive] = useState(getActive)

  useEffect(() => {
    setActive(getActive)
  }, [getActive])

  return (
    <StyledLink active={active} {...props}>
      {children}
      {active ? (
        <Indicator
          layoutId="navLinkIndicator"
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        />
      ) : null}
    </StyledLink>
  )
}
