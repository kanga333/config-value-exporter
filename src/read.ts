import fs from 'fs'
import {parseKey} from './key'

export function read(key: string, file: string): string {
  const file_text = fs.readFileSync(file, 'utf8')
  const json = JSON.parse(file_text)
  return accessObject(json, parseKey(key))
}

/* eslint-disable @typescript-eslint/no-explicit-any*/
function accessObject(obj: any, keys: string[]): string {
  let current = obj
  const accessed: string[] = []
  for (const key of keys) {
    const next = current[key]
    if (next == null) {
      throw Error(`${accessed} ${key} is not exist`)
    }
    current = next
    accessed.push(key)
  }
  if (typeof current === 'object') {
    throw Error(`${accessed} is object`)
  }
  return String(current)
}
