# etna-facts

[![npm version](https://img.shields.io/npm/v/etna-facts)](https://npm.im/etna-facts)
[![main](https://github.com/lmammino/etna-facts/actions/workflows/main.yaml/badge.svg)](https://github.com/lmammino/etna-facts/actions/workflows/main.yaml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Random facts about Mount Etna 🌋

It is available as a library and as an API.


## Usage: Library

Install the library with:

```bash
npm install etna-facts
```

Then in your code:

```javascript
import getFacts from 'etna-facts'

const facts = await getFacts()
console.log(facts) // an array of strings where every string is a different fact about Mount Etna
```


## Usage API

If you just want to get the facts as an API you can do that too 🥹

The base URL of the API is `https://lmammino.github.io/etna-facts/`.

There are 3 endpoints available.

### `/stats.json`

Returns statistics about the facts available and how to query for them.

#### Example

```bash
curl 'https://lmammino.github.io/etna-facts/stats.json' | jq .
```

```json
{
  "total": 58,
  "all": "https://lmammino.github.io/etna-facts/all.json",
  "first": "https://lmammino.github.io/etna-facts/0.json",
  "last": "https://lmammino.github.io/etna-facts/57.json",
  "urlPrefix": "https://lmammino.github.io/etna-facts/"
}
```

### `/all.json`

Gets all the facts in one call.

#### Example

```bash
curl 'https://lmammino.github.io/etna-facts/all.json' | jq .
```

```json
{
  "metadata": {
    "total": 2,
    "first": 0,
    "last": 1
  },
  "facts": [
    {
      "id": 0,
      "fact": "Mount Etna is located on the east coast of the Italian island of Sicily, in the Mediterranean.",
      "url": "https://lmammino.github.io/etna-facts/0.json"
    },
    {
      "id": 1,
      "fact": "Mount Etna is almost 3500 meters (11000 feet) high, making it the highest mountain in Italy south of the Alps.",
      "url": "https://lmammino.github.io/etna-facts/1.json"
    }
  ]
}
```

### `/{:id}.json`

Gets a given fact by ID.

#### Example

```bash
curl 'https://lmammino.github.io/etna-facts/17.json' | jq .
```

```json
{
  "id": 17,
  "fact": "Early Arabs were familiar with Mount Etna. They called it \"Jabal al-Nar\", which translates as \"Mountain of Fire\".",
  "url": "https://lmammino.github.io/etna-facts/17.json"
}
```


## Suggest a fact

If you want to suggest a new fact about Mount Etna, here's how you can do that.

- [Fork this repository](https://github.com/lmammino/etna-facts/fork)
- Edit the file [`src/facts.txt`](/src/facts.txt) and append the new fact at the bottom (make sure to leave an empty line before the previous fact).
- Run `npm run build`
- Commit your changes
- Open a PR against the original repository


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/etna-facts/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
