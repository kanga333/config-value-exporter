import fs from 'fs'

export function read(key: string, file: string): string {
  const file_text = fs.readFileSync(file, 'utf8')
  const json = JSON.parse(file_text)
  return accessObject(json, accessKeys(key))
}

function accessKeys(key: string): string[] {
  return key.split('.')
}

/* eslint-disable @typescript-eslint/no-explicit-any*/
function accessObject(obj: any, keys: string[]): string {
  let next = obj
  for (const key of keys) {
    next = next[key]
  }
  return next
}
