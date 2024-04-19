// Copyright 2012 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Example:  node customsearch.js example_term
import "dotenv/config.js";
import { google } from 'googleapis';
const customsearch = google.customsearch('v1');


// Ex: node customsearch.js
//      "Google Node.js"
//      "API KEY"
//      "CUSTOM ENGINE ID"

async function runSample(options) {
  console.log(options);
  const res = await customsearch.cse.list({
    cx: options.cx,
    q: options.q,
    auth: options.apiKey,
  });
  console.log(res.data);
  return res.data;
}


const options = {
q: "Exhuma movie",
apiKey: process.env.SEARCH_API_KEY,
cx: process.env.SEARCH_ENGINE_ID,
};
runSample(options).catch(console.error);
