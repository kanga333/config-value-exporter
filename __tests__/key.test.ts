import {parseKey} from '../src/key'

const table = [
  {name: 'flat', key: 'flat', expected: ['flat']},
  {name: 'nest', key: 'parent.child', expected: ['parent', 'child']},
  {name: 'array', key: 'array[0].nest', expected: ['array', '0', 'nest']},
  {name: 'escape', key: 'key\\.\\[\\]\\\\', expected: ['key.[]\\']}
]

for (const {name, key, expected} of table) {
  test(name, async () => {
    expect(parseKey(key)).toStrictEqual(expected)
  })
}
