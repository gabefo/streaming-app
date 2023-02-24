import { ReactElement, ReactNode } from 'react'

import { styled } from 'stitches.config'

const Root = styled('label', {
  display: 'inline-flex',
  alignItems: 'center',
  height: 40,
  px: 24,
  gap: 24,
  cursor: 'pointer',
})

const Label = styled('span', {
  flexGrow: 1,
})

type FormControlLabelType = {
  control: ReactElement
  label: ReactNode
  labelPlacement?: string
  divider?: boolean
}

export default function FormControlLabel({
  control,
  label,
  labelPlacement = 'start',
}: FormControlLabelType) {
  return (
    <Root>
      {labelPlacement === 'start' ? <Label>{label}</Label> : null}
      {control}
      {labelPlacement === 'end' ? <Label>{label}</Label> : null}
    </Root>
  )
}
