const { readFile } = require('node:fs/promises')
const { join } = require('node:path')

module.exports = async function getFacts () {
  const factsFilePath = join(__dirname, '..', 'facts.txt')
  const sourceData = await readFile(factsFilePath, 'utf8')
  const facts = sourceData.split('\n\n').map(fact => fact.trim())

  return facts
}
