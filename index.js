import { promises as fs } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import "dotenv/config.js";
import getDatabaseContents from './notion.js';
import scrapeDate from './puppeteer.js';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = join(cwd(), 'token.json');
const CREDENTIALS_PATH = join(cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}


/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}



function addEvent(auth, event) {
  const calendar = google.calendar({version: 'v3', auth});

  calendar.events.insert({
    auth: auth, 
    calendarId: process.env.CALEN_ID,
    resource: event
  });
};




/**
 * title: title movie
 * date: format month day, year
 */
function createEvent (title, date) {
  // convert to ISO time
  let startTime;
  let lastTime;
  try {
    startTime = new Date(date + ' 08:00:00').toISOString();
    lastTime = new Date(date + ' 010:00:00').toISOString()

  } catch (err) {
    console.log("Invalid date");
    return;
  }
  

  return {
    'summary': title, 
    'start': {
      'dateTime': startTime,
      'timeZone': 'America/Vancouver'
    },
    'end': {
      'dateTime': lastTime,
      'timeZone': 'America/Vancouver'
    }
  }

};



authorize().then(async (res) => {
  let movies = await getDatabaseContents();
  let fullRes = [];

  for (const m of movies) {
    let r = await scrapeDate(m);
    fullRes.push(r); 
  };

  fullRes.forEach((ob) => {
    const event = createEvent(ob.title, ob.relDate);
    addEvent(res, event);
  })

});

