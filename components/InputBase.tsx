import { styled } from 'stitches.config'

const InputBase = styled('input', {
  m: 0,
  p: 0,
  border: 0,
  outline: 0,
  bg: 'transparent',
  color: 'inherit',
  font: 'inherit',

  '&::placeholder': {
    color: '$textDisabled',
  },

  '&[type="search"]': {
    /* clears the 'X' from Internet Explorer */
    '&::-ms-clear, &::-ms-reveal': {
      display: 'none',
      width: 0,
      height: 0,
    },

    /* clears the 'X' from Chrome */
    '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration':
      {
        display: 'none',
      },
  },
})

export default InputBase
