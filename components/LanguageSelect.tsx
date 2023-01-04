import capitalize from 'lib/capitalize'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { styled } from 'stitches.config'
import { Select, SelectItem } from './Select'

const Flag = styled(Image, {
  mr: 12,
  width: 24,
  height: 24,
  borderRadius: '50%',
  objectFit: 'cover',
})

export default function LanguageSelect() {
  const router = useRouter()

  const { pathname, asPath, query, locale, locales } = router

  const languages = useMemo(() => {
    if (!locales) {
      return []
    }

    const languages = []

    for (const code of locales) {
      languages.push({
        code,
        name: capitalize(
          new Intl.DisplayNames([code], {
            type: 'language',
          }).of(code) as string
        ),
      })
    }

    return languages
  }, [locales])

  const handleValueChange = (value: string) => {
    router.push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select defaultValue={locale} onValueChange={handleValueChange}>
      {languages.map(({ code, name }) => (
        <SelectItem key={code} value={code}>
          <Flag src={`/images/flags/${code}.png`} alt={name} width={32} height={24} />
          {name}
        </SelectItem>
      ))}
    </Select>
  )
}
