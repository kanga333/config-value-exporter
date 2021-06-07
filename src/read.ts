import fs from 'fs'
import yaml from 'js-yaml'
import toml from '@iarna/toml'
import {parseKey} from './key'

export function read(key: string, file: string, format = ''): string {
  const obj = readConfigFile(file, format)
  const keys = parseKey(key)
  return accessObject(obj, keys)
}

/* eslint-disable @typescript-eslint/no-explicit-any*/
function readConfigFile(file: string, format: string): any {
  const file_text = fs.readFileSync(file, 'utf8')
  const ext =
    format === '' ? file.split('.').slice(-1)[0].toLowerCase() : format
  switch (ext) {
    case 'json':
      return JSON.parse(file_text)
    case 'yaml':
    case 'yml':
      return yaml.load(file_text, {json: true})
    case 'toml':
      return toml.parse(file_text)
  }
  throw Error(`Unexpected file type, valid format are json or yaml`)
}

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
