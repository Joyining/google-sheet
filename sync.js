const fs = require('fs');
const { getJoinedObject } = require('.');

const currentPath = process.argv[0];
const args = process.argv.slice(2);
const configFileName = args[0] ?? 'gsheet.config.js';
const config = require(`${currentPath}/../../../../../${configFileName}`);

const docID = config?.docID;
const sheetID = config?.sheetID;
const credentialsPath = config?.credentialsPath ? `${currentPath}/../../../../../${config.credentialsPath}` : `${currentPath}/../../../../../credentials.json`;
const files = config?.files ?? [];

(files.forEach(async (file) => {
  if (!file.filePath) return;
  const data = await getJoinedObject({
    docID,
    sheetID,
    credentialsPath,
    prefix: file.prefix,
    keyColumns: file.keyColumns,
    valueColumns: file.valueColumns,
  });
  fs.writeFile(file.filePath, JSON.stringify(data), (error) => {
    console.error(error);
  });
})
)();
