import {read} from '../src/read'

test('read', async () => {
  expect(read('version', 'package.json')).toBe('0.0.0')
  expect(read('scripts.build', 'package.json')).toBe('tsc')
  expect(read('keywords[1]', 'package.json')).toBe('node')
  expect(() => read('scripts.xxx', 'package.json')).toThrow()
  expect(read('a\\.b', '__tests__/test.json')).toBe('not_nest')
  expect(read('a.b', '__tests__/test.json')).toBe('nest')
})
