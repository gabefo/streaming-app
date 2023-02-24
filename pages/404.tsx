import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Logo from '@components/Logo'
import Text from '@components/Text'
import TitleAndMetaTags from '@components/TitleAndMetaTags'

import { styled } from 'stitches.config'

import type { GetStaticProps } from 'next'

const Root = styled('div', {
  my: 12,
  mx: 'auto',
  px: 24,
  maxWidth: 600,

  '@sm': {
    mt: 120,
  },
})

export default function Page() {
  const { t } = useTranslation('404')

  return (
    <Root>
      <TitleAndMetaTags />
      <Logo />
      <Text variant="title" css={{ mt: 40, mb: 8 }}>
        {t('title')}
      </Text>
      <Text as="p" color="secondary">
        {t('description')}
      </Text>
    </Root>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['404'])),
  },
})
