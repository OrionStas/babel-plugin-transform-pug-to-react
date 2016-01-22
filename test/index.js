import test from 'ava'
import {transform} from 'babel-core'
import {readFileSync} from 'fs'
import {resolve} from 'path'

const loadFixture = (filename) => {
  return readFileSync(
    resolve(__dirname, `./fixture/${filename}`)
  ).toString()
}

let plugin = '../src/index'

if (process.env.CI === 'true') {
  plugin = '../build/index'
}

test('Transform jade literal', (t) => {
  const simple = loadFixture('simple')
  const res = transform(simple, {
    plugins: [plugin]
  })
  t.is(`React.createElement("div", {
  data: yoyo,
  className: "simple"
});`, res.code)
})

test('Transform jade literal(complex)', (t) => {
  const complex = loadFixture('complex')
  const res = transform(complex, {
    plugins: [plugin]
  })
  t.is(`React.createElement("div", {
  data: yoyo,
  className: "complex"
}, React.createElement(Foo, {
  fuga: this.props.fuga
}), React.createElement(Bar, {
  bar: this.props.bar
}), React.createElement("input", {
  id: "id",
  required: "required"
}), React.createElement("label", {
  htmlFor: "id"
}));`, res.code)
})