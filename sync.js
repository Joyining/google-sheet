const { getJoinedObject } = require('./index.js');
const fs = require('fs')

const args = process.argv.slice(2)
const config = require(args[0])

const docID = config?.docID;
const sheetID = config?.sheetID;
const credentialsPath = config?.credentialsPath;
const prefix = config?.prefix;
const keyColumns = config?.keyColumns;
const valueColumns = config?.valueColumns;
const filePath = config?.filePath;

(async() => {
  if(!filePath) return
  const data = await getJoinedObject({
    docID,
    sheetID,
    credentialsPath, 
    prefix,
    keyColumns,
    valueColumns,
  })
  fs.writeFile(filePath, JSON.stringify(data), (error) => {
    console.error(error)
  })
})()

