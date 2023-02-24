import Link from 'next/link'

import { css, darkTheme } from 'stitches.config'

import Box from './Box'

import type { CSS } from 'stitches.config'

const iconCss = css({
  fill: '#e32832',

  [`.${darkTheme} &`]: {
    fill: '#fff',
  },
})

const textCss = css({
  fill: '#000',

  [`.${darkTheme} &`]: {
    fill: '#fff',
  },
})

type LogoProps = { css?: CSS }

export default function Logo(props: LogoProps) {
  return (
    <Box as={Link} href="/" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width={114} height={32} viewBox="0 0 114 32">
        <path
          className={iconCss()}
          d="M 7.666 27.688 L 7.269 26.207 L 9.974 25.483 L 10.565 27.689 L 11.967 27.689 L 11.914 27.488 L 24.389 24.145 L 25.339 27.689 L 26.741 27.689 L 26.189 25.626 L 28.893 24.901 L 29.64 27.688 L 31.042 27.688 L 24.778 4.311 L 23.376 4.311 L 23.704 5.534 L 20.999 6.259 L 20.477 4.311 L 19.075 4.311 L 19.247 4.952 L 6.771 8.294 L 5.704 4.311 L 4.301 4.311 L 4.785 6.115 L 2.08 6.84 L 1.403 4.312 L 0 4.312 L 6.264 27.689 L 7.666 27.689 L 7.666 27.688 Z  M 6.849 24.637 L 6.077 21.758 L 8.782 21.034 L 9.553 23.912 L 6.849 24.637 Z  M 28.472 23.331 L 25.768 24.056 L 24.996 21.177 L 27.701 20.452 L 28.472 23.331 Z  M 27.28 18.882 L 24.576 19.607 L 23.805 16.727 L 26.509 16.003 L 27.28 18.882 Z  M 26.088 14.433 L 23.384 15.157 L 22.612 12.278 L 25.317 11.554 L 26.088 14.433 Z  M 24.125 7.104 L 24.896 9.983 L 22.192 10.708 L 21.42 7.829 L 24.125 7.104 Z  M 20.181 8.441 L 23.454 20.655 L 10.979 23.997 L 7.706 11.784 L 20.181 8.441 Z  M 2.501 8.41 L 5.205 7.686 L 5.977 10.565 L 3.272 11.289 L 2.501 8.41 Z  M 3.693 12.859 L 6.397 12.135 L 7.169 15.014 L 4.465 15.739 L 3.693 12.859 Z  M 4.885 17.309 L 7.589 16.584 L 8.361 19.463 L 5.656 20.188 L 4.885 17.309 Z"
        />
        <path
          className={textCss()}
          d="M 37.941 6.036 L 42.768 6.036 L 45.265 18.411 L 48.345 6.036 L 52.507 6.036 L 55.559 18.688 L 58.25 6.036 L 62.662 6.036 L 62.468 6.882 L 61.94 9.13 L 61.177 12.307 L 60.303 15.941 L 59.43 19.59 L 58.653 22.767 L 58.098 25 L 57.89 25.846 L 53.173 25.846 L 50.26 13.888 L 47.152 25.846 L 42.713 25.846 L 37.941 6.036 Z  M 70.875 19.493 C 70.69 19.456 70.495 19.432 70.292 19.423 C 70.089 19.414 69.913 19.409 69.765 19.409 C 68.988 19.409 68.359 19.53 67.878 19.77 C 67.397 20.01 67.157 20.427 67.157 21.019 C 67.157 21.389 67.245 21.68 67.42 21.893 C 67.596 22.105 67.813 22.263 68.072 22.364 C 68.331 22.466 68.604 22.526 68.891 22.545 C 69.177 22.563 69.423 22.572 69.626 22.572 C 69.996 22.572 70.412 22.526 70.875 22.434 L 70.875 19.493 L 70.875 19.493 Z  M 69.432 16.441 C 69.58 16.441 69.779 16.445 70.028 16.454 C 70.278 16.464 70.56 16.478 70.875 16.496 C 70.856 15.775 70.602 15.308 70.111 15.095 C 69.621 14.882 68.988 14.776 68.211 14.776 C 67.785 14.776 67.295 14.827 66.74 14.928 C 66.185 15.03 65.584 15.183 64.937 15.386 L 64.493 13.86 C 64.438 13.657 64.359 13.361 64.257 12.972 C 64.155 12.584 64.086 12.279 64.049 12.057 C 64.974 11.742 65.848 11.516 66.671 11.377 C 67.494 11.238 68.239 11.169 68.905 11.169 C 70.865 11.169 72.382 11.636 73.455 12.57 C 74.528 13.504 75.064 14.998 75.064 17.051 L 75.064 25.18 C 74.343 25.384 73.51 25.583 72.567 25.777 C 71.624 25.971 70.606 26.068 69.515 26.068 C 68.553 26.068 67.679 25.985 66.893 25.819 C 66.107 25.652 65.432 25.375 64.868 24.986 C 64.303 24.598 63.869 24.089 63.564 23.46 C 63.258 22.831 63.106 22.064 63.106 21.157 C 63.106 20.251 63.295 19.493 63.675 18.882 C 64.054 18.272 64.544 17.786 65.145 17.426 C 65.746 17.065 66.421 16.811 67.17 16.663 C 67.92 16.515 68.673 16.441 69.432 16.441 L 69.432 16.441 Z  M 78.199 14.831 L 76.479 14.831 L 76.479 11.335 L 78.199 11.335 L 78.199 7.396 L 82.361 7.396 L 82.361 11.335 L 85.802 11.335 L 83.86 14.831 L 82.223 14.831 L 82.361 15.719 L 82.361 20.075 C 82.361 20.556 82.394 20.945 82.458 21.241 C 82.523 21.537 82.625 21.768 82.764 21.934 C 82.902 22.101 83.078 22.216 83.291 22.281 C 83.503 22.346 83.749 22.378 84.026 22.378 C 84.229 22.378 84.479 22.355 84.775 22.309 C 85.071 22.263 85.386 22.212 85.718 22.156 L 85.94 24.015 L 86.107 25.68 C 85.571 25.791 85.08 25.874 84.636 25.93 C 84.192 25.985 83.739 26.013 83.277 26.013 C 81.557 26.013 80.28 25.615 79.448 24.82 C 78.616 24.024 78.199 22.711 78.199 20.88 L 78.199 14.831 Z  M 99.453 24.293 C 98.713 24.885 97.917 25.324 97.066 25.611 C 96.216 25.897 95.346 26.041 94.458 26.041 C 93.496 26.041 92.59 25.911 91.739 25.652 C 90.888 25.393 90.144 24.972 89.506 24.39 C 88.868 23.807 88.364 23.049 87.994 22.115 C 87.624 21.18 87.439 20.048 87.439 18.716 C 87.439 17.402 87.624 16.279 87.994 15.345 C 88.364 14.411 88.868 13.643 89.506 13.042 C 90.144 12.441 90.888 11.997 91.739 11.71 C 92.59 11.423 93.497 11.28 94.458 11.28 C 95.05 11.28 95.698 11.363 96.401 11.53 C 97.103 11.696 97.806 11.946 98.509 12.279 L 96.678 15.275 C 96.364 15.127 95.994 15.021 95.568 14.956 C 95.143 14.892 94.773 14.859 94.458 14.859 C 93.608 14.859 92.9 15.16 92.336 15.761 C 91.772 16.362 91.49 17.347 91.49 18.716 C 91.49 19.419 91.564 19.992 91.712 20.436 C 91.86 20.88 92.068 21.241 92.336 21.518 C 92.604 21.796 92.919 21.999 93.279 22.128 C 93.64 22.258 94.033 22.341 94.458 22.378 C 95.032 22.434 95.601 22.387 96.165 22.239 C 96.729 22.091 97.233 21.851 97.677 21.518 L 99.453 24.293 Z  M 101.367 9.754 C 101.367 9.772 101.242 9.782 100.992 9.782 L 100.174 9.782 L 99.009 9.782 L 100.895 6.397 L 105.557 6.397 L 105.557 12.667 C 105.945 12.297 106.426 11.969 106.999 11.682 C 107.573 11.396 108.257 11.252 109.053 11.252 C 110.699 11.252 111.924 11.71 112.729 12.626 C 113.533 13.541 113.936 14.998 113.936 16.995 L 113.936 25.846 L 109.718 25.846 L 109.718 17.55 C 109.718 16.829 109.552 16.256 109.219 15.83 C 108.886 15.405 108.377 15.192 107.693 15.192 C 107.101 15.192 106.597 15.354 106.181 15.678 C 105.765 16.001 105.557 16.616 105.557 17.523 L 105.557 25.846 L 101.311 25.846 L 101.367 9.754 Z"
        />
      </svg>
    </Box>
  )
}
