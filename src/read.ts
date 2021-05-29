import fs from 'fs'

export function read(key: string, file: string): string {
  const file_text = fs.readFileSync(file, 'utf8')
  const json = JSON.parse(file_text)
  return json[key]
}
