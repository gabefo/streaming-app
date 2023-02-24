import { styled } from 'stitches.config'

const Root = styled('div', {
  color: '$textDisabled',
  fontSize: '0.75rem',
  lineHeight: '1.125rem',
  textAlign: 'center',
})

export default function Copyright() {
  return <Root>© {new Date().getFullYear()}. All rights reserved.</Root>
}
