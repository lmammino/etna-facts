import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import mkdirp from 'mkdirp'
import getFacts from './facts.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const destPath = join(__dirname, '..', 'api')
const facts = await getFacts()

// Creates the `api` folder if it does not exist
await mkdirp(destPath)

// Creates an index.html file that redirects to the GitHub repo
const index = `<html>
  <head>
    <meta http-equiv="refresh" content="0; url=https://github.com/lmammino/etna-facts">
  </head>
  <body></body>
</html>`

await writeFile(`${destPath}/index.html`, index)
console.log(`Written ${destPath}/index.html`)

// Creates a stats.json file with some useful metadata
const stats = {
  total: facts.length,
  all: 'https://lmammino.github.io/etna-facts/all.json',
  first: 'https://lmammino.github.io/etna-facts/0.json',
  last: `https://lmammino.github.io/etna-facts/${facts.length - 1}.json`,
  urlPrefix: 'https://lmammino.github.io/etna-facts/'
}

await writeFile(`${destPath}/stats.json`, JSON.stringify(stats, null, 2))
console.log(`Written ${destPath}/stats.json`)

// Creates a JSON file for each fact and an all.json file with all the facts
function mapFact (id, fact) {
  return {
    id: Number(id),
    fact,
    url: `https://lmammino.github.io/etna-facts/${id}.json`
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
