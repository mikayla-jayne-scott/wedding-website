/**
 * Wedding guestbook for a Google Sheet.
 * Add this to Extensions > Apps Script in the Google Sheet that stores notes.
 */
const SHEET_NAME = 'Guestbook';
const SPREADSHEET_ID = '1YZsO_nohu3vp2MIJTBHNTWUAgv2pQqlrImdqzcquo4g';

function doGet(e) {
  const values = getSheet_().getDataRange().getValues();
  const messages = values.slice(1).reverse().slice(0, 30).map(row => ({
    name: String(row[1] || ''),
    message: String(row[2] || '')
  }));
  return output_({ messages }, e && e.parameter && e.parameter.prefix);
}

function doPost(e) {
  const input = (e && e.parameter) || {};
  const name = clean_(input.name, 60);
  const message = clean_(input.message, 500);
  if (input.website || !message) return output_({ ok: false });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet_().appendRow([new Date(), name, message]);
  } finally {
    lock.releaseLock();
  }
  return output_({ ok: true });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Name', 'Message']);
  return sheet;
}

function clean_(value, maxLength) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function output_(data, callback) {
  const validCallback = /^[A-Za-z_$][\w$]*$/.test(callback || '');
  const body = validCallback ? `${callback}(${JSON.stringify(data)});` : JSON.stringify(data);
  return ContentService.createTextOutput(body).setMimeType(
    validCallback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON
  );
}
