const { getJoinedObject } = require('./index.js');
const fs = require('fs');

const currentPath = process.argv[0];
const args = process.argv.slice(2);
const configFileName = args[0] ?? 'gsheet.config.js';
const config = require(`${currentPath}/../../../../../${configFileName}`);

const docID = config?.docID;
const sheetID = config?.sheetID;
const credentialsPath = config?.credentialsPath ? `${currentPath}/../../${config.credentialsPath}` : `${currentPath}/../../credentials.json`;
const prefix = config?.prefix;
const keyColumns = config?.keyColumns;
const valueColumns = config?.valueColumns;
const filePath = config?.filePath;

(async() => {
  if(!filePath) return;
  const data = await getJoinedObject({
    docID,
    sheetID,
    credentialsPath, 
    prefix,
    keyColumns,
    valueColumns,
  });
  fs.writeFile(filePath, JSON.stringify(data), (error) => {
    console.error(error);
  });
})();

