# gsheet-helper

gsheet-helper generates multiple json files based on your Google sheets. It helps you to transfer data into json format.

## Installation
```
npm i gsheet-helper --save-dev
```

## Usage from command line

1. create a `gsheet.config.js` under root folder, following the below example:

```javaScript
module.exports = {
  docID: '',
  sheetID: '',
  credentialsPath: '',
  files: [
    {
      prefix: '',
      keyColumns: [],
      valueColumns: [],
      filePath: ''
    },
    {
      prefix: '',
      keyColumns: [],
      valueColumns: [],
      filePath: ''
    }
  ]
}
```

| Key              | Description |
| ---------------- | -------- |
| docID            | required, Google sheet document ID.                                                                                                          |
| sheetID          | required, Google sheet sheet ID.                                                                                                             |
| credentialsPath  | optional, the path for credential to access the Google sheet. It takes `credentials.json` under root folder as the default credential path.  |
| files            | required, specify expected results.                                                                                                          |
| prefix           | optional, the prefix before key string, default is empty string.                                                                             |
| keyColumns       | required, the columns to concatenate key.                                                                                                    |
| valueColumns     | optional, the columns to concatenate value, default is empty string.                                                                         |
| filePath         | required, the path and file name for the generated file.                                                                                     |

2. Custom a script in `package.json`:

```json
"scripts": {
    "sync": "gsheet-helper"
  },
```

gsheet-helper will take `gsheet.config.js` under root folder as the default config. If your config is not named as `gsheet.config.js`, please specify the file name in the command, for example:

```json
"scripts": {
    "sync": "gsheet-helper my.gsheet.config.js"
  },
```

3. Run script and check if json files are generated.
```
npm run sync
```


## Examples

### Input

You have a 2-column Google sheet containing students' name and gender:
| name     | gender     |
| -------- | ---------- |
| John     | male       |
| Alex     | male       |
| Judy     | female     |

```javaScript
// gsheet.config.js
module.exports = {
  docID: 'XXXXX',
  sheetID: 'YYYYY',
  credentialsPath: 'myCredential.json',
  files: [
    {
      prefix: '_',
      keyColumns: ['name'],
      valueColumns: ['gender'],
      filePath: 'students.json'
    },
  ]
}
```

### Output

```json
// students.json
{
  "_John": "male",
  "_Alex": "male",
  "_Judy": "female",
}
```