const { GoogleSpreadsheet } = require('google-spreadsheet');

const getRows = async ({
  docID,
  sheetID,
  credentialsPath
}) => {
  if(!docID || !sheetID || !credentialsPath) return;
  const doc = new GoogleSpreadsheet(docID);
  const credential = require(credentialsPath);
  await doc.useServiceAccountAuth(credential);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  return rows;
};

const getJoinedObject = async({
  docID = '',
  sheetID = '',
  credentialsPath = '',
  prefix = '',
  keyColumns = [],
  valueColumns = [],
}) => {
  if(!docID || !sheetID || !credentialsPath) return;
  const rows = await getRows({
    docID,
    sheetID,
    credentialsPath, 
  });
  const result = {};
  for (row of rows) {
    const key = keyColumns.reduce((acc, k) => acc += row[k], '');
    const value = valueColumns.reduce((acc, v) => acc += row[v], '');
    result[`${prefix}${key}`] = value;
  }
  return result;
}

module.exports = {
  getRows,
  getJoinedObject,
};