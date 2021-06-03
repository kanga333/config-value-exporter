const ESCAPE_CHAR = ['\\', '.', '[', ']']

export function parseKey(key: string): string[] {
  const parsedKeys: string[] = []
  let token = ''
  for (let i = 0; i < key.length; i++) {
    const char = key.charAt(i)
    switch (char) {
      case '\\': {
        i++
        const next = key.charAt(i)
        if (!ESCAPE_CHAR.includes(next)) {
          throw Error(`Illegal escape string ${char}${next}`)
        }
        token += next
        break
      }
      case '.': {
        registerToken(token, parsedKeys)
        token = ''
        break
      }
      case '[': {
        registerToken(token, parsedKeys)
        token = ''
        break
      }
      case ']': {
        break
      }
      default: {
        token += char
      }
    }
  }
  registerToken(token, parsedKeys)
  return parsedKeys
}

function registerToken(token: string, keys: string[]): void {
  if (token !== '') {
    keys.push(token)
  }
}
