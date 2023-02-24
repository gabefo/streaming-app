import { styled } from 'stitches.config'

const Grid = styled('div', {
  display: 'grid',
  overflow: 'hidden',

  variants: {
    align: {
      start: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },

    justify: {
      start: {
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
    },

    rows: {
      1: {
        gridTemplateRows: 'repeat(1, 1fr)',
        gridAutoRows: 0,
      },
      2: {
        gridTemplateRows: 'repeat(2, 1fr)',
        gridAutoRows: 0,
      },
      3: {
        gridTemplateRows: 'repeat(3, 1fr)',
        gridAutoRows: 0,
      },
      4: {
        gridTemplateRows: 'repeat(4, 1fr)',
        gridAutoRows: 0,
      },
      5: {
        gridTemplateRows: 'repeat(5, 1fr)',
        gridAutoRows: 0,
      },
      6: {
        gridTemplateRows: 'repeat(6, 1fr)',
        gridAutoRows: 0,
      },
    },

    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      5: {
        gridTemplateColumns: 'repeat(5, 1fr)',
      },
      6: {
        gridTemplateColumns: 'repeat(6, 1fr)',
      },
    },
  },
})

export default Grid
