import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const factsFilePath = join(__dirname, 'facts.txt')
const destPath = join(__dirname, '..', 'api')
const sourceData = await readFile(factsFilePath, 'utf8')
const facts = sourceData.split('\n\n')

const stats = {
  total: facts.length,
  all: 'https://raw.githubusercontent.com/lmammino/etna-facts/main/api/all.json',
  first: 'https://raw.githubusercontent.com/lmammino/etna-facts/main/api/0.json',
  last: `https://raw.githubusercontent.com/lmammino/etna-facts/main/api/${facts.length - 1}.json`,
  urlPrefix: 'https://raw.githubusercontent.com/lmammino/etna-facts/main/api/'
}

await writeFile(`${destPath}/stats.json`, JSON.stringify(stats, null, 2))
console.log(`Written ${destPath}/stats.json`)

function mapFact (id, fact) {
  return {
    id: Number(id),
    fact: fact.trim(),
    url: `https://raw.githubusercontent.com/lmammino/etna-facts/main/api/${id}.json`
  }
}

const all = {
  metadata: {
    total: facts.length,
    first: 0,
    last: facts.length - 1
  },
  facts: Object.entries(facts).map(([id, fact]) => mapFact(id, fact))
}

await writeFile(`${destPath}/all.json`, JSON.stringify(all, null, 2))
console.log(`Written ${destPath}/all.json`)

for (let id = 0; id < facts.length; id++) {
  await writeFile(`${destPath}/${id}.json`, JSON.stringify(mapFact(id, facts[id]), null, 2))
  console.log(`Written ${destPath}/${id}.json`)
}
