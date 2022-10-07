const { getJoinedObject } = require('./index.js');
const fs = require('fs')

const args = process.argv.slice(2)

const docID = args[0];
const sheetID = args[1];
const credentialsPath = args[2];
const prefix = args[3];
const keyColumns = JSON.parse(args[4]);
const valueColumns = JSON.parse(args[5]);
const filePath = args[6];

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

