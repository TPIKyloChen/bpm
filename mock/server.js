const express = require('express');
const app = express();
const port = 3456;
const rootDomain = '/mock-api';
const db = require('./db');
const genRoute = (path = null) => `${path ? rootDomain + path : rootDomain}`

app.get('/', (req, res) => {
  res.send('Please go start with /mock-api');
});

// 设置 Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' 'unsafe-inline'"
  );
  next();
});

const mock2Data = {
  models001: db.models001,
  models002: db.models002,
  models003: db.models003,
  models004: db.models004,
  models005: db.models005,
  models006: db.models006,
  models007: db.models007,
  models008: db.models008,
  models009: db.models009,
  models010: db.models010,
  models011: db.models011,
  models012: db.models012,
  models013: db.models013,
  models014: db.models014,
  models015: db.models015,
  models016: db.models016,
  models017: db.models017,
  models018: db.models018,
  models019: db.models019,
};

const handleGetRequest = (modelKey) => {
  return async (req, res) => {
    try {
      const data = mock2Data[modelKey];
      if (data) {
        res.status(200).jsonp(data);
      } else {
        res.status(404).jsonp({ message: 'Model not found' });
      }
    } catch (error) {
      res.status(500).jsonp({ message: 'Server error' });
    }
  };
};

// GET
// /v1/models/{modelId}
app.get(genRoute('/models003'), handleGetRequest('models003'));
// /v1/models/{modelId}/content
app.get(genRoute('/models006'), handleGetRequest('models006'));
// /v1/projects/{projectId}/models
app.get(genRoute('/models008'), handleGetRequest('models008'));
// /v1/projects/{projectId}/models
app.get(genRoute('/models009'), handleGetRequest('models009'));
// /v1/models
app.get(genRoute('/models011'), handleGetRequest('models011'));
// /v1/schemas/{modelType}
app.get(genRoute('/models016'), handleGetRequest('models016'));
// /v1/projects/{projectId}/models/findByName
app.get(genRoute('/models017'), handleGetRequest('models017'));
// /v1/models/{modelId}/export
app.get(genRoute('/models018'), handleGetRequest('models018'));
// /model-types
app.get(genRoute('/models019'), handleGetRequest('models019'));

// POST --------------------------------------------------
// /v1/projects/{projectId}/models/{modelId}
app.post(genRoute('/models004'), handleGetRequest('models004'));
// /v1/projects/{projectId}/models/import
app.post(genRoute('/models010'), handleGetRequest('models010'));
// /v1/models
app.post(genRoute('/models013'), handleGetRequest('models013'));
// /v1/models/{modelId}/validate
app.post(genRoute('/models014'), handleGetRequest('models014'));
// /v1/models/{modelId}/validate/extensions
app.post(genRoute('/models015'), handleGetRequest('models015'));
// ------------------------------------------------------

//PUT --------------------------------------------------
// /v1/projects/{projectId}/models/{modelId}
app.put(genRoute('/models001'), handleGetRequest('models001'));
// /v1/models/{modelId}/content
app.put(genRoute('/models007'), handleGetRequest('models007'));
// ------------------------------------------------------

//DELETE --------------------------------------------------
// /v1/projects/{projectId}/models/{modelId}
app.delete(genRoute('/models002'), handleGetRequest('models002'));
// /v1/models/{modelId}
app.delete(genRoute('/models005'), handleGetRequest('models005'));
// ------------------------------------------------------

app.listen(port, () => {
  console.log(`Mock server is running on http://localhost:${port}`);
});
