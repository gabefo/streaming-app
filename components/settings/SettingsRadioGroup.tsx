import { useState } from 'react'

import { useTranslation } from 'next-i18next'

import Button from '@components/Button'
import { DialogClose, DialogTitle } from '@components/Dialog'
import Flex from '@components/Flex'
import FormControlLabel from '@components/FormControlLabel'
import { Radio, RadioGroup } from '@components/Radio'

type SettingsRadioGroupProps = {
  title: string
  initialValue: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export default function SettingsRadioGroup({
  title,
  initialValue,
  options,
  onChange,
}: SettingsRadioGroupProps) {
  const { t } = useTranslation()

  const [value, setValue] = useState(initialValue)

  return (
    <>
      <DialogTitle css={{ pt: 24, pb: 16, px: 24 }}>{title}</DialogTitle>
      <RadioGroup value={value} onValueChange={setValue} orientation="vertical">
        {options.map((theme) => (
          <FormControlLabel
            key={theme.value}
            control={<Radio value={theme.value} />}
            label={theme.label}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
      <Flex justify="end" css={{ pt: 24, pb: 8, px: 8 }}>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={() => onChange(value)}>Ok</Button>
        </DialogClose>
      </Flex>
    </>
  )
}
