import Head from 'next/head'
import { useRouter } from 'next/router'

type TitleAndMetaTagsProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  pathname?: string
}

export default function TitleAndMetaTags({
  title = 'Watch',
  description = 'Watch your favorite TV shows and movies',
  image,
}: TitleAndMetaTagsProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}
