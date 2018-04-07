var gr8 = require('gr8')

var opts = {
  utils: [],
  spacing: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6],
  fontSize: [0.75, 0.9, 1, 1.2, 1.6, 2.4, 3.2, 6.4]
}

var colors = {
  black: '#000',
  white: '#fff',
  gray: '#808080',
  lightgray: '#e0e0e0'
}

var borderWeights = [1]

var borders = {}

for (var weight of borderWeights) {
  for (var color in colors) {
    borders[weight + '-' + color] = `${weight}px solid ${colors[color]}`
  }
}

opts.utils.push({
  prop: [
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left'
  ],
  vals: borders
})

opts.utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: colors
})

opts.utils.push({
  prop: 'color',
  join: '-',
  vals: colors
})

opts.utils.push({
  prop: 'font-family',
  join: '-',
  vals: {
    sans: `'lunchtype22', -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif`,
    serif: `'Reckless TRIAL', serif`
  }
})

opts.utils.push({
  prop: 'text-decoration',
  vals: {
    'u-hover': 'underline',
    'o-hover': 'overline',
    'lt-hover': 'line-through',
    'n-hover': 'none'
  },
  tail: ':hover'
})

opts.utils.push({
  prop: { hc: 'height' },
  vals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  transform: v => Math.round(v / 12 * 100 * 100000) / 100000,
  unit: 'vw'
})

opts.utils.push({
  prop: {
    mx: 'max-width'
  },
  unit: '%',
  vals: [100]
})

module.exports = gr8(opts)
