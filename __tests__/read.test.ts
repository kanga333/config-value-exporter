import {read} from '../src/read'

const table = [
  {name: 'flat', key: 'flat', expected: 'flat_value'},
  {name: 'nest', key: 'parent.child', expected: 'nest_value'},
  {name: 'array', key: 'array[0].nest', expected: 'array_nest_value'},
  {name: 'escape', key: 'key\\.\\[\\]\\\\', expected: 'escape_value'}
]

for (const {name, key, expected} of table) {
  test(name, async () => {
    expect(read(key, '__tests__/fixture/testdata.json')).toBe(expected)
  })
}
