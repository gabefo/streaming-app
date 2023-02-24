import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticProps } from 'next'

export default function Page() {
  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ mt: 24 }}></Container>
    </>
  )
}

Page.Layout = MainLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])) },
  }
}
