const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config();

const DOCUMENT_ID = '1Rn2HBMAlw4C3gGW-5PSn1xdUAr1gYqeC61sFWyuvtqw';

const serviceAccount = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function accessToGoogleSuite() {
  try {
    const document = new GoogleSpreadsheet(DOCUMENT_ID, serviceAccount);
    await document.loadInfo();

    const sheet = document.sheetsByIndex[0];

    const registers = await sheet.getRows();
    sheet.addRows([
      {
        data: 'John Doe',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  accessToGoogleSuite,
};

// (async () => {
//   await accessToGoogleSuite();
// })();
