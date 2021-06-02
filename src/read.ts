import fs from 'fs'

const ESCAPE_CHAR = ['\\', '.', '[', ']']

export function read(key: string, file: string): string {
  const file_text = fs.readFileSync(file, 'utf8')
  const json = JSON.parse(file_text)
  return accessObject(json, accessKeys(key))
}

function accessKeys(key: string): string[] {
  const strings: string[] = []
  let k = ''
  for (let i = 0; i < key.length; i++) {
    const char = key.charAt(i)
    switch (char) {
      case '\\': {
        i++
        const next = key.charAt(i)
        if (!ESCAPE_CHAR.includes(next)) {
          throw Error(`Illegal escape string ${char}${next}`)
        }
        k += next
        break
      }
      case '.': {
        strings.push(k)
        k = ''
        break
      }
      case '[': {
        strings.push(k)
        k = ''
        break
      }
      case ']': {
        break
      }
      default: {
        k += char
      }
    }
  }
  if (k !== '') {
    strings.push(k)
  }
  return strings
}

/* eslint-disable @typescript-eslint/no-explicit-any*/
function accessObject(obj: any, keys: string[]): string {
  let next = obj
  for (const key of keys) {
    next = next[key]
    if (next == null) {
      throw Error(`No such key error ${key}`)
    }
  }
  return next
}
