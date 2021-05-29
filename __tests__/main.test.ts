import {read} from '../src/read'

test('read', async () => {
  expect(read('version', 'package.json')).toBe('0.0.0')
  expect(read('scripts.build', 'package.json')).toBe('tsc')
})
