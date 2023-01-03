import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
export type { VariantProps } from '@stitches/react'

const colors = {
  white: '#fff',
  black: '#000',
  blue: '#5bcbfa',
  green: '#4fad5b',
  yellow: '#f8ce46',
  orange: '#ee6f2d',
  red: '#ea3223',
}

export const { styled, css, theme, createTheme, getCssText, globalCss, keyframes, config, reset } =
  createStitches({
    theme: {
      colors: {
        ...colors,

        primary: '#e32832',
        primaryTransparent: 'rgba(227, 40, 50, 0.1)',
        background: '#fff',
        text: '#111',
        textSecondary: '#565656',
        textDisabled: '#757575',
        panel: '#fff',
        input: '#f5f5f5',
        border: 'rgba(0, 0, 0, 0.1)',
        hover: 'rgba(0, 0, 0, 0.05)',
        skeleton: 'rgba(0, 0, 0, 0.12)',
        tooltip: 'rgba(33, 33, 33, 0.9)',
        tooltipText: '#fff',
        overlay: 'rgba(255, 255, 255, 0.3)',
      },
      fonts: {
        openSans: '"Open Sans", Arial, Helvetica, sans-serif',
      },
      sizes: {
        header: 'var(--header)',
      },
      space: {
        gutterX: 'var(--gutterX)',
      },
      radii: {
        pill: '9999px',
      },
    },
    media: {
      xs: '(min-width: 0px)',
      sm: '(min-width: 600px)',
      md: '(min-width: 960px)',
      lg: '(min-width: 1280px)',
      xl: '(min-width: 1440px)',
      touch: '(any-pointer: coarse)',
    },
    utils: {
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'marginTop'>) => ({
        marginTop: value,
        marginBottom: value,
      }),

      bg: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
        backgroundColor: value,
      }),
    },
  })

export const darkTheme = createTheme('dark-theme', {
  colors: {
    primary: '#ff9494',
    primaryTransparent: 'rgba(255, 148, 148, 0.1)',
    background: '#111',
    text: '#fff',
    textSecondary: '#ccc',
    textDisabled: '#999',
    panel: '#222',
    input: '#181818',
    border: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.05)',
    skeleton: 'rgba(255, 255, 255, 0.12)',
    overlay: 'rgba(17, 17, 17, 0.3)',
  },
})

export type CSS = Stitches.CSS<typeof config>
