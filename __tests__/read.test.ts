import {read} from '../src/read'

const table = [
  {name: 'flat', key: 'flat', expected: 'flat_value'},
  {name: 'nest', key: 'parent.child', expected: 'nest_value'},
  {name: 'array', key: 'array[0].nest', expected: 'array_nest_value'},
  {name: 'escape', key: 'key\\.\\[\\]\\\\', expected: 'escape_value'}
]

describe('read', () => {
  describe('can read value form json file', () => {
    for (const {name, key, expected} of table) {
      test(name, async () => {
        expect(read(key, '__tests__/fixture/testdata.json')).toBe(expected)
      })
    }
  })

  describe('can read value form yaml file', () => {
    for (const {name, key, expected} of table) {
      test(name, async () => {
        expect(read(key, '__tests__/fixture/testdata.yaml')).toBe(expected)
      })
    }
  })

  describe('can read value form toml file', () => {
    for (const {name, key, expected} of table) {
      test(name, async () => {
        expect(read(key, '__tests__/fixture/testdata.toml')).toBe(expected)
      })
    }
  })

  describe('can read value form no ext file', () => {
    for (const {name, key, expected} of table) {
      test(name, async () => {
        expect(read(key, '__tests__/fixture/testdata', 'json')).toBe(expected)
      })
    }
  })
})
