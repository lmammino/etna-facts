import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export default async function getFacts () {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const factsFilePath = join(__dirname, 'facts.txt')
  const sourceData = await readFile(factsFilePath, 'utf8')
  const facts = sourceData.split('\n\n').map(fact => fact.trim())

  return facts
}
