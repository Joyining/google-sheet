# gsheet-helper

gsheet-helper generates multiple json files based on your Google sheets. It helps you to transfer data into json format.

## Installation
```
npm i @joyining/gsheet-helper --save-dev
```

## Usage from command line

Create a `gsheet.config.js` under root folder, following the below example:

```javaScript
module.exports = {
  docID: '',
  credentialsPath: '',
  sheets: [
    {
      sheetID: '',
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
        },
      ],
    },
  ],
}
```

| Key              | Description |
| ---------------- | -------- |
| docID            | required, Google sheet document ID.                                                                                                          |
| credentialsPath  | optional, the path for credential to access the Google sheet. It takes `credentials.json` under root folder as the default credential path.  |
| sheets           | required, specify the target sheets.                                                                                                             |
| sheetID          | required, Google sheet sheet ID.                                                                                                             |
| files            | required, specify expected results.                                                                                                          |
| prefix           | optional, the prefix before key string, default is empty string.                                                                             |
| keyColumns       | required, the columns to concatenate key.                                                                                                    |
| valueColumns     | optional, the columns to concatenate value, default is empty string.                                                                         |
| filePath         | required, the path and file name for the generated file.                                                                                     |


Custom a script in `package.json`:

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

Run script and check if json files are generated.

```
npm run sync
```

## Examples

### Input

You have a 3-column Google sheet containing translations for some words:
| en       | zh      | ja             |
| -------- | ------- | -------------- |
| Engineer | 工程師   | エンジニア       |
| Homepage | 首頁     | ホームページ     |
| Frontend | 前端     | フロントエンド   |
| Backend  | 後端     | バックエンド     |


```javaScript
// gsheet.config.js
module.exports = {
  docID: 'XXXXX',
  credentialsPath: 'myCredential.json',
  sheets: [
    {
      sheetID: 'YYYYY',
      files: [
        {
          prefix: '_',
          keyColumns: ['en'],
          valueColumns: ['zh'],
          filePath: 'zh.json'
        },
        {
          prefix: '_',
          keyColumns: ['en'],
          valueColumns: ['ja'],
          filePath: 'ja.json'
        },
      ],
    },
  ],
}
```

### Output

Two json files:

```
// zh.json
{
  "_Engineer": "工程師",
  "_Homepage": "首頁",
  "_Frontend": "前端",
  "_Backend": "後端"
}
```

```
// ja.json
{
  "_Engineer": "エンジニア",
  "_Homepage": "ホームページ",
  "_Frontend": "フロントエンド",
  "_Backend": "バックエンド"
}